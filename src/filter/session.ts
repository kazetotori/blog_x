import { Router, Request, Response } from "express";
import { SessionConfig, RedisConfig } from "./../config/session";
import * as redis from "connect-redis";
import * as session from "express-session"

/**
 * 加载session中间件并配置redis作为其持久化仓库
 */
export let filter = Router();
let RedisStore = redis(session);
let store = new RedisStore(RedisConfig);
let sessionConfig = Object.assign({
    store: store
}, SessionConfig);
let sessionMW = session(sessionConfig);
filter.use(sessionMW);