import * as express from "express";
import { ServerConfig } from "./config/server";
import { FilterConfig } from "./config/filter";
import { RouteConfig } from "./config/router";
main(process.argv);



/**
 * 程序的入口函数
 * @param args 参数
 */
async function main(args: string[]) {


    // 创建Express App
    let app = express();


    // 配置模板引擎
    app.set('view engine', ServerConfig.ViewEngine);
    app.set('views', ServerConfig.Views);

    // 加载过滤器
    for (let i = 0; i < FilterConfig.length; i++) {
        let filter = FilterConfig[i];
        let middleware = (await import(filter.script)).filter;

        filter.urls.forEach(urlSettings => {
            app[urlSettings.method](urlSettings.url, middleware);
        })
    }



    // 加载路由
    for (let i = 0; i < RouteConfig.length; i++) {
        let routerSettings = RouteConfig[i];
        let router = (await import(routerSettings.script)).router;
        app[routerSettings.method](routerSettings.url, router);
    }




    // 开启服务
    app.listen(ServerConfig.Port, () => {
        console.log(ServerConfig.MsgOnListenStart);
        ServerConfig.OnListenStart.forEach(listener => listener());
    });
}



