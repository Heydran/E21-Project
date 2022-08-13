"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var testeRoutes_1 = require("./routes/testeRoutes");
var userRoutes_1 = require("./routes/userRoutes");
var app = express();
var cors = require("cors");
'';
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/teste", testeRoutes_1.router);
app.use("/user", userRoutes_1.router);
app.get("/", function (req, res) {
    return res.send("teste");
});
app.listen(8080, function () {
    console.log("Servidor rodando na porta: 8080");
});
