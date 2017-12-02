export const Queriers = {
    "blog_share.ins": {
        sql: "INSERT INTO {t_blog_share} (blogno,userno,c_time,u_time) VALUES(?,?,NOW(),NOW())",
        paramNames: ['blogno', 'userno'],
        necessaryParams: '*'
    },

    "blog_share.del": {
        sql: "DELETE FROM {t_blog_share} WHERE blogno=? AND userno=?",
        paramNames: ['blogno', 'userno'],
        necessaryParams: '*'
    },

    "blog_share.selOne": {
        sql: "SELECT DISTINCT shareid FROM {t_blog_share} WHERE blogno=? AND userno=?",
        paramNames: ['blogno', 'userno'],
        necessaryParams: '*'
    },

    "blog_share.selBlogSharedTimes": {
        sql: "SELECT COUNT(shareid) AS shared_times FROM {t_blog_share} WHERE blogno=?",
        paramNames: ['blogno'],
        necessaryParams: '*'
    }
}