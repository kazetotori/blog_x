import * as cookieParser from "cookie-parser";
import * as express from "express";
import { ServerConfig } from "../config/server";

export let filter = express.Router();
filter.use(cookieParser(ServerConfig.CookieSecret))