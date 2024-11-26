require("dotenv").config();

import { AppServer } from "@/server";
import cluster from "cluster";
import os from "os";
import { DatabaseUtil } from "@/util/database_util";
import { DDUtil } from "./util/default_data_util";

// Get the amount of CPU on OS for # of clusters
const numCPUs = os.cpus().length;

// Grab command line arguments when app is launced (for init/regular launch)
const args = process.argv.slice(2);

if (cluster.isPrimary) {
  console.log(`Master process PID: ${process.pid}`);

  // For initial call to populate the DB with Super Admin etc
  if (args.length > 0 && args[0] === "--init") {
    (async () => {
      // Get DB
      console.log("hello");
      await DatabaseUtil.getInstance();
      // Add defaults to DB
      await DDUtil.addDefaultRole();
      await DDUtil.addDefaultUser();
      process.exit();
    })();
  } else {
    // Fork a new process for each cpu
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(
        `Worker process ${worker.process.pid} exited with code ${code} and signal ${signal}`
      );
      setTimeout(() => {
        cluster.fork();
      }, 1000);
    });

    cluster.on("message", (worker, message) => {
      if (message === "restart") {
        console.log("Restarting worker due to error", worker.process.pid);
        cluster.fork();
      }
    });
  }
} else {
  // Run app on worker processes
  const server = new AppServer();

  // Init Database
  new DatabaseUtil();

  // Init Cache

  process.on("uncaughtException", (error: Error) => {
    console.error(
      `Uncaught exception in worker process ${process.pid}:`,
      error
    );

    // close any open connections or resources
    server.closeServer();

    setTimeout(() => {
      // cluster.fork();
      process.send && process.send("restart");
      cluster.worker.disconnect();
    }, 1000);
  });

  // Gracefully handle termination signals
  process.on("SIGINT", () => {
    console.log("Received SIGINT signal");
    // close any open connections or resources
    server.closeServer();
  });

  // Gracefully handle termination signals
  process.on("SIGTERM", () => {
    console.log("Received SIGTERM signal");
    // close any open connections or resources
    server.closeServer();
  });
}
