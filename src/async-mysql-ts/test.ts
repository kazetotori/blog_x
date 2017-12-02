import { IPool } from "./interface/IPool";
import { IConnection } from "./interface/IConnection";
import { IPoolConnection } from "./interface/IPoolConnection";
import { SQLPool } from "./implements/SQLPool";
import { SQLConnection } from "./implements/SQLConnection";
import { SQLPoolConnection } from "./implements/SQLPoolConnection";

let pool = new SQLPool({
    host: 'localhost',
    user: 'kazetotori',
    password: 'Zq12398045',
    database: 'j32sys'
});

(async function () {
    let conn = await pool.GetConnection();
    //let rst = await conn.ExecInsertID('INSERT INTO star VALUES(NULL,"你d啊",123,234,0,now(),now())', null);
    await conn.Release();
    console.log('aaa');


}())