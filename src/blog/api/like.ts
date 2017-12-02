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
        let liked = (await runner.Query("blog_like.selOne", paramBean, {})).length === 1;
        let queryName = liked ? 'blog_like.del' : 'blog_like.ins';
        await runner.Query(queryName, paramBean, {});
        await runner.Commit();
        let likeCount = (await runner.Query('blog_like.selBlogLikedCount', paramBean, {}))[0]['likeCount'];
        let resBean: any = {
            liked: !liked,
            likeCount: likeCount
        }
        resBean.userinfo = ((await runner.Query('user.selSimpleInfo', { userid: paramBean.userno }, {})))[0]


        HttpUtils.Success(res, resBean);
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