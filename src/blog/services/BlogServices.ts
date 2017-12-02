import { QueryRunner } from "../../utils/QueryRunner";
import { SQLUtils } from "../../utils/SQLUtils";
const POOL = SQLUtils.Pool;

export class BlogServices {

    /**
     * 这个名字取的不好
     */
    public async getHomeBlogList(userno: number, saveStatus: number, page: number = 1, pageSize: number = 10) {
        let runner: QueryRunner = null;
        try {
            runner = await QueryRunner.GetInstance(POOL);
            await runner.Query('blog.selBlogListBySaveStatus', {
                userno: userno,
                save_status: saveStatus,
                page: page - 1,
                pageSize: pageSize
            }, {});
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