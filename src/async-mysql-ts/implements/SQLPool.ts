import { IPool } from "./../interface/IPool";
import { IPoolConnection } from "./../interface/IPoolConnection";
import { SQLPoolConnection } from "./SQLPoolConnection";
import * as mysql from "mysql";


export class SQLPool implements IPool {

    private originPool;
    private isAlive: boolean;
    public get Config(): object { return this.originPool.config; }
    public get IsAlive(): boolean { return this.isAlive; }



    /**
     *  构造函数
     */
    public constructor(config) {
        this.originPool = config && config.getConnection ? config : mysql.createPool(config);
        this.isAlive = true;
    }






    /**
     * On
     * @param event 事件名称
     * @param listener 监听的回调函数
     */
    public On(event: string, listener: Function): void {
        this.originPool
    }






    /**
     * GetConnection
     * 获取当前连接池的连接对象
     */
    public async GetConnection(): Promise<IPoolConnection> {
        return new Promise<IPoolConnection>((resolve, reject) => {
            this.originPool.getConnection((err, conn) => {
                if (err) reject(err)
                else resolve(new SQLPoolConnection(conn));
            })
        });
    }







    /**
     * 关闭连接池
     */
    public async Close(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.originPool.close((err) => {
                if (err) {
                    reject(err);
                }
                else {
                    this.isAlive = false;
                    resolve();
                }
            })
        });
    }
}