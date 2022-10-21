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
var User_1 = require("../entity/User");
var Wallet_1 = require("../entity/Wallet");
var Expense_1 = require("../entity/Expense");
var Parcel_1 = require("../entity/Parcel");
var typeorm_1 = require("typeorm");
var moment = require("moment");
//import { verify, sign } from "jsonwebtoken"
var router = (0, express_1.Router)();
router.post("/new", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var results, calc, mDays, newExpense, newParcel, date, originalDay, i, result, err_1, e_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 14, , 15]);
                    console.log("start");
                    console.log(req.body.launch);
                    results = null;
                    calc = true;
                    mDays = [28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 31];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 12, , 13]);
                    newExpense = function (calc) { return __awaiter(_this, void 0, void 0, function () {
                        var expanse, results, user, update, wallet, walletUpdate, newWallet, e_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, req.app.get("myDataSource").getRepository(Expense_1.Expense).create(req.body.launch)];
                                case 1:
                                    expanse = _a.sent();
                                    return [4 /*yield*/, req.app.get("myDataSource").getRepository(Expense_1.Expense).save(expanse)];
                                case 2:
                                    results = _a.sent();
                                    if (!(calc && !req.body.launch.expPending)) return [3 /*break*/, 6];
                                    return [4 /*yield*/, req.app.get("myDataSource").getRepository(User_1.User).findOneBy({ userCode: req.body.launch.user })];
                                case 3:
                                    user = _a.sent();
                                    update = {
                                        userMoney: user.userMoney - req.body.launch.expMoney,
                                        userTotalExpenses: user.userTotalExpenses + req.body.launch.expMoney
                                    };
                                    return [4 /*yield*/, req.app.get("myDataSource").getRepository(User_1.User).merge(user, update)];
                                case 4:
                                    _a.sent();
                                    return [4 /*yield*/, req.app.get("myDataSource").getRepository(User_1.User).save(user)];
                                case 5:
                                    _a.sent();
                                    _a.label = 6;
                                case 6:
                                    _a.trys.push([6, 11, , 12]);
                                    console.log(req.body.launch.wallet, "wallettttttttttttttttttttttt");
                                    if (!(req.body.launch.wallet > 0 && req.body.launch.wallet != undefined)) return [3 /*break*/, 10];
                                    return [4 /*yield*/, req.app.get("myDataSource").getRepository(Wallet_1.Wallet).findOneBy({
                                            walletCode: req.body.launch.wallet
                                        })];
                                case 7:
                                    wallet = _a.sent();
                                    walletUpdate = {
                                        walletTotalExpenses: wallet.walletTotalExpenses + req.body.launch.expMoney
                                    };
                                    return [4 /*yield*/, req.app.get("myDataSource").getRepository(Wallet_1.Wallet).merge(wallet, walletUpdate)];
                                case 8:
                                    newWallet = _a.sent();
                                    return [4 /*yield*/, req.app.get("myDataSource").getRepository(Wallet_1.Wallet).save(newWallet)];
                                case 9:
                                    _a.sent();
                                    _a.label = 10;
                                case 10: return [3 /*break*/, 12];
                                case 11:
                                    e_2 = _a.sent();
                                    console.log("error in expenseRoutes, wallet total exp refresh --------------------------------", e_2.message);
                                    return [3 /*break*/, 12];
                                case 12: return [2 /*return*/, results];
                            }
                        });
                    }); };
                    newParcel = function () { return __awaiter(_this, void 0, void 0, function () {
                        var parcel, parcelResult;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, req.app.get("myDataSource").getRepository(Parcel_1.Parcel).create({
                                        parcelDescription: req.body.launch.expDescription,
                                        userCode: req.body.launch.userCode
                                    })];
                                case 1:
                                    parcel = _a.sent();
                                    req.body.launch.expMoney = req.body.launch.expMoney / req.body.launch.expTimes;
                                    return [4 /*yield*/, req.app.get("myDataSource").getRepository(Parcel_1.Parcel).save(parcel)];
                                case 2:
                                    parcelResult = _a.sent();
                                    req.body.launch["parcelCode"] = parcelResult.parcelCode;
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    if (!(req.body.launch.expPaymentMethod == 1)) return [3 /*break*/, 3];
                    console.log("vista");
                    return [4 /*yield*/, newExpense(true)];
                case 2:
                    results = _a.sent();
                    return [3 /*break*/, 11];
                case 3:
                    if (!(req.body.launch.expPaymentMethod == 2)) return [3 /*break*/, 10];
                    return [4 /*yield*/, newParcel()];
                case 4:
                    _a.sent();
                    date = new Date(req.body.launch.expDate);
                    originalDay = date.getDate() + 1;
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < req.body.launch.expTimes)) return [3 /*break*/, 8];
                    return [4 /*yield*/, newExpense(calc)];
                case 6:
                    results = _a.sent();
                    calc = false;
                    if (originalDay > mDays[date.getMonth()]) {
                        date.setDate(mDays[date.getMonth()]);
                        date.setMonth(date.getMonth() + 1);
                    }
                    else {
                        date.setMonth(date.getMonth() + 1);
                        date.setDate(originalDay);
                    }
                    req.body.launch.expDate = moment(date).format("YYYY[-]MM[-]DD");
                    _a.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 5];
                case 8: return [4 /*yield*/, newExpense(calc)];
                case 9:
                    results = _a.sent();
                    return [3 /*break*/, 11];
                case 10:
                    if (req.body.expPaymentMethod == 3) {
                        "continuo, limite de vezes desconhecido";
                    }
                    _a.label = 11;
                case 11:
                    result = {};
                    if (results)
                        result = ({
                            registered: true
                        });
                    else
                        result = ({
                            registered: false
                        });
                    //var token = await sign(result, "segredo")
                    return [2 /*return*/, res.json(result)];
                case 12:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 13];
                case 13: return [3 /*break*/, 15];
                case 14:
                    e_1 = _a.sent();
                    console.log(e_1.mesage);
                    return [3 /*break*/, 15];
                case 15: return [2 /*return*/];
            }
        });
    });
});
router.post("/query", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var filters, registers, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                filters = {
                    user: { userCode: req.body.user.code },
                    expPending: false
                };
                try {
                    filters["wallet"] = { wallet: (0, typeorm_1.Equal)(req.body.filter.wallet.code) };
                }
                catch (e) {
                }
                try {
                    filters["parcel"] = { parcel: req.body.filter.parcel.code };
                }
                catch (_b) { }
                if (req.body.pending == true)
                    filters["expPending"] = true;
                try {
                    if (req.body.filter.date.type == "[]")
                        filters["expDate"] = (0, typeorm_1.Between)(req.body.filter.date.initDate, req.body.filter.date.endDate);
                    else if (req.body.filter.date.type == ">")
                        filters["expDate"] = (0, typeorm_1.MoreThanOrEqual)(req.body.filter.date.initDate);
                    else if (req.body.filter.date.type == "<")
                        filters["expDate"] = (0, typeorm_1.LessThanOrEqual)(req.body.filter.date.endDate);
                }
                catch (_c) { }
                try {
                    if (req.body.filter.money.type == ">")
                        filters["expMoney"] = (0, typeorm_1.MoreThanOrEqual)(req.body.filter.money.minValue);
                    else if (req.body.filter.money.type == "<")
                        filters["expMoney"] = (0, typeorm_1.LessThanOrEqual)(req.body.filter.money.maxValue);
                    else if (req.body.filter.money.type == "[]")
                        filters["expMoney"] = (0, typeorm_1.Between)(req.body.filter.money.minValue, req.body.filter.maxValue);
                }
                catch (_d) { }
                try {
                    if (req.body.filter.category.type == "all")
                        filters["expCategory"] = (0, typeorm_1.Like)("%%");
                    else
                        filters["expCategory"] = (0, typeorm_1.Equal)(req.body.filter.category.value);
                }
                catch (_e) { }
                try {
                    filters["expDescription"] = (0, typeorm_1.Like)("%".concat(req.body.filter.description.value, "%"));
                }
                catch (e) { }
                return [4 /*yield*/, req.app.get("myDataSource").getRepository(Expense_1.Expense).find({ where: filters })];
            case 1:
                registers = _a.sent();
                console.log("filters", filters);
                console.log("registers", registers);
                return [2 /*return*/, res.json({ registers: registers })];
            case 2:
                e_3 = _a.sent();
                console.log("erro in expense:", e_3.message);
                res.json({ err: e_3.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/query/all", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var expanses;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.app.get("myDataSource").getRepository(Expense_1.Expense).find()];
            case 1:
                expanses = _a.sent();
                return [2 /*return*/, res.json(expanses)];
        }
    });
}); });
router.post("/edit", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var expense, newExpense, results, user, userUpdate, newUser, err_2, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 11, , 12]);
                return [4 /*yield*/, req.app.get("myDataSource").getRepository(Expense_1.Expense).findOneBy({ expCode: req.body.launch.code })];
            case 1:
                expense = _a.sent();
                return [4 /*yield*/, req.app.get("myDataSource").getRepository(Expense_1.Expense).merge(expense, req.body.launch.column)];
            case 2:
                newExpense = _a.sent();
                return [4 /*yield*/, req.app.get("myDataSource").getRepository(Expense_1.Expense).save(newExpense)];
            case 3:
                results = _a.sent();
                console.log(results);
                _a.label = 4;
            case 4:
                _a.trys.push([4, 9, , 10]);
                if (!(req.body.launch.column.expPending == false)) return [3 /*break*/, 8];
                return [4 /*yield*/, req.app.get("myDataSource").getRepository(User_1.User).findOneBy({ userCode: req.body.launch.user })];
            case 5:
                user = _a.sent();
                userUpdate = {
                    userMoney: user.userMoney - req.body.launch.expMoney,
                    userTotalExpenses: user.userTotalExpenses + req.body.launch.expMoney
                };
                return [4 /*yield*/, req.app.get("myDataSource").getRepository(User_1.User).merge(user, userUpdate)];
            case 6:
                newUser = _a.sent();
                return [4 /*yield*/, req.app.get("myDataSource").getRepository(User_1.User).save(newUser)];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8: return [3 /*break*/, 10];
            case 9:
                err_2 = _a.sent();
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/, res.json({ result: { successfull: true, results: results } })];
            case 11:
                e_4 = _a.sent();
                console.log(e_4.message);
                return [2 /*return*/, res.json({ results: null, error: e_4.message })];
            case 12: return [2 /*return*/];
        }
    });
}); });
router.post("/delete", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var results, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, req.app.get("myDataSource").getRepository(Expense_1.Expense).delete(req.body.code)];
            case 1:
                results = _a.sent();
                return [2 /*return*/, res.json({ result: { successfull: true, results: results } })];
            case 2:
                e_5 = _a.sent();
                console.log(e_5.message);
                return [2 /*return*/, res.json({ result: { successfull: false, error: e_5.message } })];
            case 3: return [2 /*return*/];
        }
    });
}); });
function updateUserMoney(userCode, money, table) {
    return __awaiter(this, void 0, void 0, function () {
        var user, userUpdate, newUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, table.findOneBy({ userCode: userCode })];
                case 1:
                    user = _a.sent();
                    userUpdate = {
                        userMoney: user.userMoney + money,
                        userTotalExpense: user.userTotalExpense + money
                    };
                    return [4 /*yield*/, table.merge(user, userUpdate)];
                case 2:
                    newUser = _a.sent();
                    return [4 /*yield*/, table.save(newUser)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = router;
