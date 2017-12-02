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
const BlogReplyServices_1 = require("../services/BlogReplyServices");
const SignStatus_1 = require("../../user/enum/SignStatus");
const HttpUtils_1 = require("../../utils/HttpUtils");
function router(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let signInfo = req['signStatus'] === SignStatus_1.SignStatus.ONLINE ? req.session.signInfo : { userid: 0 };
        let blogno = parseInt(req.query.blogno);
        try {
            let replyList = yield (new BlogReplyServices_1.BlogReplyServices().getReplyList(blogno, signInfo.userid));
            console.log(replyList);
            HttpUtils_1.HttpUtils.Success(res, {
                replyList: replyList
            });
        }
        catch (e) {
            console.error(e);
            HttpUtils_1.HttpUtils.Throw(res, e);
        }
    });
}
exports.router = router;
