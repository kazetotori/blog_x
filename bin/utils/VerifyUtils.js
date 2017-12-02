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
const CryptoUtils_1 = require("./CryptoUtils");
const email_1 = require("../config/email");
const server_1 = require("../config/server");
const nodemailer = require("nodemailer");
const hash = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
class VerifyUtils {
    constructor() { }
    /**
    * 获取指定位数验证码
    */
    static NewVerifyCode(size) {
        let code = '';
        let len = hash.length;
        for (let i = 0; i < size; i++) {
            let idx = CryptoUtils_1.CryptoUtils.RandNum(0, len);
            code += hash[idx];
        }
        return code;
    }
    /**
     * 发送一封带有验证码的邮件至指定邮箱
     * @param to 目标邮箱
     * @return 验证码,服务商返回的信息
     */
    static SendVerifyEmail(to) {
        return __awaiter(this, void 0, void 0, function* () {
            let code = VerifyUtils.NewVerifyCode(6);
            let transer = nodemailer.createTransport(email_1.EmailConfig);
            let host = `http://${server_1.ServerConfig.Host}`;
            let options = {
                from: email_1.EmailConfig.auth.user,
                to: to,
                subject: '注册MayLight的验证信息',
                html: `<p>您好，您正在<a href="host">${host}</a>中注册帐号，验证码为<h1>${code}</h1></p>`
            };
            return new Promise((resolve, reject) => {
                transer.sendMail(options, (err, info) => {
                    if (err)
                        return reject(err);
                    resolve([code, info]);
                });
            });
        });
    }
}
exports.VerifyUtils = VerifyUtils;
