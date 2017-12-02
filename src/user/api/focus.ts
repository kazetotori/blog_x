import { Request, Response, Router } from "express";
import { QueryRunner } from "../../utils/QueryRunner";
import { SQLUtils } from "../../utils/SQLUtils";
import { HttpUtils } from "../../utils/HttpUtils";
import { CryptoUtils } from "../../utils/CryptoUtils";
import { SignStatus } from "../enum/SignStatus";
const POOL = SQLUtils.Pool;


export async function router(req: Request, res: Response) {

    if (req['signStatus'] != SignStatus.ONLINE) {
        return HttpUtils.Throw(res, 500);
    }

    let blogUserid = req.query.blogUserid;
    let userid = req.session.signInfo.userid;
    let runner: QueryRunner = null;
    let queryBean = {
        user_a: parseInt(blogUserid),
        user_b: userid,
        ship_lv: 1
    }

    try {
        runner = await QueryRunner.GetInstance(POOL);
        await runner.Begin();
        let focused = (await runner.Query('ship.selFocused', queryBean, {}))[0]['focused'];

        if (focused) await runner.Query('ship.del', queryBean, {});
        else await runner.Query('ship.ins', queryBean, {});

        await runner.Commit();
        let fanCount = (await runner.Query('ship.selFanCount', queryBean, {}))[0]['fanCount'];

        return HttpUtils.Success(res, {
            focused: !focused,
            fanCount: fanCount
        })
    }
    catch (e) {
        if (runner) await runner.Rollback();
        console.error(e);
        return HttpUtils.Throw(res, 500);
    }
    finally {
        if (runner) await runner.Release();
    }


}