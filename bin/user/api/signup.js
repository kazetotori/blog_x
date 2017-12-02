"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../config/server");
const SQLUtils_1 = require("../../utils/SQLUtils");
const QueryRunner_1 = require("../../utils/QueryRunner");
const HttpUtils_1 = require("../../utils/HttpUtils");
const CryptoUtils_1 = require("../../utils/CryptoUtils");
const errors_1 = require("../../config/errors");
const QueryRunnerConfig_1 = require("../../config/QueryRunnerConfig");
const POOL = SQLUtils_1.SQLUtils.Pool;
function router(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let queryBean = Object.assign({}, req.body);
        // 1、通过过滤器
        let fields = ['username', 'password', 'email', 'phone'];
        for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            let filter = QueryRunnerConfig_1.Filters[field];
            let value = queryBean[field];
            if (!filter(value)) {
                return HttpUtils_1.HttpUtils.Throw(res, errors_1.Errors[`${field}FormatError`]);
            }
        }
        // 2、检查验证码
        let verify = req.session.verify;
        if (!verify || !verify.signUpCode) {
            return HttpUtils_1.HttpUtils.Throw(res, errors_1.Errors.SignUpVerifyCodeNotSend);
        }
        if (verify.signUpCode != queryBean.signUpCode) {
            return HttpUtils_1.HttpUtils.Throw(res, errors_1.Errors.UncorrectSignUpVerifyCode);
        }
        if (Date.now() - verify.signUpCodeCTime > server_1.ServerConfig.SignUpVerifyCodeTimeout) {
            return HttpUtils_1.HttpUtils.Throw(res, errors_1.Errors.SignUpVerifyCodeTimeout);
        }
        if (verify.email !== queryBean.email) {
            return HttpUtils_1.HttpUtils.Throw(res, errors_1.Errors.UncorrectSignUpVerifyEmail);
        }
        // 3、插入数据
        let runner = null;
        try {
            queryBean.password = CryptoUtils_1.CryptoUtils.MD5(queryBean.password);
            queryBean.nickname = queryBean.username;
            runner = yield QueryRunner_1.QueryRunner.GetInstance(POOL);
            yield runner.Query('user.ins', queryBean, {});
            return HttpUtils_1.HttpUtils.Success(res, null);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
        finally {
            if (runner)
                yield runner.Release();
        }
    });
}
exports.router = router;
