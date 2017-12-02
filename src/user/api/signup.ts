import { Request, Response } from "express";
import { ServerConfig } from "../../config/server";
import { SQLUtils } from "../../utils/SQLUtils";
import { QueryRunner } from "../../utils/QueryRunner";
import { HttpUtils } from "../../utils/HttpUtils";
import { CryptoUtils } from "../../utils/CryptoUtils";
import { Errors } from "../../config/errors";
import { Filters } from "../../config/QueryRunnerConfig";
const POOL = SQLUtils.Pool;




export async function router(req: Request, res: Response) {

    let queryBean = Object.assign({}, req.body);

    // 1、通过过滤器
    let fields = ['username', 'password', 'email', 'phone'];
    for (let i = 0; i < fields.length; i++) {
        let field = fields[i];
        let filter = Filters[field];
        let value = queryBean[field];
        if (!filter(value)) {
            return HttpUtils.Throw(res, Errors[`${field}FormatError`])
        }
    }

    // 2、检查验证码
    let verify = req.session.verify;
    if (!verify || !verify.signUpCode) {
        return HttpUtils.Throw(res, Errors.SignUpVerifyCodeNotSend);
    }
    if (verify.signUpCode != queryBean.signUpCode) {
        return HttpUtils.Throw(res, Errors.UncorrectSignUpVerifyCode);
    }
    if (Date.now() - verify.signUpCodeCTime > ServerConfig.SignUpVerifyCodeTimeout) {
        return HttpUtils.Throw(res, Errors.SignUpVerifyCodeTimeout);
    }
    if (verify.email !== queryBean.email) {
        return HttpUtils.Throw(res, Errors.UncorrectSignUpVerifyEmail);
    }


    // 3、插入数据
    let runner: QueryRunner = null;
    try {
        queryBean.password = CryptoUtils.MD5(queryBean.password);
        queryBean.nickname = queryBean.username;
        runner = await QueryRunner.GetInstance(POOL);
        await runner.Query('user.ins', queryBean, {});
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