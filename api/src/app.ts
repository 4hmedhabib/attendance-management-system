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
    credentials: true,
    exposedHeaders: ["set-cookie"],
  };

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT!, { stream }));

    // Allow cross origin requests
    this.app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Content-Length, X-Requested-With, Accept"
      );
      res.header("Access-Control-Allow-Credentials", "true");
      next();
    });

    this.app.use(
      cors((req, callback) => {
        let corsOptions: cors.CorsOptions;
        if (config.portalURLs.indexOf(req.headers!.origin!) !== -1) {
          corsOptions = {
            origin: true,
            methods: ["POST", "HEAD", "OPTIONS", "GET"],
            credentials: true,
            exposedHeaders: ["set-cookie"],
          };
        } else {
          corsOptions = { origin: false };
        }
        callback(null, corsOptions);
      })
    );

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
