import { Request, Response } from "express";
import { QueryRunner } from "../../utils/QueryRunner";
import { SQLUtils } from "../../utils/SQLUtils"
import { HttpUtils } from "../../utils/HttpUtils";
import { SignStatus } from "../../user/enum/SignStatus";
const POOL = SQLUtils.Pool;

export async function router(req: Request, res: Response) {

    let userno = req.query.userno || (req.session.signInfo || {})['userid'];
    let runner: QueryRunner = null;
    if (!userno) {
        return HttpUtils.Throw(res, 500);
    }

    try {
        runner = await QueryRunner.GetInstance(POOL);
        let blog_clsList = await runner.Query('blog_cls.selUserCls', { userno: parseInt(userno) }, {});
        HttpUtils.Success(res, { clsList: blog_clsList });
    }
    catch (e) {
        console.error(e);
        HttpUtils.Throw(res, 500);
    }
    finally {
        if (runner) await runner.Release();
    }
}