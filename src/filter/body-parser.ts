import * as bodyParser from "body-parser";
import { Router, Request, Response } from "express";



/**
 * 加载body-parser中间件的全局中间件
 */
export let filter = Router();
filter.use(bodyParser.urlencoded({ extended: true }));
filter.use(bodyParser.json());




