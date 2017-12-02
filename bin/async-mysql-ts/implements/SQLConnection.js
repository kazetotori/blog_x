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
const mysql = require("mysql");
class SQLConnection {
    get IsAlive() { return this.isAlive; }
    get ThreadID() { return this.originConnection.threadId; }
    get Config() { return this.originConnection.config; }
    // 构造函数
    constructor(config) {
        this.originConnection = config.query ? config : mysql.createConnection(config);
        this.isAlive = true;
    }
    /**
     * 添加事件的监听函数
     * @param event 事件名
     * @param listener 监听函数
     */
    On(event, listener) {
        let conn = this.originConnection;
        conn.apply(conn, [event, listener]);
    }
    /**
     * 中断当前正在执行的连接并强制关闭
     */
    Destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            this.originConnection.destroy();
            this.isAlive = false;
        });
    }
    /**
     * 等待当前正在执行的命令结束，之后关闭该连接
     */
    End() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.originConnection.end(() => {
                    this.isAlive = false;
                    resolve();
                });
            });
        });
    }
    /**
     * 执行sql语句并获得返回的完整结果
     * @param sqlcmd sql命令
     * @param params sql参数
     */
    Query(sqlcmd, params) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn = this.originConnection;
            let args = [sqlcmd];
            if (params && params.length > 0)
                args.push(params);
            return new Promise((resolve, reject) => {
                args.push((err, data) => {
                    if (err)
                        reject(err);
                    else
                        resolve(data);
                });
                conn.query.apply(conn, args);
            });
        });
    }
    /**
     * 执行sql语句并获得行数据
     * @param sqlcmd sql命令
     * @param params sql参数
     */
    QueryRows(sqlcmd, params) {
        return __awaiter(this, void 0, void 0, function* () {
            let sqlrst = yield this.Query(sqlcmd, params);
            return sqlrst;
        });
    }
    /**
     * 执行sql语句并获得影响行数
     * @param sqlcmd sql命令
     * @param params sql参数
     */
    ExecAffectedRows(sqlcmd, params) {
        return __awaiter(this, void 0, void 0, function* () {
            let sqlrst = yield this.Query(sqlcmd, params);
            return sqlrst.affectedRows;
        });
    }
    /**
     * 执行sql语句并获得插入的id
     * @param sqlcmd sql命令
     * @param params sql参数
     */
    ExecInsertID(sqlcmd, params) {
        return __awaiter(this, void 0, void 0, function* () {
            let sqlrst = yield this.Query(sqlcmd, params);
            return sqlrst.insertId;
        });
    }
    /**
     * 当前连接开启事务
     */
    Begin() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.originConnection.beginTransaction((err) => {
                    if (err)
                        reject(err);
                    else
                        resolve();
                });
            });
        });
    }
    /**
     * 当前连接提交事务
     */
    Commit() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.originConnection.commit((err) => {
                    if (err)
                        reject(err);
                    else
                        resolve();
                });
            });
        });
    }
    /**
     * 当前连接事务回滚
     */
    Rollback() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.originConnection.rollback((err) => {
                    if (err)
                        reject(err);
                    else
                        resolve();
                });
            });
        });
    }
}
exports.SQLConnection = SQLConnection;
