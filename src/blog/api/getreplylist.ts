import { Request, Response } from "express";
import { BlogReplyServices } from "../services/BlogReplyServices";
import { SignStatus } from "../../user/enum/SignStatus";
import { HttpUtils } from "../../utils/HttpUtils";


export async function router(req: Request, res: Response) {

    let signInfo = req['signStatus'] === SignStatus.ONLINE ? req.session.signInfo : { userid: 0 };
    let blogno = parseInt(req.query.blogno);

    try {
        let replyList = await (new BlogReplyServices().getReplyList(blogno, signInfo.userid));
        console.log(replyList);
        HttpUtils.Success(res, {
            replyList: replyList
        })
    }
    catch (e) {
        console.error(e);
        HttpUtils.Throw(res, e);
    }
}