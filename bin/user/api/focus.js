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
const SignStatus_1 = require("../enum/SignStatus");
const POOL = SQLUtils_1.SQLUtils.Pool;
function router(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req['signStatus'] != SignStatus_1.SignStatus.ONLINE) {
            return HttpUtils_1.HttpUtils.Throw(res, 500);
        }
        let blogUserid = req.query.blogUserid;
        let userid = req.session.signInfo.userid;
        let runner = null;
        let queryBean = {
            user_a: parseInt(blogUserid),
            user_b: userid,
            ship_lv: 1
        };
        try {
            runner = yield QueryRunner_1.QueryRunner.GetInstance(POOL);
            yield runner.Begin();
            let focused = (yield runner.Query('ship.selFocused', queryBean, {}))[0]['focused'];
            if (focused)
                yield runner.Query('ship.del', queryBean, {});
            else
                yield runner.Query('ship.ins', queryBean, {});
            yield runner.Commit();
            let fanCount = (yield runner.Query('ship.selFanCount', queryBean, {}))[0]['fanCount'];
            return HttpUtils_1.HttpUtils.Success(res, {
                focused: !focused,
                fanCount: fanCount
            });
        }
        catch (e) {
            if (runner)
                yield runner.Rollback();
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
