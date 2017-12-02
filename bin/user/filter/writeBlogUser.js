"use strict";
/**
 * @ author: kazetotori
 * @ for   : 此文件用于将/index/aaa中的aaa的用户信息写入req中
 */
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
function filter(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let blogUsername = path.join(req.originalUrl).split('\\')[2];
        let runner = null;
        try {
            runner = yield QueryRunner_1.QueryRunner.GetInstance(POOL);
            let blogSignInfo = (yield runner.Query('user.selSignInfo', { username: blogUsername }, {}))[0] || {};
            let blogUserInfo = yield runner.Query('user.selUserInfo', { userid: blogSignInfo.userid }, {});
            req['blogUserInfo'] = blogUserInfo[0] || null;
            if (req['blogUserInfo']) {
                req['blogUserInfo'].userid = blogSignInfo.userid;
            }
            return next();
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
exports.filter = filter;
