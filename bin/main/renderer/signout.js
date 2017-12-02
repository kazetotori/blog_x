"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function router(req, res) {
    let back = req.query.back || '/square';
    let oldSignInfo = req.session.signInfo || {};
    req.session.signInfo = { username: oldSignInfo.username };
    res.redirect(back);
}
exports.router = router;
