import { Request, Response, Router } from "express";
import { QueryRunner } from "../../utils/QueryRunner";
import { SQLUtils } from "../../utils/SQLUtils";
import { SignStatus } from "../../user/enum/SignStatus";
import { BlogReplyServices } from "../../blog/services/BlogReplyServices";
import * as path from "path";
const POOL = SQLUtils.Pool;


export async function router(req: Request, res: Response) {

    let blogid = parseInt(req.query.blogid);
    if (isNaN(blogid)) {
        return res.redirect('/404');
    }

    let runner: QueryRunner = null;
    let signInfo = req.session.signInfo || { userid: 0, username: '' };
    let queryBean = {
        blogid: blogid,
        signedUserid: signInfo.userid
    };
    try {
        runner = await QueryRunner.GetInstance(POOL);
        let blog = (await runner.Query('blog.selBlog', queryBean, {}))[0];
        if (!blog) { return res.redirect('/404'); }

        let blogUser = (await runner.Query('user.selUserInfo', { userid: blog.userno }, {}))[0];
        if (!blogUser) { return res.redirect('/404'); }

        if (blogUser.username !== path.join(req.originalUrl).split(/\\|\//)[2]) { return res.redirect('/404') }
        blogUser.userid = blog.userno;
        blogUser.fanCount = (await runner.Query('ship.selFanCount', { user_a: blogUser.userid }, {}))[0]['fanCount'];
        blogUser.focusCount = (await runner.Query('ship.selFocusCount', { user_b: blogUser.userid }, {}))[0]['focusCount'];
        blogUser.visitedTimes = (await runner.Query('visit.selVisitedTimes', { bloger: blogUser.userid }, {})).length;
        blogUser.indexUrl = path.join('/index/', '/', blogUser.username).replace(/\\/g, '/');

        queryBean['userno'] = blog.userno;
        blog.next = (await runner.Query('blog.selNext', queryBean, {}))[0];
        blog.pre = (await runner.Query('blog.selPre', queryBean, {}))[0];


        return res.render('./index.blog/blog', {
            signInfo: {
                signStatus: req['signStatus'],
                username: signInfo.username,
                userid: req.session.signInfo.userid || 0
            },
            blogUser: blogUser,
            backUrl: `/index/${req['blogUserInfo'].username}/blog?blogid=${blogid}`,
            blog: blog,
            ship: {}
        })
    }
    catch (e) {
        console.error(e);
        return res.redirect('/500');
    }
    finally {
        if (runner) await runner.Release();
    }
}