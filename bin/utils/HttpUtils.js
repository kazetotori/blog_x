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
const session_1 = require("../filter/session");
class HttpUtils {
    // 私有化构造
    constructor() { }
    /**
     * 以成功的形式将数据返回给客户端
     * @param res 响应对象
     * @param data 返回给客户端的数据
     */
    static Success(res, data) {
        let ret = {
            errno: 0,
            data: data
        };
        res.json(ret);
    }
    /**
     * 向前端返回400状态码，并返回错误码
     * @param res 响应对象
     * @param err 错误对象
     */
    static Throw(res, errno) {
        res.status(400);
        res.json({ errno: errno });
    }
    /**
     * 清除该当前用户的session
     * @param req 请求对象
     */
    static ClearSession(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // 由于typescript的限制，只能够使用req['session']获取session对象
            let session = req.session;
            // 调用sessionMW中间件
            return new Promise((resovle, reject) => {
                session.destroy(() => session_1.filter(req, res, resovle));
            });
        });
    }
}
exports.HttpUtils = HttpUtils;
