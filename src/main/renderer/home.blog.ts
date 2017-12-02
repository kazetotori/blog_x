import { Request, Response } from "express";
import { SignStatus } from "../../user/enum/SignStatus";
import { BlogClsServices } from "../../blog/services/BlogClsServices";

export async function router(req: Request, res: Response) {

    try {

        if (req['signStatus'] !== SignStatus.ONLINE) {
            return res.redirect('/signin?back=/home');
        }

        let moduleName = req.query.module || 'published';
        let clsid = req.query.cls || 0;
        let page = req.query.page || 1;
        let userid = req.session.signInfo.userid;
        console.log(clsid);

        let blogClsServ = new BlogClsServices();
        let userCls = await blogClsServ.getUserCls(userid);
        let crtCls = clsid === 0 ? userCls[0] : (await blogClsServ.getSingleCls(parseInt(clsid), userid));

        if (!crtCls) {
            return res.redirect('/404');
        }


        let saveStatus = moduleName === 'published' ? 1 : 0;





        res.render('./home.blog/home', {
            signInfo: {
                username: req.session.signInfo.username
            },
            navInfo: {
                mainNavName: 'blog',
                moduleName: moduleName
            },
            clsInfo: {
                clsList: userCls,
                crtCls: crtCls
            }
        })
    }

    catch (e) {
        console.error(e);
        return res.redirect('/500');
    }
}