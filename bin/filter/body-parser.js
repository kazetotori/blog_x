"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express_1 = require("express");
/**
 * 加载body-parser中间件的全局中间件
 */
exports.filter = express_1.Router();
exports.filter.use(bodyParser.urlencoded({ extended: true }));
exports.filter.use(bodyParser.json());
