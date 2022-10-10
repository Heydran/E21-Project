"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var User_1 = require("./../entity/User");
var jsonwebtoken_1 = require("jsonwebtoken");
var bcrypt_1 = require("bcrypt");
var nodemailer_1 = require("nodemailer");
var router = (0, express_1.Router)();
router.post("/signUp", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, encoded, e_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, req.app.get("myDataSource").getRepository(User_1.User).findOneBy({ userCode: req.body.newUser.userCode })];
                case 1:
                    user = _a.sent();
                    try {
                        if (user.userEmail == req.body.newUser.userEmail) {
                            return [2 /*return*/, res.json({
                                    registered: false,
                                    userCode: null,
                                    error: "Email já cadastrado"
                                })];
                        }
                    }
                    catch (_b) { }
                    encoded = (0, bcrypt_1.hash)(req.body.newUser.userPasswd, 10, function (err, hash) { return __awaiter(_this, void 0, void 0, function () {
                        var tuser, results, user, result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    tuser = req.app.get("myDataSource").getRepository(User_1.User).create({
                                        userName: req.body.newUser.userName,
                                        userPhone: req.body.newUser.userPhone,
                                        userEmail: req.body.newUser.userEmail,
                                        userMoney: 0,
                                        userPasswd: hash
                                    });
                                    return [4 /*yield*/, req.app.get("myDataSource").getRepository(User_1.User).save(tuser)];
                                case 1:
                                    results = _a.sent();
                                    return [4 /*yield*/, req.app.get("myDataSource").getRepository(User_1.User).findOneBy({ userEmail: req.body.newUser.userEmail })];
                                case 2:
                                    user = _a.sent();
                                    result = {};
                                    if (user)
                                        result = ({
                                            registered: true,
                                            userCode: user.userCode
                                        });
                                    else
                                        result = ({
                                            registered: false,
                                            userCode: null
                                        });
                                    return [2 /*return*/, res.json(result)];
                            }
                        });
                    }); });
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    console.log(e_1.message);
                    return [2 /*return*/, res.json({
                            result: {
                                registered: false,
                                userCode: null,
                                error: e_1
                            }
                        })];
                case 3: return [2 /*return*/];
            }
        });
    });
});
router.get("/query", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.app.get("myDataSource").getRepository(User_1.User).find()];
            case 1:
                users = _a.sent();
                console.log(users);
                res.json(users);
                return [2 /*return*/];
        }
    });
}); });
router.post("/query", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.app.get("myDataSource").getRepository(User_1.User).findOneBy({ userCode: req.body.userCode })];
            case 1:
                user = _a.sent();
                res.json(user);
                return [2 /*return*/];
        }
    });
}); });
router.put("/edit/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.app.get("myDataSource").getRepository(User_1.User).findOneBy({ userCode: req.params.id })];
            case 1:
                user = _a.sent();
                req.app.get("myDataSource").getRepository(User_1.User).merge(user, req.body);
                return [4 /*yield*/, req.app.get("myDataSource").getRepository(User_1.User).save(user)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); });
// router.delete("/delete/:id", async (req: Request, res: Response) => {
//     const results = await req.app.get("myDataSource").getRepository(User).delete(req.params.id)
//     return res.json(results)
// })
router.post("/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, token, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.body.user);
                return [4 /*yield*/, req.app.get("myDataSource").getRepository(User_1.User).findOneBy({ userEmail: req.body.user.email })];
            case 1:
                user = _a.sent();
                token = null;
                result = {};
                if (user) {
                    (0, bcrypt_1.compare)(req.body.user.password, user.userPasswd, function (err, val) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (val)
                                        result = {
                                            logged: true,
                                            user: {
                                                userName: user.userName,
                                                userPhone: user.userPhone,
                                                userCode: user.userCode,
                                                userMoney: user.userMoney
                                            }
                                        };
                                    else
                                        result = { logged: false, user: null, error: "credenciais invalidas" };
                                    return [4 /*yield*/, (0, jsonwebtoken_1.sign)(result, "segredo", { expiresIn: 604800 })];
                                case 1:
                                    token = _a.sent();
                                    return [2 /*return*/, res.json({ token: token })];
                            }
                        });
                    }); });
                }
                else {
                    return [2 /*return*/, res.json({ token: { logged: false, user: null, error: "credenciais invalidas" } })];
                }
                return [2 /*return*/];
        }
    });
}); });
router.post("/setMoney", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.app.get("myDataSource").getRepository(User_1.User).findOneBy({ userCode: req.body.id })];
            case 1:
                user = _a.sent();
                req.app.get("myDataSource").getRepository(User_1.User).merge(user, { userMoney: req.body.userMoney });
                return [4 /*yield*/, req.app.get("myDataSource").getRepository(User_1.User).save(user)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); });
router.post("/recoverPasswd", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var results, user, transporter, mailOptions, result, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                results = {};
                return [4 /*yield*/, req.app.get("myDataSource").getRepository(User_1.User).findOneBy({ userEmail: req.body.user.userEmail })];
            case 1:
                user = _b.sent();
                console.log(user);
                if (!user) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, nodemailer_1.createTransport)({
                        host: "smtp.umbler.com",
                        port: 587,
                        auth: {
                            user: process.env.EMAIL_URL,
                            pass: process.env.EMAIL_PASSWORD
                        }
                    })];
            case 2:
                transporter = _b.sent();
                mailOptions = {
                    from: process.env.EMAIL_URL,
                    to: user.userEmail,
                    subject: "Recover password for BeezNees Account",
                    text: "Hellow ".concat(user.Name, ", input this code ").concat("placeholder", " in our app to change your password")
                };
                return [4 /*yield*/, transporter.sendMail(mailOptions).then(function (info) {
                        console.log(info);
                        res.json({
                            result: {
                                successful: true,
                                message: "Sucessfull send email ".concat(info)
                            }
                        });
                    }).catch(function (err) {
                        return res.json({
                            result: {
                                successful: false,
                                error: err.message
                            }
                        });
                    })];
            case 3:
                result = _b.sent();
                return [3 /*break*/, 5];
            case 4:
                results = { result: { successful: false, error: "Email not registered" } };
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                _a = _b.sent();
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
