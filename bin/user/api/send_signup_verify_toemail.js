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
const VerifyUtils_1 = require("../../utils/VerifyUtils");
const UserService_1 = require("../services/UserService");
const HttpUtils_1 = require("../../utils/HttpUtils");
const errors_1 = require("../../config/errors");
function router(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let email = req.body.email;
        try {
            let exists = yield (new UserService_1.UserService().emailExists(email));
            if (exists) {
                return HttpUtils_1.HttpUtils.Throw(res, errors_1.Errors.EmailExists);
            }
            if (req.session.verify && req.session.verify.signUpCodeCTime) {
                if (Date.now() - req.session.verify.signUpCodeCTime <= 60000) {
                    return HttpUtils_1.HttpUtils.Success(res, errors_1.Errors.FrequentVerifyCode);
                }
            }
            let [verifyCode, successInfo] = yield VerifyUtils_1.VerifyUtils.SendVerifyEmail(email);
            req.session.verify = req.session.verify || {};
            req.session.verify.signUpCode = verifyCode;
            req.session.verify.email = email;
            req.session.verify.signUpCodeCTime = Date.now();
            return HttpUtils_1.HttpUtils.Success(res, null);
        }
        catch (e) {
            console.error(e);
            return HttpUtils_1.HttpUtils.Throw(res, 500);
        }
    });
}
exports.router = router;
