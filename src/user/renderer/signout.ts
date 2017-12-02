import { Request, Response } from "express";

export function router(req: Request, res: Response) {

    let back = req.query.back || '/square';
    let oldSignInfo = req.session.signInfo || {};
    req.session.signInfo = { username: oldSignInfo.username };
    res.redirect(back);
    
}