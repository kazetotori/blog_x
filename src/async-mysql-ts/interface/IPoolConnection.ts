import { IConnection } from "./IConnection";

export interface IPoolConnection extends IConnection {

    // 释放当前连接至连接池
    Release(): Promise<void>;

}
