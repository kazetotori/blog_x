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
const SignStatus_1 = require("../../user/enum/SignStatus");
const CryptoUtils_1 = require("../../utils/CryptoUtils");
function router(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let backUrl = req.query.back || '/square';
        if (req['signStatus'] === SignStatus_1.SignStatus.ONLINE) {
            return res.redirect(backUrl);
        }
        let signInfo = Object.assign({ username: '', password: null }, req.session.signInfo);
        if (signInfo.password && req.body.remenberMe) {
            signInfo.remenberMe = true;
            signInfo.fakePassword = CryptoUtils_1.CryptoUtils.NewGuid().slice(0, 8);
            req.session.signInfo.fakePassword = signInfo.fakePassword;
        }
        else {
            delete req.session.signInfo.password;
        }
        delete signInfo.password;
        delete signInfo.lastOnline;
        res.render('./signin/signin', {
            signInfo: signInfo
        });
    });
}
exports.router = router;
