import { QueryRunner } from "../../utils/QueryRunner";
import { SQLUtils } from "../../utils/SQLUtils";
const POOL = SQLUtils.Pool;

export class BlogClsServices {

    /**
     * 获取用户分类列表
     * @param userid 用户编号
     */
    public async getUserCls(userno: number) {
        let runner: QueryRunner = null;
        try {
            runner = await QueryRunner.GetInstance(POOL);
            return await runner.Query('blog_cls.selUserCls', { userno: userno }, {})
        }
        catch (e) {
            console.error(e)
            throw e;
        }
        finally {
            if (runner) await runner.Release();
        }
    }


    public async getSingleCls(clsid: number, userno: number) {
        let runner: QueryRunner = null;
        try {
            runner = await QueryRunner.GetInstance(POOL);
            let rows = await runner.Query('blog_cls.selCls', { clsid: clsid }, {});
            if (rows.length === 0 || rows[0].userno !== userno) {
                return undefined;
            }
            return rows[0];
        }
        catch (e) {
            console.error(e)
            throw e;
        }
        finally {
            if (runner) await runner.Release();
        }
    }
}