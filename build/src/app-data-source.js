"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./entity/User");
var Income_1 = require("./entity/Income");
var Expense_1 = require("./entity/Expense");
var Wallet_1 = require("./entity/Wallet");
var WalletUsers_1 = require("./entity/WalletUsers");
var Parcel_1 = require("./entity/Parcel");
// const myDataSource = new DataSource({
//     type: "postgres",
//     host: "ec2-44-207-253-50.compute-1.amazonaws.com",
//     port: 5432,
//     username: "wuyrutizvjdnqe",
//     password: "2f982159cab6aaeb310f2c4e684ef261fdfa60039b3a83ce0c9a16fb6616f4e5",
//     database: "d91dhaif9e9kd5",
//     entities: [ User, Income, Expense, Wallet, WalletUsers, Parcel],
//     logging: false,
//     synchronize: true,
//     migrations: [],
//     subscribers: [],
//     ssl: { rejectUnauthorized: false }
// })
var myDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "postgres",
    entities: [User_1.User, Income_1.Income, Expense_1.Expense, Wallet_1.Wallet, WalletUsers_1.WalletUsers, Parcel_1.Parcel],
    logging: false,
    synchronize: true
});
exports.myDataSource = myDataSource;
