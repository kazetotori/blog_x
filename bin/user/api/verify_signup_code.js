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
const HttpUtils_1 = require("../../utils/HttpUtils");
const server_1 = require("../../config/server");
const errors_1 = require("../../config/errors");
function router(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.session.verify);
        console.log(req.body);
        if (!req.session.verify) {
            return HttpUtils_1.HttpUtils.Throw(res, errors_1.Errors.SignUpVerifyCodeNotSend);
        }
        if (req.session.verify.signUpCode != req.body.code) {
            return HttpUtils_1.HttpUtils.Throw(res, errors_1.Errors.UncorrectSignUpVerifyCode);
        }
        let timeout = server_1.ServerConfig.SignUpVerifyCodeTimeout;
        if (Date.now() - req.session.verify.lasUpCodeCTime > timeout) {
            return HttpUtils_1.HttpUtils.Throw(res, errors_1.Errors.SignUpVerifyCodeTimeout);
        }
        return HttpUtils_1.HttpUtils.Success(res, null);
    });
}
exports.router = router;
