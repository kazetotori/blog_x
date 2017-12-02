import { Request, Response, Router } from "express";
import { QueryRunner } from "../../utils/QueryRunner";
import { SQLUtils } from "../../utils/SQLUtils";
import { SignStatus } from "../../user/enum/SignStatus";
import * as path from "path";
const POOL = SQLUtils.Pool;


export async function router(req: Request, res: Response) {
    let blogUser = req['blogUserInfo'];
    if (!blogUser) {
        return res.redirect('/404');
    }

    blogUser.indexUrl = path.join('/index/', '/', blogUser.username).replace(/\\/g, '/');
    let runner: QueryRunner = null;
    let page = parseInt(req.query.page || 1);

    try {
        runner = await QueryRunner.GetInstance(POOL);
        let paramBean = {
            userno: blogUser.userid,
            limitStart: (page - 1) * 10
        }
        if (req['signStatus'] === SignStatus.ONLINE) {
            paramBean['signedUserid'] = req.session.signInfo.userid;
        }

        let blogList = await runner.Query('blog.selPreviews', paramBean, {});
        blogUser.fanCount = (await runner.Query('ship.selFanCount', { user_a: blogUser.userid }, {}))[0]['fanCount'];
        blogUser.focusCount = (await runner.Query('ship.selFocusCount', { user_b: blogUser.userid }, {}))[0]['focusCount'];
        blogUser.visitedTimes = (await runner.Query('visit.selVisitedTimes', { bloger: blogUser.userid }, {})).length;

        let shipQueryBean = { user_a: blogUser.userid, user_b: paramBean['signedUserid'] }
        let focused = (await runner.Query('ship.selFocused', shipQueryBean, {}))[0]['focused'] == 1;
        let isFriend = (await runner.Query('ship.selIsFriend', shipQueryBean, {}))[0]['is_friend'] == 1;



        res.render('index/index', {
            signInfo: {
                signStatus: req['signStatus'],
                username: req.session.signInfo.username,
                userid: req.session.signInfo.userid || 0
            },
            blogUser: req['blogUserInfo'],
            blogList: blogList,
            backUrl: `/index/${req['blogUserInfo'].username}`,
            ship: {
                focused: focused,
                isFriend: isFriend
            }
        })
    }
    catch (e) {
        console.error(e);
        res.redirect('/500');
    }
    finally {
        if (runner) await runner.Release()
    }
}