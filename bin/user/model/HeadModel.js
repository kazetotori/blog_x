"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * insert
 */
const ins = {
    sql: `INSERT INTO {t_head} (headurl,userno,c_time,u_time) VALUES(?,?,NOW(),NOW())`,
    paramNames: ['headurl', 'userno'],
    necessaryParams: '*'
};
/**
 * delete
 */
const del = {
    sql: `DELETE FROM {t_head}
          WHERE headid=? AND userno=? AND headid <> (
            SELECT headno 
              FROM {t_user}
            WHERE userid=?
         )`,
    paramNames: ['headid', 'userno', 'userno'],
    necessaryParams: '*'
};
/**
 * select
 */
const sel = {
    sql: `SELECT headid,headurl FROM {t_head} WHERE userno=? OR headid=1 ORDER BY c_time ASC`,
    paramNames: ['userno'],
    necessaryParams: '*'
};
// 导出 
exports.Queriers = {
    "head.ins": ins,
    "head.del": del,
    "head.sel": sel
};
