"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queriers = {
    "visit.selVisitedTimes": {
        sql: `SELECT visitid AS visitedTimes FROM {t_visit} WHERE bloger=? GROUP BY sessionid,visitor,vdate`,
        paramNames: ['bloger'],
        necessaryParams: '*'
    }
};
