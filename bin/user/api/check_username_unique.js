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
const QueryRunnerConfig_1 = require("../../config/QueryRunnerConfig");
const HttpUtils_1 = require("../../utils/HttpUtils");
const QueryRunner_1 = require("../../utils/QueryRunner");
const SQLUtils_1 = require("../../utils/SQLUtils");
const errors_1 = require("../../config/errors");
const POOL = SQLUtils_1.SQLUtils.Pool;
function router(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let username = req.body.username;
        if (!QueryRunnerConfig_1.Filters.username(username)) {
            return HttpUtils_1.HttpUtils.Throw(res, errors_1.Errors.UsernameFormatError);
        }
        let runner = null;
        try {
            runner = yield QueryRunner_1.QueryRunner.GetInstance(POOL);
            let exists = (yield runner.Query('user.selSignInfo', { username: username }, {})).length > 0;
            if (exists) {
                return HttpUtils_1.HttpUtils.Throw(res, errors_1.Errors.UsernameExists);
            }
            return HttpUtils_1.HttpUtils.Success(res, null);
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
exports.router = router;
