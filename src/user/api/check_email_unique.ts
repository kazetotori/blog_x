import { Request, Response } from "express";
import { Filters } from "../../config/QueryRunnerConfig";
import { HttpUtils } from "../../utils/HttpUtils";
import { Errors } from "../../config/errors";
import { UserService } from "../services/UserService"

export async function router(req: Request, res: Response) {

    let email = req.body.email;
    if (!Filters.email(email)) {
        return HttpUtils.Throw(res, Errors.EmailFormatError);
    }

    try {
        let exists = await (new UserService().emailExists(email));
        if (exists) {
            return HttpUtils.Throw(res, Errors.EmailExists);
        }
        return HttpUtils.Success(res, null);
    }
    catch (e) {
        console.error(e)
        return HttpUtils.Throw(res, 500);
    }
}