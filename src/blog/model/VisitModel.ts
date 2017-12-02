export const Queriers = {

    "visit.selVisitedTimes": {
        sql: `SELECT visitid AS visitedTimes FROM {t_visit} WHERE bloger=? GROUP BY sessionid,visitor,vdate`,
        paramNames: ['bloger'],
        necessaryParams: '*'
    }
}