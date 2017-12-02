"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queriers = {
    "blog_like.ins": {
        sql: "INSERT INTO {t_blog_like} (blogno,userno,c_time,u_time) VALUES(?,?,NOW(),NOW())",
        paramNames: ['blogno', 'userno'],
        necessaryParams: '*'
    },
    "blog_like.del": {
        sql: "DELETE FROM {t_blog_like} WHERE blogno=? AND userno=?",
        paramNames: ['blogno', 'userno'],
        necessaryParams: '*'
    },
    "blog_like.selOne": {
        sql: "SELECT DISTINCT likeid FROM {t_blog_like} WHERE blogno=? AND userno=?",
        paramNames: ['blogno', 'userno'],
        necessaryParams: '*'
    },
    "blog_like.selBlogLikedCount": {
        sql: "SELECT COUNT(likeid) AS likeCount FROM {t_blog_like} WHERE blogno=?",
        paramNames: ['blogno'],
        necessaryParams: '*'
    },
    "blog_like.selLikeUsers": {
        sql: `SELECT 
                u.userid AS userno,
                u.username AS username,
                u.nickname AS nickname,
                h.headurl AS headurl,
                DATE_FORMAT(l.c_time, '%Y-%m-%d %H:%i:%s' ) AS c_time
            FROM
                {t_blog_like} l JOIN {t_user} u JOIN {t_head} h
            ON u.userid=l.userno AND u.headno=h.headid
            WHERE l.blogno=?`,
        paramNames: ['blogno'],
        necessaryParams: '*'
    }
};
