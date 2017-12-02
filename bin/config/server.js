"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerConfig = {
    Port: 3000,
    MsgOnListenStart: 'Starting',
    EnvStatus: 'DEBUG',
    OnListenStart: [],
    Views: './views',
    ViewEngine: 'ejs',
    CookieSecret: '123456',
    SignTimeout: 1000 * 60 * 30,
    Host: 'localhost:3000',
    SignUpVerifyCodeTimeout: 1000 * 60 * 30
};
// 用户配置
exports.ServerConfig.MsgOnListenStart = `===========================================
服务已开启
端口   :    ${exports.ServerConfig.Port},
时间   :    ${new Date().toLocaleString()}
===========================================`;
exports.ServerConfig.ViewEngine = 'jade';
exports.ServerConfig.CookieSecret = 'kazetotori';
exports.ServerConfig.SignTimeout = 1000 * 60 * 60 * 24 * 7;
exports.ServerConfig.Host = 'www.maylight.com.cn';
