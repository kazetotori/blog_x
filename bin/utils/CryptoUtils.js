"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
class CryptoUtils {
    // 私有化构造
    constructor() { }
    /**
     * NewGuid
     * 获取全球唯一标识符
     */
    static NewGuid() {
        let guid = "";
        for (let i = 1; i <= 32; i++) {
            let n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
                guid += "-";
        }
        return guid;
    }
    /**
     * ComputeMD5
     * 计算给定字符串的md5值
     * @param str 源字符串
     */
    static MD5(str) {
        let md5 = crypto.createHash('md5');
        md5.update(str);
        return md5.digest('hex');
    }
    /**
     * 获取处于[min,max)的一个随机值
     * @param min 左边界
     * @param max 右边界
     */
    static RandNum(min, max, floor = true) {
        let num = Math.random() * (max - min) + min;
        if (floor) {
            num = Math.floor(num);
        }
        return num;
    }
}
exports.CryptoUtils = CryptoUtils;
