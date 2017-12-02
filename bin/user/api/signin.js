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
const express_1 = require("express");
const QueryRunner_1 = require("../../utils/QueryRunner");
const SQLUtils_1 = require("../../utils/SQLUtils");
const HttpUtils_1 = require("../../utils/HttpUtils");
const CryptoUtils_1 = require("../../utils/CryptoUtils");
const errors_1 = require("../../config/errors");
const POOL = SQLUtils_1.SQLUtils.Pool;
exports.router = express_1.Router();
exports.router.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let runner = null;
    try {
        runner = yield QueryRunner_1.QueryRunner.GetInstance(POOL);
        let signInfo = (yield runner.Query("user.selSignInfo", { username: req.body.username }, {}))[0];
        let oldSignInfo = req.session.signInfo || {};
        let password;
        // 用户名不存在
        if (!signInfo) {
            req.session.signInfo = { username: oldSignInfo.username || req.body.username || '' };
            return HttpUtils_1.HttpUtils.Throw(res, errors_1.Errors.UserNotFound);
        }
        // 如果使用的是记住密码的密码
        // 即session中存在密码并且body中的伪密码与session中的伪密码相同则使用session中的密码
        if (oldSignInfo.password
            && oldSignInfo.fakePassword
            && oldSignInfo.fakePassword === req.body.password) {
            password = oldSignInfo.password;
        }
        else {
            password = CryptoUtils_1.CryptoUtils.MD5(req.body.password);
        }
        // 比对密码
        if (password !== signInfo.password) {
            req.session.signInfo = { username: oldSignInfo.username || req.body.username || '' };
            return HttpUtils_1.HttpUtils.Throw(res, errors_1.Errors.PasswordError);
        }
        // 登录信息验证成功
        // 如果与原先登录的账号不一致，首先清空req.session.signInfo
        if (oldSignInfo.userid !== signInfo.userid) {
            req.session.signInfo = {};
        }
        req.session.signInfo.lastOnline = Date.now();
        req.session.signInfo.userid = signInfo.userid;
        req.session.signInfo.username = signInfo.username;
        req.session.signInfo.nickname = signInfo.nickname;
        if (req.body.remenberMe) {
            req.session.signInfo.password = signInfo.password;
        }
        else {
            delete req.session.signInfo.password;
        }
        return HttpUtils_1.HttpUtils.Success(res, null);
    }
    catch (e) {
        let username = req.session.signInfo.username || req.body.username || '';
        req.session.signInfo = { username: username };
        console.error(e);
        return HttpUtils_1.HttpUtils.Throw(res, 500);
    }
    finally {
        if (runner)
            yield runner.Release();
    }
}));
