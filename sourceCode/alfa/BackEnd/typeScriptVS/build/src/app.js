"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var userRoutes_1 = require("./routes/userRoutes");
var app_data_source_1 = require("./app-data-source");
app_data_source_1.myDataSource
    .initialize()
    .then(function () {
    console.log("Data Source has been initialized!");
})
    .catch(function (err) {
    console.error("Error during Data Source initialization:", err.message);
});
var app = express();
var cors = require("cors");
app.set("myDataSource", app_data_source_1.myDataSource);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/user", userRoutes_1.default);
app.get("/", function (req, res) {
    return res.send("teste");
});
app.listen(8080, function () {
    console.log("Servidor rodando na porta: 8080");
});
