import { Request, Response } from "express";
import { SignStatus } from "../../user/enum/SignStatus";
import { CryptoUtils } from "../../utils/CryptoUtils";

export async function router(req: Request, res: Response) {
    let backUrl = req.query.back || '/square';
    if (req['signStatus'] === SignStatus.ONLINE) {
        return res.redirect(backUrl);
    }

    let signInfo: any = Object.assign({ username: '', password: null }, req.session.signInfo);
    if (signInfo.password && req.body.remenberMe) {
        signInfo.remenberMe = true;
        signInfo.fakePassword = CryptoUtils.NewGuid().slice(0, 8);
        req.session.signInfo.fakePassword = signInfo.fakePassword;
    } else {
        delete req.session.signInfo.password;
    }
    delete signInfo.password;
    delete signInfo.lastOnline;

    res.render('./signin/signin', {
        signInfo: signInfo
    });
}