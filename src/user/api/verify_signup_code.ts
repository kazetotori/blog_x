import { Request, Response } from "express";
import { HttpUtils } from "../../utils/HttpUtils";
import { ServerConfig } from "../../config/server";
import { Errors } from "../../config/errors";

export async function router(req: Request, res: Response) {
    console.log(req.session.verify);
    console.log(req.body);
    if (!req.session.verify) {
        return HttpUtils.Throw(res, Errors.SignUpVerifyCodeNotSend);
    }

    if (req.session.verify.signUpCode != req.body.code) {
        return HttpUtils.Throw(res, Errors.UncorrectSignUpVerifyCode);
    }

    let timeout = ServerConfig.SignUpVerifyCodeTimeout;
    if (Date.now() - req.session.verify.lasUpCodeCTime > timeout) {
        return HttpUtils.Throw(res, Errors.SignUpVerifyCodeTimeout);
    }

    return HttpUtils.Success(res, null);
}