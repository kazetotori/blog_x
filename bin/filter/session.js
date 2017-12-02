"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_1 = require("./../config/session");
const redis = require("connect-redis");
const session = require("express-session");
/**
 * 加载session中间件并配置redis作为其持久化仓库
 */
exports.filter = express_1.Router();
let RedisStore = redis(session);
let store = new RedisStore(session_1.RedisConfig);
let sessionConfig = Object.assign({
    store: store
}, session_1.SessionConfig);
let sessionMW = session(sessionConfig);
exports.filter.use(sessionMW);
