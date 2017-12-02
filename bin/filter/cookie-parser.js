"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cookieParser = require("cookie-parser");
const express = require("express");
const server_1 = require("../config/server");
exports.filter = express.Router();
exports.filter.use(cookieParser(server_1.ServerConfig.CookieSecret));
