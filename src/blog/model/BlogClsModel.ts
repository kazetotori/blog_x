export const Queriers = {

    "blog_cls.selUserCls": {
        sql: `SELECT clsid,clsname FROM {t_blog_cls} WHERE userno=?`,
        paramNames: ['userno'],
        necessaryParams: '*'
    },

    "blog_cls.selCls": {
        sql: `SELECT clsid,clsname,userno FROM {t_blog_cls} WHERE clsid=?`,
        paramNames: ['clsid'],
        necessaryParams: '*'
    }
}