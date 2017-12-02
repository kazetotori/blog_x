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
const SQLUtils_1 = require("../../utils/SQLUtils");
const POOL = SQLUtils_1.SQLUtils.Pool;
function router(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.render('./aboutme/aboutme', {
            blogUser: req['blogUserInfo'],
            signInfo: {
                signStatus: req['signStatus'],
                username: req.session.signInfo.username,
                userid: req.session.signInfo.userid || 0,
            },
            backUrl: `/index/${req['blogUserInfo'].username}/aboutme`
        });
    });
}
exports.router = router;
