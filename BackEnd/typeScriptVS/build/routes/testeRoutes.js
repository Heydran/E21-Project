"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var router = new express_1.Router();
exports.router = router;
router.get("/", function (req, res) {
    return res.send("routes teste");
});
