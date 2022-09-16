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
exports.WalletUsers = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Wallet_1 = require("./Wallet");
var WalletUsers = /** @class */ (function () {
    function WalletUsers() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], WalletUsers.prototype, "wuCode", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_1.User; }, function (user) { return user.userCode; }),
        __metadata("design:type", Number)
    ], WalletUsers.prototype, "userCode", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Wallet_1.Wallet; }, function (wallet) { return wallet.walletCode; }),
        __metadata("design:type", Number)
    ], WalletUsers.prototype, "walletCode", void 0);
    WalletUsers = __decorate([
        (0, typeorm_1.Entity)()
    ], WalletUsers);
    return WalletUsers;
}());
exports.WalletUsers = WalletUsers;
