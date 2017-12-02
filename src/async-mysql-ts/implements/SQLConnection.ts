import { IConnection } from "./../interface/IConnection";
import * as mysql from "mysql";





export class SQLConnection implements IConnection {

    protected originConnection;
    private isAlive: boolean;
    public get IsAlive() { return this.isAlive; }
    public get ThreadID(): string { return this.originConnection.threadId; }
    public get Config(): object { return this.originConnection.config; }

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
    public On(event: string, listener: Function): void {
        let conn = this.originConnection
        conn.apply(conn, [event, listener]);
    }




    /**
     * 中断当前正在执行的连接并强制关闭
     */
    public async Destroy(): Promise<void> {
        this.originConnection.destroy();
        this.isAlive = false;
    }




    /**
     * 等待当前正在执行的命令结束，之后关闭该连接
     */
    public async End(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.originConnection.end(() => {
                this.isAlive = false;
                resolve();
            })
        });
    }




    /**
     * 执行sql语句并获得返回的完整结果
     * @param sqlcmd sql命令
     * @param params sql参数
     */
    public async Query(sqlcmd: string, params: any[]): Promise<any> {
        let conn = this.originConnection;
        let args: any[] = [sqlcmd];
        if (params && params.length > 0)
            args.push(params);
        return new Promise((resolve, reject) => {
            args.push((err: Error, data) => {
                if (err) reject(err);
                else resolve(data);
            });
            conn.query.apply(conn, args);
        });
    }




    /**
     * 执行sql语句并获得行数据
     * @param sqlcmd sql命令
     * @param params sql参数
     */
    public async QueryRows(sqlcmd: string, params: any[]): Promise<any[]> {
        let sqlrst = await this.Query(sqlcmd, params);
        return sqlrst;
    }



    /**
     * 执行sql语句并获得影响行数
     * @param sqlcmd sql命令
     * @param params sql参数
     */
    public async ExecAffectedRows(sqlcmd: string, params: any[]): Promise<number> {
        let sqlrst = await this.Query(sqlcmd, params);
        return sqlrst.affectedRows;
    }



    /**
     * 执行sql语句并获得插入的id
     * @param sqlcmd sql命令
     * @param params sql参数
     */
    public async ExecInsertID(sqlcmd: string, params: any[]): Promise<number> {
        let sqlrst = await this.Query(sqlcmd, params);
        return sqlrst.insertId;
    }




    /**
     * 当前连接开启事务
     */
    public async Begin(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.originConnection.beginTransaction((err) => {
                if (err) reject(err);
                else resolve();
            })
        });
    }




    /**
     * 当前连接提交事务
     */
    public async Commit(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.originConnection.commit((err) => {
                if (err) reject(err);
                else resolve();
            })
        });
    }




    /**
     * 当前连接事务回滚
     */
    public async Rollback(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.originConnection.rollback((err) => {
                if (err) reject(err);
                else resolve();
            })
        });
    }


}
