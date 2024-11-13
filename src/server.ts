import express, { Express } from "express";
import { server_cofig } from "./server_config";
import bodyParser from "body-parser";

export class AppServer {
  private static server = null;
  public server_config = server_cofig;
  public app: Express;

  constructor() {
    const port = server_cofig.port ?? 8080;

    this.app = express();
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());

    this.app.get("/ping", (req, res) => {
      res.send("pong");
    });

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
