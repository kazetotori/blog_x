import { Request, Response } from "express";
import { Filters } from "../../config/QueryRunnerConfig";
import { HttpUtils } from "../../utils/HttpUtils";
import { QueryRunner } from "../../utils/QueryRunner";
import { SQLUtils } from "../../utils/SQLUtils";
import { Errors } from "../../config/errors";
const POOL = SQLUtils.Pool;


export async function router(req: Request, res: Response) {

    let username = req.body.username;

    if (!Filters.username(username)) {
        return HttpUtils.Throw(res, Errors.UsernameFormatError);
    }

    let runner: QueryRunner = null;
    try {
        runner = await QueryRunner.GetInstance(POOL);
        let exists = (await runner.Query('user.selSignInfo', { username: username }, {})).length > 0;
        if (exists) {
            return HttpUtils.Throw(res, Errors.UsernameExists);
        }
        return HttpUtils.Success(res, null);
    }
    catch (e) {
        console.error(e)
        throw e;
    }
    finally {
        if (runner) await runner.Release();
    }

}