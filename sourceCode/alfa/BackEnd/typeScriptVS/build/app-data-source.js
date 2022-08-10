"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var myDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "postgres",
    password: "123456",
    database: "postgres",
    entities: ["src/entity/*.js"],
    logging: true,
    synchronize: true,
});
