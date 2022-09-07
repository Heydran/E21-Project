"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./entity/User");
var Income_1 = require("./entity/Income");
var Expenses_1 = require("./entity/Expenses");
var myDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "ec2-44-207-253-50.compute-1.amazonaws.com",
    port: 5432,
    username: "wuyrutizvjdnqe",
    password: "2f982159cab6aaeb310f2c4e684ef261fdfa60039b3a83ce0c9a16fb6616f4e5",
    database: "d91dhaif9e9kd5",
    entities: [User_1.User, Income_1.Income, Expenses_1.Expenses],
    logging: false,
    synchronize: true,
    migrations: [],
    subscribers: [],
    ssl: { rejectUnauthorized: false }
});
exports.myDataSource = myDataSource;
