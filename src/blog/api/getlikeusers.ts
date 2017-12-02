/**
 * 此api用于获取某篇博客的点赞用户列表
 */
import { Request, Response } from "express";
import { QueryRunner } from "../../utils/QueryRunner";
import { SQLUtils } from "../../utils/SQLUtils"
import { HttpUtils } from "../../utils/HttpUtils";
import { SignStatus } from "../../user/enum/SignStatus";
const POOL = SQLUtils.Pool;


export async function router(req: Request, res: Response) {

    let blogno = parseInt(req.query.blogno);
    let runner: QueryRunner = null;
    let queryBean: any = { blogno: blogno };
    try {
        runner = await QueryRunner.GetInstance(POOL);
        let likeUsers = await runner.Query('blog_like.selLikeUsers', queryBean, {});
        return HttpUtils.Success(res, { likeUsers: likeUsers })
    }
    catch (e) {
        console.error(e)
        return HttpUtils.Throw(res, 500);
    }
    finally {
        if (runner) await runner.Release();
    }
}