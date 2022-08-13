"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./entity/User");
var myDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "dbControleSe",
    entities: [User_1.tUser],
    logging: false,
    synchronize: true,
});
exports.myDataSource = myDataSource;
