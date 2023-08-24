import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import "reflect-metadata";
import { LOG_FORMAT, NODE_ENV, PORT } from "./config";
import { IRoutes } from "./interfaces";
import { ErrorMiddleware } from "./middlewares";
import { logger, stream } from "./utils";
import session from "express-session";
import * as config from "./config";

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  private cookieConfig = {};

  constructor(routes: IRoutes[]) {
    this.app = express();
    this.env = NODE_ENV || "development";
    this.port = PORT || 3001;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  // Set up a specific CORS policy
  corsOptions = {
    origin: "*",
  };

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT!, { stream }));
    this.app.use(cors(this.corsOptions));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(cookieParser("abc", this.cookieConfig));

    this.app.use(
      session({
        name: "FFU_ATMS",
        secret: "abc6241a56sd1fa6sdf46a5",
        genid: (req) => {
          return this.sessionUniqueID();
        },
        saveUninitialized: false,
        resave: false,
        rolling: true,
        cookie: {
          sameSite: false,
          secure: config.isSecure || false,
          maxAge: 1000,
          httpOnly: true,
        },
      })
    );
  }

  private initializeRoutes(routes: IRoutes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }

  private sessionUniqueID() {
    let length = 10;
    let tmp = 'm$%eaoCuaZPMRQygKjz+."mh0}.([c';
    let value = "";

    for (let i = 0; i < length; i++) {
      value += tmp.charAt(Math.floor(Math.random() * tmp.length));
    }

    return value;
  }
}
