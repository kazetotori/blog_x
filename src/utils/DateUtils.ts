export class DateUtils {

    // 私有化构造
    private constructor() { }




    /**
     * 获得某年份是否为闰年
     * @param year 年份
     */
    public static IsLeapYear(year: number): boolean {
        return year % 100 === 0 ?
            year % 400 === 0 :
            year % 4 === 0;
    }
}   