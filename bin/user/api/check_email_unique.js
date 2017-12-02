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
const errors_1 = require("../../config/errors");
const UserService_1 = require("../services/UserService");
function router(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let email = req.body.email;
        if (!QueryRunnerConfig_1.Filters.email(email)) {
            return HttpUtils_1.HttpUtils.Throw(res, errors_1.Errors.EmailFormatError);
        }
        try {
            let exists = yield (new UserService_1.UserService().emailExists(email));
            if (exists) {
                return HttpUtils_1.HttpUtils.Throw(res, errors_1.Errors.EmailExists);
            }
            return HttpUtils_1.HttpUtils.Success(res, null);
        }
        catch (e) {
            console.error(e);
            return HttpUtils_1.HttpUtils.Throw(res, 500);
        }
    });
}
exports.router = router;
