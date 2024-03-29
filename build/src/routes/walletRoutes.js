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
var Wallet_1 = require("../entity/Wallet");
var WalletUsers_1 = require("../entity/WalletUsers");
var ShareRequest_1 = require("../entity/ShareRequest");
var typeorm_1 = require("typeorm");
var router = (0, express_1.Router)();
router.post("/new", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var wallet, results, walletOwner, woResults, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, req.app.get("myDataSource").getRepository(Wallet_1.Wallet).create(req.body.wallet)];
                case 1:
                    wallet = _a.sent();
                    return [4 /*yield*/, req.app.get("myDataSource").getRepository(Wallet_1.Wallet).save(wallet)];
                case 2:
                    results = _a.sent();
                    return [4 /*yield*/, req.app.get("myDataSource").getRepository(WalletUsers_1.WalletUsers).create({
                            user: req.body.userCode,
                            wallet: results.walletCode,
                            favorite: req.body.wallet.favorite
                        })];
                case 3:
                    walletOwner = _a.sent();
                    return [4 /*yield*/, req.app.get("myDataSource").getRepository(WalletUsers_1.WalletUsers).save(walletOwner)];
                case 4:
                    woResults = _a.sent();
                    if (woResults)
                        return [2 /*return*/, res.json({ result: { successfull: true } })];
                    else
                        return [2 /*return*/, res.json({ result: { successfull: false }, woResults: woResults })];
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _a.sent();
                    return [2 /*return*/, res.json({ result: { successfull: false, error: err_1.message } })];
                case 6: return [2 /*return*/];
            }
        });
    });
});
router.post("/get", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var wallets, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, req.app.get("myDataSource").getRepository(WalletUsers_1.WalletUsers).find({
                        relations: {
                            wallet: true,
                            user: true
                        },
                        where: {
                            user: { userCode: req.body.userCode }
                        }
                    })];
            case 1:
                wallets = _a.sent();
                return [4 /*yield*/, wallets.forEach(function (wallet) {
                        wallet.user.userPasswd = "can't explaned";
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.json({ registers: wallets })];
            case 3:
                e_1 = _a.sent();
                console.log(e_1.message);
                return [2 /*return*/, res.json({ err: e_1.message })];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/join", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var wallet, coWallet, walletOwner, woResults, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    console.log(req.body.wallet, "bodyyyyyyyyyyyyyyyyyyyyyyyyyy");
                    return [4 /*yield*/, req.app.get("myDataSource").getRepository(Wallet_1.Wallet).findOneBy({
                            walletCode: req.body.wallet.walletCode
                        })];
                case 1:
                    wallet = _a.sent();
                    return [4 /*yield*/, req.app.get("myDataSource").getRepository(WalletUsers_1.WalletUsers).find({
                            relations: {
                                wallet: true
                            },
                            where: {
                                user: (0, typeorm_1.Equal)(req.body.wallet.userCode)
                            }
                        })];
                case 2:
                    coWallet = _a.sent();
                    coWallet.forEach(function (wallet) {
                        if (wallet.wallet.walletCode == req.body.wallet.walletCode) {
                            throw "wallet already acess";
                        }
                    });
                    return [4 /*yield*/, req.app.get("myDataSource").getRepository(WalletUsers_1.WalletUsers).create({
                            user: req.body.wallet.userCode,
                            wallet: wallet.walletCode,
                            favorite: req.body.wallet.favorite
                        })];
                case 3:
                    walletOwner = _a.sent();
                    return [4 /*yield*/, req.app.get("myDataSource").getRepository(WalletUsers_1.WalletUsers).save(walletOwner)];
                case 4:
                    woResults = _a.sent();
                    return [2 /*return*/, res.json({ result: { successfull: true, error: "Wallet Adicionada" } })];
                case 5:
                    err_2 = _a.sent();
                    console.log(err_2, "eroooooooooooooooo");
                    return [2 /*return*/, res.json({ result: { successfull: false, error: "Wallet inexistente ou ja acessada" } })];
                case 6: return [2 /*return*/];
            }
        });
    });
});
router.post("/shareCreate", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var shareCode, wallet, sharingConn, sharing;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                shareCode = null;
                wallet = null;
                _a.label = 1;
            case 1:
                shareCode = Math.random() * (999999 - 111111) + 111111;
                return [4 /*yield*/, req.app.get("myDataSource").getRepository(Wallet_1.Wallet).findOneBy({ shareCode: shareCode })];
            case 2:
                wallet = _a.sent();
                _a.label = 3;
            case 3:
                if (wallet.shareCode) return [3 /*break*/, 1];
                _a.label = 4;
            case 4: return [4 /*yield*/, req.app.get("myDataSource").getRepository(ShareRequest_1.ShareRequest).create({
                    shareCode: shareCode,
                    walletCode: req.body.walletCode
                })];
            case 5:
                sharingConn = _a.sent();
                return [4 /*yield*/, req.app.get("myDataSource").getRepository(ShareRequest_1.ShareRequest).save(sharingConn)];
            case 6:
                sharing = _a.sent();
                res.json({ result: { successfull: true, sharing: sharing } });
                return [2 /*return*/];
        }
    });
}); });
router.post("/share", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var share, walletOwner, woResult, delShare;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.app.get("myDataSource").getRepository(ShareRequest_1.ShareRequest).findOneBy({ shareCode: req.body.shareCode })];
            case 1:
                share = _a.sent();
                return [4 /*yield*/, req.app.get("myDataSource").getRepository(WalletUsers_1.WalletUsers).create({
                        userCode: req.body.userCode,
                        walletCode: share.walletCode
                    })];
            case 2:
                walletOwner = _a.sent();
                return [4 /*yield*/, req.app.get("myDataSource").getRepository(WalletUsers_1.WalletUsers).save(walletOwner)];
            case 3:
                woResult = _a.sent();
                return [4 /*yield*/, req.app.get("myDataSource").getRepository(ShareRequest_1.ShareRequest).delete(req.body.shareCode)];
            case 4:
                delShare = _a.sent();
                return [2 /*return*/, res.json({ result: { successfull: true } })];
        }
    });
}); });
router.post("/exit", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var results, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, req.app.get("myDataSource").getRepository(WalletUsers_1.WalletUsers).delete(req.body.wuCode)];
            case 1:
                results = _a.sent();
                return [2 /*return*/, res.json({ result: { successfull: true, results: results } })];
            case 2:
                e_2 = _a.sent();
                console.log(e_2.message);
                return [2 /*return*/, res.json({ result: { successfull: false, error: e_2.message } })];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/favorite", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var wallet, updateWallet, newWallet, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, req.app.get("myDataSource").getRepository(WalletUsers_1.WalletUsers).findOneBy({
                        wuCode: req.body.wallet.wuCode
                    })];
            case 1:
                wallet = _a.sent();
                updateWallet = {
                    favorite: !req.body.wallet.favorite
                };
                return [4 /*yield*/, req.app.get("myDataSource").getRepository(WalletUsers_1.WalletUsers).merge(wallet, updateWallet)];
            case 2:
                newWallet = _a.sent();
                console.log(newWallet);
                return [4 /*yield*/, req.app.get("myDataSource").getRepository(WalletUsers_1.WalletUsers).save(newWallet)];
            case 3:
                _a.sent();
                return [2 /*return*/, res.json({ result: { successfull: true, results: newWallet } })];
            case 4:
                e_3 = _a.sent();
                console.log(e_3.message);
                return [2 /*return*/, res.json({ result: { successfull: false, error: e_3.message } })];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
