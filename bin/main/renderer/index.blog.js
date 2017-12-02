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
const path = require("path");
const POOL = SQLUtils_1.SQLUtils.Pool;
function router(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let blogid = parseInt(req.query.blogid);
        if (isNaN(blogid)) {
            return res.redirect('/404');
        }
        let runner = null;
        let signInfo = req.session.signInfo || { userid: 0, username: '' };
        let queryBean = {
            blogid: blogid,
            signedUserid: signInfo.userid
        };
        try {
            runner = yield QueryRunner_1.QueryRunner.GetInstance(POOL);
            let blog = (yield runner.Query('blog.selBlog', queryBean, {}))[0];
            if (!blog) {
                return res.redirect('/404');
            }
            let blogUser = (yield runner.Query('user.selUserInfo', { userid: blog.userno }, {}))[0];
            if (!blogUser) {
                return res.redirect('/404');
            }
            if (blogUser.username !== path.join(req.originalUrl).split(/\\|\//)[2]) {
                return res.redirect('/404');
            }
            blogUser.userid = blog.userno;
            blogUser.fanCount = (yield runner.Query('ship.selFanCount', { user_a: blogUser.userid }, {}))[0]['fanCount'];
            blogUser.focusCount = (yield runner.Query('ship.selFocusCount', { user_b: blogUser.userid }, {}))[0]['focusCount'];
            blogUser.visitedTimes = (yield runner.Query('visit.selVisitedTimes', { bloger: blogUser.userid }, {})).length;
            blogUser.indexUrl = path.join('/index/', '/', blogUser.username).replace(/\\/g, '/');
            queryBean['userno'] = blog.userno;
            blog.next = (yield runner.Query('blog.selNext', queryBean, {}))[0];
            blog.pre = (yield runner.Query('blog.selPre', queryBean, {}))[0];
            return res.render('./index.blog/blog', {
                signInfo: {
                    signStatus: req['signStatus'],
                    username: signInfo.username,
                    userid: req.session.signInfo.userid || 0
                },
                blogUser: blogUser,
                backUrl: `/index/${req['blogUserInfo'].username}/blog?blogid=${blogid}`,
                blog: blog,
                ship: {}
            });
        }
        catch (e) {
            console.error(e);
            return res.redirect('/500');
        }
        finally {
            if (runner)
                yield runner.Release();
        }
    });
}
exports.router = router;
