import { Request, Response } from "express";
import { VerifyUtils } from "../../utils/VerifyUtils";
import { UserService } from "../services/UserService";
import { HttpUtils } from "../../utils/HttpUtils";
import { Errors } from "../../config/errors";
import { ServerConfig } from "../../config/server";




export async function router(req: Request, res: Response) {

    let email = req.body.email;

    try {
        let exists = await (new UserService().emailExists(email));
        if (exists) {
            return HttpUtils.Throw(res, Errors.EmailExists)
        }

        if (req.session.verify && req.session.verify.signUpCodeCTime) {
            if (Date.now() - req.session.verify.signUpCodeCTime <= 60000) {
                return HttpUtils.Success(res, Errors.FrequentVerifyCode);
            }
        }


        let [verifyCode, successInfo] = await VerifyUtils.SendVerifyEmail(email);
        req.session.verify = req.session.verify || {};
        req.session.verify.signUpCode = verifyCode;
        req.session.verify.email = email;
        req.session.verify.signUpCodeCTime = Date.now();
        return HttpUtils.Success(res, null);
    }
    catch (e) {
        console.error(e);
        return HttpUtils.Throw(res, 500);
    }
}