const { Route } = require("express");
const express = require("express");
const bcrypt = require('bcrypt')
const { Client } = require('pg')
const router = express.Router()


const conn = {
    user: "postgres",
    host: "localhost",
    database: "dbControleSe",
    password: "hey123",
    port: 5432
}


router.get("/", (req, res) => {
    const client = new Client(conn)
    client.connect((err) => {
        if (err) throw err.message
        console.log("DataBase Conected");
    })
    let sql = "SELECT * FROM Usuario"
    client.query(sql, (err, qRes) => {
        if (err) throw err.message
        client.end()
        return res.send(qRes.rows)
    })
})
router.post("/cadastrarUsuario", (req, res) => {
    bcrypt.hash(req.body.senha, 10, (err, hash) => {
        if (err) throw err.message
        const client = new Client(conn)
        client.connect((err) => {
            if (err) throw err.message
            console.log("DataBase Conected");
        })
        let sql = "INSERT INTO Usuario(nome_usuario, email_usuario, senha_usuario) VALUES ($1, $2, $3);"
        let dados = [req.body.nome, req.body.email, hash]
        client.query(sql, dados, (err, qRes) => {
            if (err) {
                if (err.routine = "_bt_check_unique") {
                    client.end()
                    return res.send("Esse email já existe")
                }
            }
            client.end()
            return res.send(req.body)
        })
    })
})
router.get("/consultarUsuario/:id", (req, res) => {
    const client = new Client(conn)
    client.connect((err) => {
        if (err) throw err.message
        console.log("DataBase Conected");
    })
    let sql = "SELECT * FROM Usuario WHERE Usuario.cod_usuario = $1"
    client.query(sql, [req.params.id], (err, qres) => {
        if (err) {
            throw err.message
        } else {
            client.end()
            return res.send(qres.rows)
        }
    })
})


router.post("/validarLogin", (req, res) => {
    const client = new Client(conn)
    client.connect((err) => {
        if (err) throw err.message
        console.log("DataBase Conected");
    })
    let sql = "SELECT senha_usuario FROM USUARIO WHERE email_usuario = $1"
    client.query(sql, [req.body.email], (err, qres) => {
        if (err) throw err.message
        if (qres.rowCount > 0) {
            console.log();
                if (bcrypt.compareSync(req.body.senha, qres.rows[0].senha_usuario)) {
                    client.end()
                    return res.send(true)
                } else {
                    client.end()
                    return res.send(false)
                }
        } else {
            return res.send("error")
        }
    })
})

module.exports = router