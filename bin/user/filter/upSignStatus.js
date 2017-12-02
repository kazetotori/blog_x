"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SignStatus_1 = require("../enum/SignStatus");
const server_1 = require("../../config/server");
function filter(req, res, next) {
    // 离线
    let oldSignInfo = req.session.signInfo = req.session.signInfo || {};
    if (!oldSignInfo.lastOnline) {
        req['signStatus'] = SignStatus_1.SignStatus.OUTLINE;
        return next();
    }
    // 非法访问
    let lastOnline = new Date(Number(oldSignInfo.lastOnline));
    if (lastOnline.toString() === 'Invalid Date' || !oldSignInfo.userid) {
        req['signStatus'] = SignStatus_1.SignStatus.INVALID;
        return next();
    }
    // 登录超时
    let now = Date.now();
    let ms = now - lastOnline.getTime();
    if (ms > server_1.ServerConfig.SignTimeout) {
        req['signStatus'] = SignStatus_1.SignStatus.TIMEOUT;
        return next();
    }
    // 通过检测
    req.session.signInfo.lastOnline = now;
    req['signStatus'] = SignStatus_1.SignStatus.ONLINE;
    return next();
}
exports.filter = filter;
