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
const SignStatus_1 = require("../../user/enum/SignStatus");
const path = require("path");
const POOL = SQLUtils_1.SQLUtils.Pool;
function router(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let blogUser = req['blogUserInfo'];
        if (!blogUser) {
            return res.redirect('/404');
        }
        blogUser.indexUrl = path.join('/index/', '/', blogUser.username).replace(/\\/g, '/');
        let runner = null;
        let page = parseInt(req.query.page || 1);
        try {
            runner = yield QueryRunner_1.QueryRunner.GetInstance(POOL);
            let paramBean = {
                userno: blogUser.userid,
                limitStart: (page - 1) * 10
            };
            if (req['signStatus'] === SignStatus_1.SignStatus.ONLINE) {
                paramBean['signedUserid'] = req.session.signInfo.userid;
            }
            let blogList = yield runner.Query('blog.selPreviews', paramBean, {});
            blogUser.fanCount = (yield runner.Query('ship.selFanCount', { user_a: blogUser.userid }, {}))[0]['fanCount'];
            blogUser.focusCount = (yield runner.Query('ship.selFocusCount', { user_b: blogUser.userid }, {}))[0]['focusCount'];
            blogUser.visitedTimes = (yield runner.Query('visit.selVisitedTimes', { bloger: blogUser.userid }, {})).length;
            let shipQueryBean = { user_a: blogUser.userid, user_b: paramBean['signedUserid'] };
            let focused = (yield runner.Query('ship.selFocused', shipQueryBean, {}))[0]['focused'] == 1;
            let isFriend = (yield runner.Query('ship.selIsFriend', shipQueryBean, {}))[0]['is_friend'] == 1;
            res.render('index/index', {
                signInfo: {
                    signStatus: req['signStatus'],
                    username: req.session.signInfo.username,
                    userid: req.session.signInfo.userid || 0
                },
                blogUser: req['blogUserInfo'],
                blogList: blogList,
                backUrl: `/index/${req['blogUserInfo'].username}`,
                ship: {
                    focused: focused,
                    isFriend: isFriend
                }
            });
        }
        catch (e) {
            console.error(e);
            res.redirect('/500');
        }
        finally {
            if (runner)
                yield runner.Release();
        }
    });
}
exports.router = router;
