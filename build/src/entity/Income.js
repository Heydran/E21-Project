"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Income = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Parcel_1 = require("./Parcel");
var Wallet_1 = require("./Wallet");
var Income = /** @class */ (function () {
    function Income() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Income.prototype, "incCode", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "real" }),
        __metadata("design:type", Number)
    ], Income.prototype, "incMoney", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Income.prototype, "incCategory", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Income.prototype, "incPaymentMethod", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], Income.prototype, "incTotalPayment", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Income.prototype, "incTimes", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], Income.prototype, "incPending", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "date" }),
        __metadata("design:type", String)
    ], Income.prototype, "incDate", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Income.prototype, "incDescription", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_1.User; }, function (user) { return user.userCode; }),
        __metadata("design:type", User_1.User)
    ], Income.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Parcel_1.Parcel; }, function (parcel) { return parcel.parcelCode; }),
        __metadata("design:type", Parcel_1.Parcel)
    ], Income.prototype, "parcel", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Wallet_1.Wallet; }, function (wallet) { return wallet.walletCode; }),
        __metadata("design:type", Wallet_1.Wallet)
    ], Income.prototype, "wallet", void 0);
    Income = __decorate([
        (0, typeorm_1.Entity)()
    ], Income);
    return Income;
}());
exports.Income = Income;
