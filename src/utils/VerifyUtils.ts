import { CryptoUtils } from "./CryptoUtils";
import { EmailConfig } from "../config/email";
import { ServerConfig } from "../config/server";
import * as nodemailer from "nodemailer";

const hash = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export class VerifyUtils {

    private constructor() { }


    /**
    * 获取指定位数验证码
    */
    public static NewVerifyCode(size): string {
        let code = '';
        let len = hash.length;
        for (let i = 0; i < size; i++) {
            let idx = CryptoUtils.RandNum(0, len);
            code += hash[idx];
        }
        return code;
    }



    /**
     * 发送一封带有验证码的邮件至指定邮箱
     * @param to 目标邮箱
     * @return 验证码,服务商返回的信息
     */
    public static async SendVerifyEmail(to: string): Promise<[string, string]> {
        let code = VerifyUtils.NewVerifyCode(6);
        let transer = nodemailer.createTransport(EmailConfig);
        let host = `http://${ServerConfig.Host}`;
        let options = {
            from: EmailConfig.auth.user,
            to: to,
            subject: '注册MayLight的验证信息',
            html: `<p>您好，您正在<a href="host">${host}</a>中注册帐号，验证码为<h1>${code}</h1></p>`
        };

        return new Promise<[string, string]>((resolve, reject) => {
            transer.sendMail(options, (err, info) => {
                if (err) return reject(err);
                resolve([code, info]);
            })
        });
    }
}