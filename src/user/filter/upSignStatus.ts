/**
 * @ author: kazetotori
 * @ for   : 此文件用于更新登录状态
 */
import { Request, Response, Router } from "express";
import { SignStatus } from "../enum/SignStatus";
import { ServerConfig } from "../../config/server";



export function filter(req: Request, res: Response, next: Function) {

    // 离线
    let oldSignInfo = req.session.signInfo = req.session.signInfo || {};
    if (!oldSignInfo.lastOnline) {
        req['signStatus'] = SignStatus.OUTLINE;
        return next();
    }

    // 非法访问
    let lastOnline = new Date(Number(oldSignInfo.lastOnline));
    if (lastOnline.toString() === 'Invalid Date' || !oldSignInfo.userid) {
        req['signStatus'] = SignStatus.INVALID;
        return next();
    }

    // 登录超时
    let now = Date.now();
    let ms = now - lastOnline.getTime();
    if (ms > ServerConfig.SignTimeout) {
        req['signStatus'] = SignStatus.TIMEOUT;
        return next();
    }


    // 通过检测
    req.session.signInfo.lastOnline = now;
    req['signStatus'] = SignStatus.ONLINE;
    return next();

}