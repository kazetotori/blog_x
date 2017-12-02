"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
exports.filter = express.static(path.join(__dirname, '../../public'));
