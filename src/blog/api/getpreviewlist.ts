import { Request, Response } from "express";
import { QueryRunner } from "../../utils/QueryRunner";
import { SQLUtils } from "../../utils/SQLUtils";
import { HttpUtils } from "../../utils/HttpUtils";
import { SignStatus } from "../../user/enum/SignStatus";
const POOL = SQLUtils.Pool;


export async function router(req: Request, res: Response) {

    let blogUserno = req.body.blogUserno;
    let pageNo = req.body.pageNo;
    let pageCount = 10;
    let limitStart = (pageNo - 1) * pageCount;
    let runner: QueryRunner = null;

    let queryBean = {
        userno: parseInt(blogUserno),
        limitStart: limitStart,
        pageCount: pageCount
    }
    console.log(queryBean);

    if (req['signStatus'] === SignStatus.ONLINE) {
        queryBean['signedUserid'] = req.session.signInfo.userid;
    }

    try {
        runner = await QueryRunner.GetInstance(POOL);
        let blogList = await runner.Query('blog.selPreviews', queryBean, {});
        let totalCount = (await runner.Query('blog.selCount', queryBean, {}))[0]['blogCount'];
        HttpUtils.Success(res, {
            blogList: blogList,
            totalCount: totalCount,
            hasNextPage: (pageCount + limitStart) < totalCount
        })

    } catch (e) {
        console.error(e);
        HttpUtils.Throw(e, 500);
    } finally {
        if (runner) await runner.Release();
    }
}