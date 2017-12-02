"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DateUtils {
    // 私有化构造
    constructor() { }
    /**
     * 获得某年份是否为闰年
     * @param year 年份
     */
    static IsLeapYear(year) {
        return year % 100 === 0 ?
            year % 400 === 0 :
            year % 4 === 0;
    }
}
exports.DateUtils = DateUtils;
