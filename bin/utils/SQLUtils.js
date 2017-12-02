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
const SQLPool_1 = require("../async-mysql-ts/implements/SQLPool");
const sql_1 = require("../config/sql");
/**
 * 封装SQL操作的工具类
 */
class SQLUtils {
    // 私有化构造
    constructor() { }
    /**
     * 调用连接池的连接执行附带参数的sql命令
     * 该函数将捕获所有sql异常，如果某个连接出现异常，则抛出该异常
     * 无论是否出现异常，该函数将在执行一次sql命令后释放该连接
     * @param sqlcmd sql命令
     * @param params sql参数
     */
    static Query(sqlcmd, params) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn = null;
            try {
                conn = yield SQLUtils.Pool.GetConnection();
                return yield conn.Query(sqlcmd, params);
            }
            catch (e) {
                throw e;
            }
            finally {
                if (conn) {
                    yield conn.Release();
                }
            }
        });
    }
    /**
     * 执行sql命令，并返回受影响的行数，对于sql抛出的异常，请见SQLUtils.Query函数的说明
     * @param sqlcmd sql命令
     * @param params sql参数
     */
    static ExecAffectedRows(sqlcmd, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield SQLUtils.Query(sqlcmd, params)).affectedRows;
        });
    }
    /**
     * 执行sql命令，并返回插入数据的id，对于sql抛出的异常，请见SQLUtils.Query函数的说明
     * @param sqlcmd sql命令
     * @param params sql参数
     */
    static ExecInsertID(sqlcmd, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield SQLUtils.Query(sqlcmd, params)).insertId;
        });
    }
    /**
     * GetToUpdatesAndParams:
     * 根据模型获取待更新字段的集合以及对应的sql参数数组,
     * 待更新字段将以 " key=? "的方式存入数组
     * @param bean 模型对象
     * @param canupdateProps 可更新的字段对应的模型的属性
     * @return 第一个返回值为toUpdates，第二个返回值为params
     */
    static GetToUpdatesAndParams(bean, canupdateProps) {
        let params = [];
        let toUpdate = [];
        canupdateProps.forEach(prop => {
            if (bean[prop] === undefined)
                return;
            params.push(bean[prop]);
            toUpdate.push(` ${prop}=? `);
        });
        return [toUpdate, params];
    }
}
/**
 * mysql连接池
 */
SQLUtils.Pool = new SQLPool_1.SQLPool(sql_1.SqlConfig);
exports.SQLUtils = SQLUtils;
SQLUtils.ExecInsertID;
