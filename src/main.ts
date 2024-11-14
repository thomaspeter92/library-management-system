import { AppServer } from "@/server";
import cluster from "cluster";
import os from "os";
import { DatabaseUtil } from "@/util/database_util";

require("dotenv").config();

// Get the amount of CPU on OS for # of clusters
const numCPUs = os.cpus().length;

// Grab command line arguments when app is launced (for init/regular launch)
const args = process.argv.slice(2);

if (cluster.isPrimary) {
  console.log(`Master process PID: ${process.pid}`);

  // For initial call to populate the DB with Super Admin etc
  if (args.length > 0 && args[0] === "--init") {
    async () => {
      // Get DB
      // Add defaults to DB
      process.exit();
    };
  } else {
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
      cluster.fork();
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
