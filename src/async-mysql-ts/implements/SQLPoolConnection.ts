import { SQLConnection } from "./SQLConnection";
import { IPoolConnection } from "./../interface/IPoolConnection";
import { IPool } from "./../interface/IPool"

export class SQLPoolConnection extends SQLConnection implements IPoolConnection {

    // 连接池
    private pool: IPool;

    // 构造函数
    public constructor(config) {
        super(config);
    }

    /**
     * 释放当前连接对象，将其放回连接池中
     */
    public async Release(): Promise<void> {
        this.originConnection.release();
    }
}