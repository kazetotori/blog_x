"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queriers = {
    "user.ins": {
        sql: `INSERT INTO {t_user}(
                username,
                password,
                phone,
                email,
                nickname,
                sex,
                birthday,
                starno,
                headno,
                c_time,
                u_time
            ) VALUES (?,?,?,?,?,?,?,?,?,NOW(),NOW())`,
        paramNames: ['username', 'password', 'phone', 'email', 'nickname', 'sex', 'birthday', 'starno', 'headno'],
        necessaryParams: ['username', 'nickname', 'password', 'phone', 'email'],
        defaultValues: {
            sex: '-',
            headno: 1,
            birthday: '1990-01-01',
            starno: 10
        },
        filters: {
            username: 'username',
            phone: 'phone',
            email: 'email'
        }
    },
    "user.selUserInfo": {
        sql: `SELECT DISTINCT 
                username,
                nickname,
                DATE_FORMAT(birthday,'%Y-%m-%d') AS birthday,
                (YEAR(NOW()) - YEAR(birthday)) AS age,
                sex,
                phone,
                email,
                headno,
                h.headurl , 
                s.starno ,
                s.star_name as starname
             FROM {t_user} u
             JOIN {t_star} s
             JOIN {t_head} h
             ON s.starno=u.starno AND h.headid=u.headno
             WHERE userid=?`,
        paramNames: ['userid'],
        necessaryParams: '*'
    },
    "user.selSignInfo": {
        sql: 'SELECT userid,username,password FROM {t_user} WHERE username=?',
        paramNames: ['username'],
        necessaryParams: '*'
    },
    "user.up": {
        sql: "UPDATE {t_user} SET {toUpFields} WHERE userid=?",
        paramNames: ['userid'],
        necessaryParams: '*',
        upFields: ['nickname', 'password', 'birthday', 'sex', 'phone', 'email', 'headno', 'starno'],
        filters: {
            password: 'password',
            birthday: 'birthday',
            sex: 'sex',
            phone: 'phone',
            email: 'email'
        }
    },
    "user.selSimpleInfo": {
        sql: `SELECT userid,nickname,username,h.headurl AS headurl
                FROM {t_user} u JOIN {t_head} h
            WHERE userid=? `,
        paramNames: ['userid'],
        necessaryParams: '*'
    },
    "user.selEmailExists": {
        sql: `SELECT email FROM {t_user} WHERE email = ?`,
        paramNames: ['email'],
        necessaryParams: '*'
    }
};
