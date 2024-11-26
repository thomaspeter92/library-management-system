import express, { Express } from "express";
import { server_config } from "@/server_config";
import bodyParser from "body-parser";
import { AppRouter } from "./routers/routes";
import cors from "cors";

export class AppServer {
  private static server = null;
  public server_config = server_config;
  public app: Express;

  constructor() {
    const port = server_config.port ?? 8080;

    this.app = express();
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());

    this.app.get("/ping", (req, res) => {
      res.send("pong");
    });

    const router = new AppRouter(this.app);
    if (router) {
      console.log("Router connected!");
    }

    AppServer.server = this.app.listen(port, () => {
      console.log(`Server running on port ${port} with pid = ${process.pid} `);
    });
  }

  // close the server for safe on uncaughtException
  public closeServer(): void {
    AppServer.server.close(() => {
      console.log("server closed");
      process.exit(0);
    });
  }
}
