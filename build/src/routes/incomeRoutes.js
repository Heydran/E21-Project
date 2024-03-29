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
var Wallet_1 = require("./../entity/Wallet");
var Income_1 = require("./../entity/Income");
var Parcel_1 = require("./../entity/Parcel");
var typeorm_1 = require("typeorm");
var moment = require("moment");
//import { verify, sign } from "jsonwebtoken"
var router = (0, express_1.Router)();
router.post("/new", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var results, calc, mDays, newIncome, newParcel, date, originalDay, i, result, err_1, e_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 13, , 14]);
                    console.log("start");
                    console.log(req.body.launch);
                    results = null;
                    calc = true;
                    mDays = [28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 31];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 11, , 12]);
                    newIncome = function (calc) { return __awaiter(_this, void 0, void 0, function () {
                        var income, results, user, userUpdate, newUser, wallet, walletUpdate, newWallet, e_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, req.app.get("myDataSource").getRepository(Income_1.Income).create(req.body.launch)];
                                case 1:
                                    income = _a.sent();
                                    return [4 /*yield*/, req.app.get("myDataSource").getRepository(Income_1.Income).save(income)];
                                case 2:
                                    results = _a.sent();
                                    if (!(calc && !req.body.launch.incPending)) return [3 /*break*/, 6];
                                    return [4 /*yield*/, req.app.get("myDataSource").getRepository(User_1.User).findOneBy({ userCode: req.body.launch.user })];
                                case 3:
                                    user = _a.sent();
                                    userUpdate = {
                                        userMoney: user.userMoney + req.body.launch.incMoney,
                                        userTotalIncomes: user.userTotalIncomes + req.body.launch.incMoney
                                    };
                                    return [4 /*yield*/, req.app.get("myDataSource").getRepository(User_1.User).merge(user, userUpdate)];
                                case 4:
                                    newUser = _a.sent();
                                    return [4 /*yield*/, req.app.get("myDataSource").getRepository(User_1.User).save(newUser)];
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
                                        walletTotalIncomes: wallet.walletTotalIncomes + req.body.launch.incMoney
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
                                    console.log("error in incomeRoutes, wallet total inc refresh --------------------------------", e_2.message);
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
                                        parcelDescription: req.body.launch.incDescription,
                                        user: req.body.launch.user
                                    })];
                                case 1:
                                    parcel = _a.sent();
                                    req.body.launch.incMoney = req.body.launch.incMoney / req.body.launch.incTimes;
                                    return [4 /*yield*/, req.app.get("myDataSource").getRepository(Parcel_1.Parcel).save(parcel)];
                                case 2:
                                    parcelResult = _a.sent();
                                    req.body.launch["parcelCode"] = parcelResult.parcelCode;
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    if (!(req.body.launch.incPaymentMethod == 1)) return [3 /*break*/, 2];
                    console.log("vista");
                    results = newIncome(calc);
                    return [3 /*break*/, 10];
                case 2:
                    if (!(req.body.launch.incPaymentMethod == 2)) return [3 /*break*/, 9];
                    return [4 /*yield*/, newParcel()];
                case 3:
                    _a.sent();
                    date = new Date(req.body.launch.incDate);
                    originalDay = date.getDate() + 1;
                    i = 0;
                    _a.label = 4;
                case 4:
                    if (!(i < req.body.launch.incTimes)) return [3 /*break*/, 7];
                    return [4 /*yield*/, newIncome(calc)];
                case 5:
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
                    req.body.launch.incDate = moment(date).format("YYYY[-]MM[-]DD");
                    _a.label = 6;
                case 6:
                    i++;
                    return [3 /*break*/, 4];
                case 7: return [4 /*yield*/, newIncome(calc)];
                case 8:
                    results = _a.sent();
                    return [3 /*break*/, 10];
                case 9:
                    if (req.body.launch.incPaymentMethod == 3) {
                        "continuo, limite de vezes desconhecido";
                    }
                    _a.label = 10;
                case 10:
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
                case 11:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 12];
                case 12: return [3 /*break*/, 14];
                case 13:
                    e_1 = _a.sent();
                    console.log(e_1.mesage);
                    return [3 /*break*/, 14];
                case 14: return [2 /*return*/];
            }
        });
    });
});
router.post("/query", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var filters, registers, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.body);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                filters = {
                    incPending: false
                };
                try {
                    filters["user"] = { userCode: req.body.user.code };
                }
                catch (_b) { }
                try {
                    filters["wallet"] = (0, typeorm_1.Equal)(req.body.filter.wallet.code);
                    console.log(req.body.filter.wallet.code, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                }
                catch (e) {
                }
                try {
                    filters["parcel"] = { parcel: req.body.filter.parcel.code };
                }
                catch (_c) { }
                if (req.body.pending == true)
                    filters["incPending"] = true;
                try {
                    if (req.body.filter.date.type == "[]")
                        filters["incDate"] = (0, typeorm_1.Between)(req.body.filter.date.initDate, req.body.filter.date.endDate);
                    else if (req.body.filter.date.type == ">")
                        filters["incDate"] = (0, typeorm_1.MoreThanOrEqual)(req.body.filter.date.initDate);
                    else if (req.body.filter.date.type == "<")
                        filters["incDate"] = (0, typeorm_1.LessThanOrEqual)(req.body.filter.date.endDate);
                }
                catch (_d) { }
                try {
                    if (req.body.filter.money.type == ">")
                        filters["incMoney"] = (0, typeorm_1.MoreThanOrEqual)(req.body.filter.money.minValue);
                    else if (req.body.filter.money.type == "<")
                        filters["incMoney"] = (0, typeorm_1.LessThanOrEqual)(req.body.filter.money.maxValue);
                    else if (req.body.filter.money.type == "[]")
                        filters["incMoney"] = (0, typeorm_1.Between)(req.body.filter.money.minValue, req.body.filter.maxValue);
                }
                catch (_e) { }
                try {
                    if (req.body.filter.category.type == "all")
                        filters["incCategory"] = (0, typeorm_1.Like)("%%");
                    else
                        filters["incCategory"] = (0, typeorm_1.Equal)(req.body.filter.category.value);
                }
                catch (_f) { }
                try {
                    filters["incDescription"] = (0, typeorm_1.Like)("%".concat(req.body.filter.description.value, "%"));
                }
                catch (e) { }
                return [4 /*yield*/, req.app.get("myDataSource").getRepository(Income_1.Income).find({ where: filters })];
            case 2:
                registers = _a.sent();
                console.log("filters", filters);
                console.log("registers", registers);
                return [2 /*return*/, res.json({ registers: registers })];
            case 3:
                e_3 = _a.sent();
                console.log("erro in income:", e_3.message);
                res.json({ err: e_3.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/query/wallet", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var registers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.app.get("myDataSource").getRepository(Income_1.Income).find({
                    where: {
                        wallet: (0, typeorm_1.Equal)(req.body.filter.wallet.code),
                        incPending: false
                    }
                })];
            case 1:
                registers = _a.sent();
                return [2 /*return*/, res.json({ registers: registers })];
        }
    });
}); });
router.post("/query/all", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var incomes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.app.get("myDataSource").getRepository(Income_1.Income).find()];
            case 1:
                incomes = _a.sent();
                return [2 /*return*/, res.json(incomes)];
        }
    });
}); });
router.post("/edit", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var income, newIncome, results, user, userUpdate, newUser, err_2, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 11, , 12]);
                return [4 /*yield*/, req.app.get("myDataSource").getRepository(Income_1.Income).findOneBy({ incCode: req.body.launch.code })];
            case 1:
                income = _a.sent();
                return [4 /*yield*/, req.app.get("myDataSource").getRepository(Income_1.Income).merge(income, req.body.launch.column)];
            case 2:
                newIncome = _a.sent();
                return [4 /*yield*/, req.app.get("myDataSource").getRepository(Income_1.Income).save(newIncome)];
            case 3:
                results = _a.sent();
                console.log(results);
                _a.label = 4;
            case 4:
                _a.trys.push([4, 9, , 10]);
                if (!(req.body.launch.column.incPending == false)) return [3 /*break*/, 8];
                return [4 /*yield*/, req.app.get("myDataSource").getRepository(User_1.User).findOneBy({ userCode: req.body.launch.user })];
            case 5:
                user = _a.sent();
                userUpdate = {
                    userMoney: user.userMoney + req.body.launch.incMoney,
                    userTotalIncomes: user.userTotalIncomes + req.body.launch.incMoney
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
                return [2 /*return*/, res.json({ result: { successfull: false, error: e_4.message } })];
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
                return [4 /*yield*/, req.app.get("myDataSource").getRepository(Income_1.Income).delete(req.body.code)];
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
exports.default = router;
