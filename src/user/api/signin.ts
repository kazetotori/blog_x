import { Request, Response, Router } from "express";
import { QueryRunner } from "../../utils/QueryRunner";
import { SQLUtils } from "../../utils/SQLUtils";
import { HttpUtils } from "../../utils/HttpUtils";
import { CryptoUtils } from "../../utils/CryptoUtils";
import { Errors } from "../../config/errors"
const POOL = SQLUtils.Pool;


export let router = Router();
router.use(async (req, res, next) => {

    let runner: QueryRunner = null;

    try {

        runner = await QueryRunner.GetInstance(POOL);
        let signInfo = (await runner.Query("user.selSignInfo", { username: req.body.username }, {}))[0];
        let oldSignInfo = req.session.signInfo || {};
        let password;

        // 用户名不存在
        if (!signInfo) {
            req.session.signInfo = { username: oldSignInfo.username || req.body.username || '' };
            return HttpUtils.Throw(res, Errors.UserNotFound);
        }

        // 如果使用的是记住密码的密码
        // 即session中存在密码并且body中的伪密码与session中的伪密码相同则使用session中的密码
        if (oldSignInfo.password
            && oldSignInfo.fakePassword
            && oldSignInfo.fakePassword === req.body.password
        ) {
            password = oldSignInfo.password;
        } else {
            password = CryptoUtils.MD5(req.body.password);
        }

        // 比对密码
        if (password !== signInfo.password) {
            req.session.signInfo = { username: oldSignInfo.username || req.body.username || '' };
            return HttpUtils.Throw(res, Errors.PasswordError);
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
        } else {
            delete req.session.signInfo.password;
        }

        return HttpUtils.Success(res, null);

    }

    catch (e) {

        let username = req.session.signInfo.username || req.body.username || '';
        req.session.signInfo = { username: username };
        console.error(e);
        return HttpUtils.Throw(res, 500);

    }

    finally {
        if(runner) await runner.Release();
    }

})