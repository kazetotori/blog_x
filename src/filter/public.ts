import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as path from "path";
import { ServerConfig } from "../config/server";

export let filter = express.static(path.join(__dirname, '../../public'))