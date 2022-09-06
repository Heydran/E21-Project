"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./entity/User");
var Income_1 = require("./entity/Income");
var Expenses_1 = require("./entity/Expenses");
var myDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "dbControleSe",
    entities: [User_1.User, Income_1.Income, Expenses_1.Expenses],
    logging: false,
    synchronize: true
});
exports.myDataSource = myDataSource;
