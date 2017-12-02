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
const SQLPoolConnection_1 = require("./SQLPoolConnection");
const mysql = require("mysql");
class SQLPool {
    get Config() { return this.originPool.config; }
    get IsAlive() { return this.isAlive; }
    /**
     *  构造函数
     */
    constructor(config) {
        this.originPool = config && config.getConnection ? config : mysql.createPool(config);
        this.isAlive = true;
    }
    /**
     * On
     * @param event 事件名称
     * @param listener 监听的回调函数
     */
    On(event, listener) {
        this.originPool;
    }
    /**
     * GetConnection
     * 获取当前连接池的连接对象
     */
    GetConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.originPool.getConnection((err, conn) => {
                    if (err)
                        reject(err);
                    else
                        resolve(new SQLPoolConnection_1.SQLPoolConnection(conn));
                });
            });
        });
    }
    /**
     * 关闭连接池
     */
    Close() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.originPool.close((err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        this.isAlive = false;
                        resolve();
                    }
                });
            });
        });
    }
}
exports.SQLPool = SQLPool;
