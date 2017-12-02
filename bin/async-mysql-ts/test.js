"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const SQLPool_1 = require("./implements/SQLPool");
let pool = new SQLPool_1.SQLPool({
    host: 'localhost',
    user: 'kazetotori',
    password: 'Zq12398045',
    database: 'j32sys'
});
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        let conn = yield pool.GetConnection();
        //let rst = await conn.ExecInsertID('INSERT INTO star VALUES(NULL,"你d啊",123,234,0,now(),now())', null);
        yield conn.Release();
        console.log('aaa');
    });
}());
