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
class UserService {
    constructor() { }
    /**
     * 判断邮箱是否已经被占用
     * @param email 邮箱
     */
    emailExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let runner = null;
            try {
                runner = yield QueryRunner_1.QueryRunner.GetInstance(POOL);
                let exists = (yield runner.Query('user.selEmailExists', { email: email }, {})).length > 0;
                return exists;
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
exports.UserService = UserService;
