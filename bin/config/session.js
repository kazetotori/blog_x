"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionConfig = {
    name: "sid",
    secret: 'BKZ-LG001',
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};
exports.RedisConfig = {
    host: 'localhost',
    port: 6379,
    db: 1,
    ttl: 1800,
    logErrors: true
};
