"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const morgan = require("morgan");
const express = require("express");
exports.filter = express.Router();
exports.filter.use(morgan('dev'));
