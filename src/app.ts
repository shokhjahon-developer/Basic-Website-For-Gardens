import express from "express";
import { runner, modules } from "./start/index";

const app = express();

modules(app, express);
runner(app);
