import { SQLPool } from "../async-mysql-ts/implements/SQLPool";
import { IPoolConnection } from "../async-mysql-ts/interface/IPoolConnection";
import { SqlConfig } from "../config/sql";



/**
 * 封装SQL操作的工具类
 */
export class SQLUtils {


    // 私有化构造
    private constructor() { }




    /**
     * mysql连接池
     */
    public static readonly Pool: SQLPool = new SQLPool(SqlConfig);





    /**
     * 调用连接池的连接执行附带参数的sql命令
     * 该函数将捕获所有sql异常，如果某个连接出现异常，则抛出该异常
     * 无论是否出现异常，该函数将在执行一次sql命令后释放该连接
     * @param sqlcmd sql命令
     * @param params sql参数
     */
    public static async Query(sqlcmd: string, params: any[]): Promise<any> {
        let conn: IPoolConnection = null;
        try {
            conn = await SQLUtils.Pool.GetConnection();
            return await conn.Query(sqlcmd, params);
        } catch (e) {
            throw e;
        } finally {
            if (conn) {
                await conn.Release();
            }
        }
    }






    /**
     * 执行sql命令，并返回受影响的行数，对于sql抛出的异常，请见SQLUtils.Query函数的说明
     * @param sqlcmd sql命令
     * @param params sql参数
     */
    public static async ExecAffectedRows(sqlcmd: string, params: any[]): Promise<number> {
        return (await SQLUtils.Query(sqlcmd, params)).affectedRows;
    }






    /**
     * 执行sql命令，并返回插入数据的id，对于sql抛出的异常，请见SQLUtils.Query函数的说明
     * @param sqlcmd sql命令
     * @param params sql参数
     */
    public static async ExecInsertID(sqlcmd: string, params: any[]): Promise<number> {
        return (await SQLUtils.Query(sqlcmd, params)).insertId;
    }





    /**
     * GetToUpdatesAndParams:
     * 根据模型获取待更新字段的集合以及对应的sql参数数组,
     * 待更新字段将以 " key=? "的方式存入数组
     * @param bean 模型对象
     * @param canupdateProps 可更新的字段对应的模型的属性
     * @return 第一个返回值为toUpdates，第二个返回值为params
     */
    public static GetToUpdatesAndParams(bean, canupdateProps: string[]): [string[], any[]] {
        let params = [];
        let toUpdate = [];

        canupdateProps.forEach(prop => {
            if (bean[prop] === undefined)
                return;
            params.push(bean[prop]);
            toUpdate.push(` ${prop}=? `);

        })

        return [toUpdate, params];
    }

}



SQLUtils.ExecInsertID