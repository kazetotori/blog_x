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
const SignStatus_1 = require("../../user/enum/SignStatus");
const POOL = SQLUtils_1.SQLUtils.Pool;
function router(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let blogUserno = req.body.blogUserno;
        let pageNo = req.body.pageNo;
        let pageCount = 10;
        let limitStart = (pageNo - 1) * pageCount;
        let runner = null;
        let queryBean = {
            userno: parseInt(blogUserno),
            limitStart: limitStart,
            pageCount: pageCount
        };
        console.log(queryBean);
        if (req['signStatus'] === SignStatus_1.SignStatus.ONLINE) {
            queryBean['signedUserid'] = req.session.signInfo.userid;
        }
        try {
            runner = yield QueryRunner_1.QueryRunner.GetInstance(POOL);
            let blogList = yield runner.Query('blog.selPreviews', queryBean, {});
            let totalCount = (yield runner.Query('blog.selCount', queryBean, {}))[0]['blogCount'];
            HttpUtils_1.HttpUtils.Success(res, {
                blogList: blogList,
                totalCount: totalCount,
                hasNextPage: (pageCount + limitStart) < totalCount
            });
        }
        catch (e) {
            console.error(e);
            HttpUtils_1.HttpUtils.Throw(e, 500);
        }
        finally {
            if (runner)
                yield runner.Release();
        }
    });
}
exports.router = router;
