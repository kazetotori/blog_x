"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queriers = {
    "ship.selFanCount": {
        sql: `SELECT COUNT(shipid) AS fanCount FROM {t_ship} WHERE ship_lv=1 AND user_a=?`,
        paramNames: ['user_a'],
        necessaryParams: '*'
    },
    "ship.selFocusCount": {
        sql: `SELECT COUNT(shipid) AS focusCount FROM {t_ship} WHERE ship_lv=1 AND user_b=?`,
        paramNames: ['user_b'],
        necessaryParams: '*'
    },
    "ship.selFocused": {
        sql: `SELECT COUNT(shipid) AS focused FROM {t_ship} WHERE user_a=? AND user_b=? AND ship_lv=1`,
        paramNames: ['user_a', 'user_b'],
        necessaryParams: '*'
    },
    "ship.selIsFriend": {
        sql: `SELECT COUNT(shipid) AS is_friend FROM {t_ship} WHERE user_a=? AND user_b=? AND ship_lv=2`,
        paramNames: ['user_a', 'user_b'],
        necessaryParams: '*'
    },
    "ship.del": {
        sql: `DELETE FROM {t_ship} WHERE user_a=? AND user_b=? AND ship_lv=?`,
        paramNames: ['user_a', 'user_b', 'ship_lv'],
        necessaryParams: '*'
    },
    "ship.ins": {
        sql: `INSERT INTO {t_ship} (ship_lv,user_a,user_b,c_time,u_time) VALUES(?,?,?,NOW(),NOW())`,
        paramNames: ['ship_lv', 'user_a', 'user_b'],
        necessaryParams: '*'
    }
};
