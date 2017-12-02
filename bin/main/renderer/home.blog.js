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
const SignStatus_1 = require("../../user/enum/SignStatus");
const BlogClsServices_1 = require("../../blog/services/BlogClsServices");
function router(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req['signStatus'] !== SignStatus_1.SignStatus.ONLINE) {
            return res.redirect('/signin?back=/home');
        }
        let moduleName = req.query.module || 'published';
        let clsid = req.query.cls || 0;
        let page = req.query.page || 1;
        let userid = req.session.signInfo.userid;
        console.log(clsid);
        let blogClsServ = new BlogClsServices_1.BlogClsServices();
        let userCls = yield blogClsServ.getUserCls(userid);
        let crtCls = clsid === 0 ? userCls[0] : (yield blogClsServ.getSingleCls(parseInt(clsid), userid));
        if (!crtCls) {
            return res.redirect('/404');
        }
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
        });
    });
}
exports.router = router;
