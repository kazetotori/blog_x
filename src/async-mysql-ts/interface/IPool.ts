import { IConnection } from "./IConnection";


export interface IPool {

    // 注册监听函数
    On(event: string, listener: Function): void;

    // 获取连接池中的连接
    GetConnection(): Promise<IConnection>;

    // 关闭连接池
    Close(): void;

}
