"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var router = new express_1.Router();
exports.router = router;
router.post("/singUp", function (req, res) {
    var obj = {
        user_name: req.body.name,
        user_email: req.body.email,
        user_pass: req.body.pass
    };
    return res.json(obj);
});
