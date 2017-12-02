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
const QueryRunner_1 = require("../../utils/QueryRunner");
const POOL = SQLUtils_1.SQLUtils.Pool;
class BlogReplyServices {
    constructor() { }
    getReplyList(blogno, signedUserid) {
        return __awaiter(this, void 0, void 0, function* () {
            let runner = null;
            let queryBean = { blogno: blogno, signedUserid: parseInt(signedUserid) };
            try {
                runner = yield QueryRunner_1.QueryRunner.GetInstance(POOL);
                let toBlogReplys = yield runner.Query('blog_reply.selToBlogReplys', queryBean, {});
                for (let i = 0; i < toBlogReplys.length; i++) {
                    let reply = toBlogReplys[i];
                    queryBean['reply_to'] = reply.replyid;
                    reply.replys = yield runner.Query('blog_reply.selToReplyReplys', queryBean, {});
                }
                return toBlogReplys;
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
}
exports.BlogReplyServices = BlogReplyServices;
