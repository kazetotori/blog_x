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
const express = require("express");
const server_1 = require("./config/server");
const filter_1 = require("./config/filter");
const router_1 = require("./config/router");
main(process.argv);
/**
 * 程序的入口函数
 * @param args 参数
 */
function main(args) {
    return __awaiter(this, void 0, void 0, function* () {
        // 创建Express App
        let app = express();
        // 配置模板引擎
        app.set('view engine', server_1.ServerConfig.ViewEngine);
        app.set('views', server_1.ServerConfig.Views);
        // 加载过滤器
        for (let i = 0; i < filter_1.FilterConfig.length; i++) {
            let filter = filter_1.FilterConfig[i];
            let middleware = (yield Promise.resolve().then(function () { return require(filter.script); })).filter;
            filter.urls.forEach(urlSettings => {
                app[urlSettings.method](urlSettings.url, middleware);
            });
        }
        // 加载路由
        for (let i = 0; i < router_1.RouteConfig.length; i++) {
            let routerSettings = router_1.RouteConfig[i];
            let router = (yield Promise.resolve().then(function () { return require(routerSettings.script); })).router;
            app[routerSettings.method](routerSettings.url, router);
        }
        // 开启服务
        app.listen(server_1.ServerConfig.Port, () => {
            console.log(server_1.ServerConfig.MsgOnListenStart);
            server_1.ServerConfig.OnListenStart.forEach(listener => listener());
        });
    });
}
