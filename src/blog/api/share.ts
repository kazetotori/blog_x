import { Request, Response } from "express";
import { QueryRunner } from "../../utils/QueryRunner";
import { SQLUtils } from "../../utils/SQLUtils";
import { HttpUtils } from "../../utils/HttpUtils";
const POOL = SQLUtils.Pool;


export async function router(req: Request, res: Response) {

    let blogno = req.query.blogno;
    let runner: QueryRunner = null;
    let paramBean = {
        blogno: parseInt(blogno),
        userno: (req.session.signInfo || {})['userid']
    };

    try {
        runner = await QueryRunner.GetInstance(POOL);
        await runner.Begin();
        let shared = (await runner.Query("blog_share.selOne", paramBean, {})).length === 1;
        let queryName = shared ? 'blog_share.del' : 'blog_share.ins';
        await runner.Query(queryName, paramBean, {});
        await runner.Commit();
        let sharedTimes = (await runner.Query('blog_share.selBlogSharedTimes', paramBean, {}))[0]['shared_times'];        
        HttpUtils.Success(res, {
            shared: !shared,
            sharedTimes: sharedTimes
        });
    }
    catch (e) {
        console.error(e);
        HttpUtils.Throw(res, 500);
    }
    finally {
        if (runner) {
            await runner.Rollback();
            await runner.Release();
        }
    }
}