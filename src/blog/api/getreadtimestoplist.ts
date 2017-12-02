import { Request, Response } from "express";
import { QueryRunner } from "../../utils/QueryRunner";
import { SQLUtils } from "../../utils/SQLUtils";
import { HttpUtils } from "../../utils/HttpUtils";
import { SignStatus } from "../../user/enum/SignStatus";
const POOL = SQLUtils.Pool;


export async function router(req: Request, res: Response) {

    let blogUserid = req.query.blogUserid;
    let topCount = 5;
    let queryBean = {
        userno: blogUserid,
        topCount: topCount
    };
    let runner: QueryRunner = null;

    try {
        runner = await QueryRunner.GetInstance(POOL);
        let blogList = await runner.Query('blog.selReadTimesTopList', queryBean, {});
        return HttpUtils.Success(res, { blogList: blogList })
    }
    catch (e) {
        console.error(e);
        return HttpUtils.Throw(res, 500);
    }
    finally {
        if (runner) await runner.Release();
    }
}