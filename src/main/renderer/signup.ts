import { Request, Response } from "express";




export async function router(req: Request, res: Response) {
    res.render('./signup/signup');
}