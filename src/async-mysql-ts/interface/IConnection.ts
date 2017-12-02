export interface IConnection {

    // 监听事件
    On(event: string, listener: Function);

    // 销毁当前连接
    Destroy(): Promise<void>;

    // 销毁当前连接，但等待已经query执行完毕
    End(): Promise<void>;

    // 执行sql语句并获得返回的所有行，该函数不保证返回类型
    Query(cmd: string, params: any[]): Promise<object>;

    // 加入泛型的Query函数，将返回所有行的模型数组
    QueryRows(cmd: string, params: any[]): Promise<any[]>;

    // 执行sql语句并返回受影响的行数
    ExecAffectedRows(cmd: string, params: any[]): Promise<number>;

    // 执行sql语句并返回最后插入的id
    ExecInsertID(cmd: string, params: any[]): Promise<number>;

    // 当前连接开启事务
    Begin(): Promise<void>;

    // 当前连接事务回滚
    Rollback(): Promise<void>;

    // 当前连接事务提交
    Commit(): Promise<void>;

}
