export const Queriers = {
    "trans.selTransedTimes": {
        sql: `SELECT COUNT(transid) WHERE trans_from=?`,
        paramNames: 'trans_from',
        necessaryParams: '*'
    },

    "trans.ins": {
        sql: `INSERT INTO {t_blog_trans} (trans_from,blogno,c_time,u_time) VALUES(?,?,NOW(),NOW())`,
        paramNames: ['trans_from', 'blogno'],
        necessaryParams: '*'
    }
}