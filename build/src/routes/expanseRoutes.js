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
var Expense_1 = require("./../entity/Expense");
var Parcel_1 = require("./../entity/Parcel");
var typeorm_1 = require("typeorm");
var moment = require("moment");
//import { verify, sign } from "jsonwebtoken"
var router = new express_1.Router();
router.post("/new", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var results, mDays, newExpense, newParcel, date, originalDay, i, result, err_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("start");
                    console.log(req.body.launch);
                    results = null;
                    mDays = [28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 31];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 11, , 12]);
                    newExpense = function () { return __awaiter(_this, void 0, void 0, function () {
                        var expanse, results;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, req.app.get("myDataSource").getRepository(Expense_1.Expense).create(req.body.launch)];
                                case 1:
                                    expanse = _a.sent();
                                    return [4 /*yield*/, req.app.get("myDataSource").getRepository(Expense_1.Expense).save(expanse)];
                                case 2:
                                    results = _a.sent();
                                    return [2 /*return*/, results];
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
                                    return [4 /*yield*/, req.app.get("myDataSource").getRepository(Parcel_1.Parcel).save(parcel)];
                                case 2:
                                    parcelResult = _a.sent();
                                    req.body.launch["parcelCode"] = parcelResult.parcelCode;
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    if (!(req.body.launch.expPaymentMethod == 1)) return [3 /*break*/, 2];
                    console.log("vista");
                    results = newExpense();
                    return [3 /*break*/, 10];
                case 2:
                    if (!(req.body.launch.expPaymentMethod == 2)) return [3 /*break*/, 9];
                    return [4 /*yield*/, newParcel()];
                case 3:
                    _a.sent();
                    date = new Date(req.body.launch.expDate);
                    originalDay = date.getDate() + 1;
                    i = 0;
                    _a.label = 4;
                case 4:
                    if (!(i < req.body.launch.expTimes)) return [3 /*break*/, 7];
                    return [4 /*yield*/, newExpense()];
                case 5:
                    results = _a.sent();
                    if (originalDay > mDays[date.getMonth()]) {
                        date.setDate(mDays[date.getMonth()]);
                        date.setMonth(date.getMonth() + 1);
                    }
                    else {
                        date.setMonth(date.getMonth() + 1);
                        date.setDate(originalDay);
                    }
                    req.body.launch.expDate = moment(date).format("YYYY[-]MM[-]DD");
                    _a.label = 6;
                case 6:
                    i++;
                    return [3 /*break*/, 4];
                case 7: return [4 /*yield*/, newExpense()];
                case 8:
                    results = _a.sent();
                    return [3 /*break*/, 10];
                case 9:
                    if (req.body.expPaymentMethod == 3) {
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
                case 12: return [2 /*return*/];
            }
        });
    });
});
router.post("/query", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var registers, filters, where;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                filters = {};
                where = {};
                if (req.body.filterType == "=") {
                    filters[req.body.column] = req.body.filter;
                }
                else if (req.body.filterType == ">=") {
                    filters[req.body.column] = (0, typeorm_1.MoreThanOrEqual)(req.body.filter);
                }
                else if (req.body.filterType == "<=") {
                    filters[req.body.column] = (0, typeorm_1.LessThanOrEqual)(req.body.filter);
                }
                else if (req.body.filterType == "==") {
                    filters[req.body.column] = (0, typeorm_1.Equal)(req.body.filter);
                }
                else if (req.body.filterType == "[]") {
                    filters[req.body.column] = (0, typeorm_1.Between)(req.body.filter[0], req.body.filter[1]);
                }
                else if (req.body.filterType == "+") {
                    filters["expDate"] = (0, typeorm_1.Between)(req.body.filter[0][0], req.body.filter[0][1]);
                    if (req.body.filter[1][0] == ">=")
                        filters["expMoney"] = (0, typeorm_1.MoreThanOrEqual)(req.body.filter[1][1]);
                    else if (req.body.filter[1][0] == "<=")
                        filters["expMoney"] = (0, typeorm_1.LessThanOrEqual)(req.body.filter[1][1]);
                    else if (req.body.filter[1][0] == "[]")
                        filters["expMoney"] = (0, typeorm_1.Between)(req.body.filter[1][1], req.body.filter[1][2]);
                    filters["expCategory"] = (0, typeorm_1.Equal)(req.body.filter[2]);
                    filters["expDescription"] = (0, typeorm_1.Like)("%".concat(req.body.filter[3], "%"));
                }
                console.log(filters);
                return [4 /*yield*/, req.app.get("myDataSource").getRepository(Expense_1.Expense).findBy(filters)];
            case 1:
                registers = _a.sent();
                return [2 /*return*/, res.json({ registers: registers })];
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
router.put("/edit/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var expanse, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.app.get("myDataSource").getRepository(Expense_1.Expense).findOneBy({ userCode: req.params.id })];
            case 1:
                expanse = _a.sent();
                req.app.get("myDataSource").getRepository(Expense_1.Expense).merge(expanse, req.body);
                return [4 /*yield*/, req.app.get("myDataSource").getRepository(Expense_1.Expense).save(Expense_1.Expense)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); });
router.delete("/delete/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.app.get("myDataSource").getRepository(Expense_1.Expense).delete(req.params.id)];
            case 1:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); });
exports.default = router;
