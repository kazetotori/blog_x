export const Queriers = {

    "blog_reply.selToBlogReplys": {
        sql: `
        SELECT 
            r.replyid AS replyid,
            r.content AS content,
            DATE_FORMAT(r.c_time, '%Y-%m-%d %H:%i:%s' ) AS c_time,
            u.userid AS userid,
            u.username AS username,
            u.nickname AS nickname,
            h.headurl AS headurl,
            IFNULL((
                    SELECT \`comment\` 
                    FROM t_blog_reply_comment rc 
                    WHERE 
                            rc.replyno=r.replyid AND
                            rc.userno=?
            ),-1) AS \`comment\`
        FROM
                t_user u JOIN
                t_blog_reply r JOIN
                t_head h
        ON
                r.userno=u.userid AND
                u.headno=h.headid
        WHERE
                blogno=? AND reply_to IS NULL
        `,
        paramNames: ['signedUserid', 'blogno'],
        necessaryParams: '*'
    },


    "blog_reply.selToReplyReplys": {
        sql: `
        SELECT 
            r.replyid AS replyid,
            r.content AS content,
            DATE_FORMAT(r.c_time, '%Y-%m-%d %H:%i:%s' ) AS c_time,
            u.userid AS userid,
            u.username AS username,
            u.nickname AS nickname,
            h.headurl AS headurl,
            IFNULL((
                SELECT \`comment\` 
                FROM t_blog_reply_comment rc 
                WHERE 
                    rc.replyno=r.replyid AND
                    rc.userno=?
            ),-1) AS \`comment\`
        FROM
            t_user u JOIN
            t_blog_reply r JOIN
            t_head h
        ON
            r.userno=u.userid AND
            u.headno=h.headid 
        WHERE
        reply_to=? AND blogno=?`,
        paramNames: ['signedUserid', 'reply_to', 'blogno'],
        necessaryParams: '*'
    }


}