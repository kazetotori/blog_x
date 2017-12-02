export const Queriers = {

    "blog.selPreviews": {
        sql: `SELECT 
            blogid, 
            title, 
            preview, 
            (SELECT COUNT(shareid) FROM {t_blog_share} s WHERE s.blogno=b.blogid) AS share_times,
            (SELECT COUNT(shareid) FROM {t_blog_share} ss WHERE ss.blogno=b.blogid AND ss.userno=?) AS shared,
            (SELECT COUNT(replyid) FROM {t_blog_reply} r WHERE r.blogno=b.blogid) AS reply_times,
            (SELECT COUNT(transid) FROM {t_blog_trans} t WHERE t.trans_from=b.blogid) AS trans_times,
            (SELECT COUNT(likeid) FROM {t_blog_like} l WHERE l.blogno=b.blogid) AS like_times, 
            (SELECT COUNT(likeid) FROM {t_blog_like} ll WHERE ll.blogno=b.blogid AND ll.userno=?) AS liked,
            read_times, 
            DATE_FORMAT(u_time, '%Y-%m-%d %H:%i:%s' ) AS u_time
        FROM {t_blog} b
        WHERE userno=?
        ORDER BY blogid DESC
        LIMIT ?,?`,
        paramNames: ['signedUserid', 'signedUserid', 'userno', 'limitStart', 'pageCount'],
        defaultValues: {
            'signedUserid': 0,
            'pageCount': 10
        },
        necessaryParams: '*'
    },

    "blog.ins": {
        sql: `INSERT INTO {t_blog} (clsno,userno,title,content,preview,save_status,per_lv,c_time,u_time)
             VALUES(?,?,?,?,?,?,?,NOW(),NOW())`,
        paramNames: ['clsno', 'userno', 'title', 'content', 'preview', 'save_status', 'per_lv'],
        necessaryParams: '*',
        defaultValues: {
            title: '',
            content: '',
            preview: '',
            save_status: 0,
            per_lv: 0
        }
    },

    "blog.selAllFields": {
        sql: `SELECT * FROM {t_blog} WHERE blogid=?`,
        paramNames: ['blogid'],
        necessaryParams: '*'
    },


    "blog.selCount": {
        sql: `SELECT COUNT(blogid) AS blogCount
               FROM {t_blog} WHERE 
               userno=?; `,
        paramNames: ['userno'],
        necessaryParams: '*'
    },

    "blog.selReadTimesTopList": {
        sql: `SELECT blogid,title FROM {t_blog} WHERE userno=? ORDER BY read_times DESC LIMIT 0,?`,
        paramNames: ['userno', 'topCount'],
        necessaryParams: '*'
    },

    "blog.selReplyTimesTopList": {
        sql: `SELECT blogid,title,COUNT(r.blogno) AS reply_times
            FROM t_blog b
            LEFT JOIN t_blog_reply r 
            ON blogid=r.blogno
            WHERE b.userno = ?
            GROUP BY b.blogid
            ORDER BY reply_times
            DESC
            LIMIT 0,?`,
        paramNames: ['userno', 'topCount'],
        necessaryParams: '*'
    },


    "blog.selBlog": {
        sql: `
            SELECT 
                blogid, 
                title, 
                b.userno AS userno,
                content, 
                cls.clsname AS clsname,
                cls.clsid AS clsno,
                (SELECT COUNT(shareid) FROM {t_blog_share} s WHERE s.blogno=b.blogid) AS share_times,
                (SELECT COUNT(shareid) FROM {t_blog_share} ss WHERE ss.blogno=b.blogid AND ss.userno=?) AS shared,
                (SELECT COUNT(replyid) FROM {t_blog_reply} r WHERE r.blogno=b.blogid) AS reply_times,
                (SELECT COUNT(transid) FROM {t_blog_trans} t WHERE t.trans_from=b.blogid) AS trans_times,
                (SELECT COUNT(likeid) FROM {t_blog_like} l WHERE l.blogno=b.blogid) AS like_times, 
                (SELECT COUNT(likeid) FROM {t_blog_like} ll WHERE ll.blogno=b.blogid AND ll.userno=?) AS liked,
                read_times, 
                DATE_FORMAT(b.u_time, '%Y-%m-%d %H:%i:%s' ) AS u_time,
                DATE_FORMAT(b.c_time, '%Y-%m-%d %H:%i:%s' ) AS c_time
            FROM {t_blog} b,
                 {t_blog_cls} cls
            WHERE blogid=? AND
                  b.clsno=cls.clsid`,
        paramNames: ['signedUserid', 'signedUserid', 'blogid'],
        necessaryParams: '*'
    },

    "blog.selNext": {
        sql: "SELECT blogid,title FROM {t_blog} WHERE blogid > ? AND userno = ? ORDER BY blogid ASC LIMIT 0,1",
        paramNames: ['blogid', 'userno'],
        necessaryParams: '*'
    },

    "blog.selPre": {
        sql: "SELECT blogid,title FROM {t_blog} WHERE blogid < ? AND userno = ? ORDER BY blogid DESC LIMIT 0,1",
        paramNames: ['blogid', 'userno'],
        necessaryParams: '*'
    },

    "blog.selBlogListBySaveStatus": {
        sql: `SELECT blogid,title,c_time,u_time FROM {t_blog} WHERE userno=? AND save_status=? LIMIT ?,?`,
        paramNames: ['userno', 'save_status', 'limitStart', 'pageSize'],
        necessaryParams: '*',
        defaultValues: { limitStart: 0, pageSize: 10 }
    }
}



