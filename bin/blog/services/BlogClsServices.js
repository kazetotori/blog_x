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
const POOL = SQLUtils_1.SQLUtils.Pool;
class BlogClsServices {
    /**
     * 获取用户分类列表
     * @param userid 用户编号
     */
    getUserCls(userno) {
        return __awaiter(this, void 0, void 0, function* () {
            let runner = null;
            try {
                runner = yield QueryRunner_1.QueryRunner.GetInstance(POOL);
                return yield runner.Query('blog_cls.selUserCls', { userno: userno }, {});
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
    getSingleCls(clsid, userno) {
        return __awaiter(this, void 0, void 0, function* () {
            let runner = null;
            try {
                runner = yield QueryRunner_1.QueryRunner.GetInstance(POOL);
                let rows = yield runner.Query('blog_cls.selCls', { clsid: clsid }, {});
                if (rows.length === 0 || rows[0].userno !== userno) {
                    return undefined;
                }
                return rows[0];
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
exports.BlogClsServices = BlogClsServices;
