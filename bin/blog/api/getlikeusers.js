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
const QueryRunner_1 = require("../../utils/QueryRunner");
const SQLUtils_1 = require("../../utils/SQLUtils");
const HttpUtils_1 = require("../../utils/HttpUtils");
const POOL = SQLUtils_1.SQLUtils.Pool;
function router(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let blogno = parseInt(req.query.blogno);
        let runner = null;
        let queryBean = { blogno: blogno };
        try {
            runner = yield QueryRunner_1.QueryRunner.GetInstance(POOL);
            let likeUsers = yield runner.Query('blog_like.selLikeUsers', queryBean, {});
            return HttpUtils_1.HttpUtils.Success(res, { likeUsers: likeUsers });
        }
        catch (e) {
            console.error(e);
            return HttpUtils_1.HttpUtils.Throw(res, 500);
        }
        finally {
            if (runner)
                yield runner.Release();
        }
    });
}
exports.router = router;
