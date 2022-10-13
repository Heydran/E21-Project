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
var node_schedule_1 = require("node-schedule");
var Income_1 = require("./entity/Income");
var Expense_1 = require("./entity/Expense");
var User_1 = require("./entity/User");
var typeorm_1 = require("typeorm");
exports.default = (function (myDataSource) {
    var monthlyBalanceb = (0, node_schedule_1.scheduleJob)("20 00 00 01 * *", function () {
        return __awaiter(this, void 0, void 0, function () {
            var date, mounth, year, datePeriod, totalIncomes, totalExpenses, users;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = new Date();
                        mounth = date.getMonth() + 1;
                        year = date.getFullYear();
                        datePeriod = (0, typeorm_1.Between)("".concat(year, "[-]").concat(mounth, "[-]01"), "".concat(year, "[-]").concat(mounth, "[-]31"));
                        totalIncomes = 0;
                        totalExpenses = 0;
                        return [4 /*yield*/, myDataSource.getRepository(User_1.User).find()];
                    case 1:
                        users = _a.sent();
                        return [4 /*yield*/, users.forEach(function (user) { return __awaiter(_this, void 0, void 0, function () {
                                var incomes, expenses;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, myDataSource.getRepository(Income_1.Income).find({
                                                where: {
                                                    user: { userCode: user.userCode },
                                                    incDate: datePeriod
                                                }
                                            })];
                                        case 1:
                                            incomes = _a.sent();
                                            return [4 /*yield*/, incomes.forEach(function (income) {
                                                    totalIncomes = totalIncomes + income.incMoney;
                                                })];
                                        case 2:
                                            _a.sent();
                                            return [4 /*yield*/, myDataSource.getRepository(Expense_1.Expense).find({
                                                    where: {
                                                        user: { userCode: user.userCode },
                                                        expDate: datePeriod
                                                    }
                                                })];
                                        case 3:
                                            expenses = _a.sent();
                                            return [4 /*yield*/, expenses.forEach(function (income) {
                                                    totalExpenses = totalExpenses + income.expMoney;
                                                })];
                                        case 4:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
});
