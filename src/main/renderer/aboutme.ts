import { Request, Response } from "express";
import { QueryRunner } from "../../utils/QueryRunner";
import { SQLUtils } from "../../utils/SQLUtils";
const POOL = SQLUtils.Pool;

export async function router(req: Request, res: Response) {
    res.render('./aboutme/aboutme', {
        blogUser: req['blogUserInfo'],
        signInfo: {
            signStatus: req['signStatus'],
            username: req.session.signInfo.username,
            userid: req.session.signInfo.userid || 0,
        },
        backUrl: `/index/${req['blogUserInfo'].username}/aboutme`
    });
}