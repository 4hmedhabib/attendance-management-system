import { App } from "../src/app";
import { IndexRoutes } from "../src/routes";
import { ValidateEnv } from "../src/utils";

ValidateEnv();

const app = new App([new IndexRoutes()]);

app.listen();
