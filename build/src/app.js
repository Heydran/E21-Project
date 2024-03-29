"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cors = require("cors");
var express = require("express");
var userRoutes_1 = require("./routes/userRoutes");
var walletRoutes_1 = require("./routes/walletRoutes");
var incomeRoutes_1 = require("./routes/incomeRoutes");
var expenseRoutes_1 = require("./routes/expenseRoutes");
var app_data_source_1 = require("./app-data-source");
app_data_source_1.myDataSource
    .initialize()
    .then(function () {
    console.log("Data Source has been initialized!!!");
})
    .catch(function (err) {
    console.error("Error during Data Source initialization:", err.message);
});
var app = express();
app.set("myDataSource", app_data_source_1.myDataSource);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/user", userRoutes_1.default);
app.use("/wallet", walletRoutes_1.default);
app.use("/income", incomeRoutes_1.default);
app.use("/expense", expenseRoutes_1.default);
//const task: any = new Tasks(myDataSource)
app.get("/", function (req, res) {
    return res.send("Olá xd");
});
var port = process.env.PORT;
app.listen(port, function () {
    console.log("Servidor rodando na porta: ".concat(port));
});
