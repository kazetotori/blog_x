"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
exports.SqlConfig = {
    poolDriver: path.join(process.cwd(), '/src/async-mysql-ts/implements/SQLPool'),
    host: "localhost",
    port: 3306,
    user: "kazetotori",
    database: "my_blog_x",
    password: "Zq12398045",
    logSql: false
};
