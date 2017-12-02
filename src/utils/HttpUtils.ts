import { Request, Response } from "express";
import { filter as SessionMW } from "../filter/session";

export class HttpUtils {

    // 私有化构造
    private constructor() { }


    /**
     * 以成功的形式将数据返回给客户端
     * @param res 响应对象
     * @param data 返回给客户端的数据
     */
    public static Success(res: Response, data: any) {
        let ret = {
            errno: 0,
            data: data
        }
        res.json(ret);
    }



    /**
     * 向前端返回400状态码，并返回错误码
     * @param res 响应对象
     * @param err 错误对象
     */
    public static Throw(res: Response, errno: number) {
        res.status(400);
        res.json({ errno: errno })
    }




    /**
     * 清除该当前用户的session
     * @param req 请求对象
     */
    public static async ClearSession(req: Request, res: Response) {

        // 由于typescript的限制，只能够使用req['session']获取session对象
        let session = req.session;


        // 调用sessionMW中间件
        return new Promise((resovle, reject) => {
            session.destroy(() => SessionMW(req as any, res as any, resovle));
        })
    }





}