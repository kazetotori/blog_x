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
const HttpUtils_1 = require("../../utils/HttpUtils");
const POOL = SQLUtils_1.SQLUtils.Pool;
function router(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let runner = null;
        let blogid = req.query.blogid;
        let clsid = req.query.clsid;
        let userid = (req.session.signInfo || {})['userid'];
        if (!userid) {
            return HttpUtils_1.HttpUtils.Throw(res, 500);
        }
        try {
            runner = yield QueryRunner_1.QueryRunner.GetInstance(POOL);
            yield runner.Begin();
            // 获取原文
            let originBlog = (yield runner.Query('blog.selAllFields', { blogid: blogid }, {}))[0];
            if (!originBlog) {
                yield runner.Rollback();
                return HttpUtils_1.HttpUtils.Throw(res, 500);
            }
            // 在t_blog中插入数据
            originBlog.clsno = clsid;
            originBlog.userno = userid;
            let blogno = (yield runner.Query('blog.ins', originBlog, {})).insertId;
            // 在t_trans中插入数据
            yield runner.Query('trans.ins', { trans_from: originBlog.blogid, blogno: blogno }, {});
            yield runner.Commit();
            HttpUtils_1.HttpUtils.Success(res, null);
        }
        catch (e) {
            if (runner)
                yield runner.Rollback();
            console.error(e);
            HttpUtils_1.HttpUtils.Throw(res, 500);
        }
        finally {
            if (runner)
                yield runner.Release();
        }
    });
}
exports.router = router;
