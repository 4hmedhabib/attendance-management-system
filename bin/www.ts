import { App } from '../src/app';
import { ValidateEnv } from "../src/utils";

 
ValidateEnv();

const app = new App([]);

app.listen();
