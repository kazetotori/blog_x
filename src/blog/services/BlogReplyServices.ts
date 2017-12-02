import { SQLUtils } from "../../utils/SQLUtils";
import { QueryRunner } from "../../utils/QueryRunner";
const POOL = SQLUtils.Pool;


export class BlogReplyServices {

    public constructor() { }


    public async getReplyList(blogno: number, signedUserid: any): Promise<any[]> {

        let runner: QueryRunner = null;
        let queryBean = { blogno: blogno, signedUserid: parseInt(signedUserid) };
        try {
            runner = await QueryRunner.GetInstance(POOL);
            let toBlogReplys = await runner.Query('blog_reply.selToBlogReplys', queryBean, {});

            for (let i = 0; i < toBlogReplys.length; i++) {
                let reply = toBlogReplys[i];
                queryBean['reply_to'] = reply.replyid;
                reply.replys = await runner.Query('blog_reply.selToReplyReplys', queryBean, {});
            }

            return toBlogReplys;
        }
        catch (e) {
            console.error(e);
            throw e;
        }
        finally {
            if (runner) await runner.Release();
        }


    }
}
