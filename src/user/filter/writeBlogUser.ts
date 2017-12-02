/**
 * @ author: kazetotori
 * @ for   : 此文件用于将/index/aaa中的aaa的用户信息写入req中
 */

import { QueryRunner } from "../../utils/QueryRunner";
import { SQLUtils } from "../../utils/SQLUtils";
import { Request, Response } from "express";
import * as path from "path";
const POOL = SQLUtils.Pool;


export async function filter(req: Request, res: Response, next: Function) {
    let blogUsername = path.join(req.originalUrl).split('\\')[2];
    let runner: QueryRunner = null;

    try {
        runner = await QueryRunner.GetInstance(POOL);
        let blogSignInfo = (await runner.Query('user.selSignInfo', { username: blogUsername }, {}))[0] || {};
        let blogUserInfo = await runner.Query('user.selUserInfo', { userid: blogSignInfo.userid }, {});
        req['blogUserInfo'] = blogUserInfo[0] || null;
        if (req['blogUserInfo']) {
            req['blogUserInfo'].userid = blogSignInfo.userid;
        }
        return next();
    } catch (e) {
        console.error(e);
        res.redirect('/500');
    } finally {
        if (runner) await runner.Release();
    }
}