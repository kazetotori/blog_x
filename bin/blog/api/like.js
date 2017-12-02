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
        let blogno = req.query.blogno;
        let runner = null;
        let paramBean = {
            blogno: parseInt(blogno),
            userno: (req.session.signInfo || {})['userid']
        };
        try {
            runner = yield QueryRunner_1.QueryRunner.GetInstance(POOL);
            yield runner.Begin();
            let liked = (yield runner.Query("blog_like.selOne", paramBean, {})).length === 1;
            let queryName = liked ? 'blog_like.del' : 'blog_like.ins';
            yield runner.Query(queryName, paramBean, {});
            yield runner.Commit();
            let likeCount = (yield runner.Query('blog_like.selBlogLikedCount', paramBean, {}))[0]['likeCount'];
            let resBean = {
                liked: !liked,
                likeCount: likeCount
            };
            resBean.userinfo = ((yield runner.Query('user.selSimpleInfo', { userid: paramBean.userno }, {})))[0];
            HttpUtils_1.HttpUtils.Success(res, resBean);
        }
        catch (e) {
            console.error(e);
            HttpUtils_1.HttpUtils.Throw(res, 500);
        }
        finally {
            if (runner) {
                yield runner.Rollback();
                yield runner.Release();
            }
        }
    });
}
exports.router = router;
