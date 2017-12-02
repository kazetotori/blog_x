import { Request, Response } from "express";
import { SQLUtils } from "../../utils/SQLUtils";
import { QueryRunner } from "../../utils/QueryRunner";
import { HttpUtils } from "../../utils/HttpUtils";
const POOL = SQLUtils.Pool;


export async function router(req: Request, res: Response) {

    let runner: QueryRunner = null;
    let blogid = req.query.blogid;
    let clsid = req.query.clsid;
    let userid = (req.session.signInfo || {})['userid'];
    if (!userid) {
        return HttpUtils.Throw(res, 500);
    }

    try {
        runner = await QueryRunner.GetInstance(POOL);
        await runner.Begin();

        // 获取原文
        let originBlog = (await runner.Query('blog.selAllFields', { blogid: blogid }, {}))[0];
        if (!originBlog) {
            await runner.Rollback();
            return HttpUtils.Throw(res, 500);
        }

        // 在t_blog中插入数据
        originBlog.clsno = clsid;
        originBlog.userno = userid;
        let blogno = (await runner.Query('blog.ins', originBlog, {})).insertId;

        // 在t_trans中插入数据
        await runner.Query('trans.ins', { trans_from: originBlog.blogid, blogno: blogno }, {});
        await runner.Commit();
        HttpUtils.Success(res, null);
    }
    catch (e) {
        if (runner) await runner.Rollback()
        console.error(e);
        HttpUtils.Throw(res, 500);
    }
    finally {
        if (runner) await runner.Release();
    }
}