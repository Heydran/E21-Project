const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const cors = require('cors')
const { Pool, Client } = require('pg')
const conn = {
    user: "postgres",
    host: "localhost",
    database: "dbControleSe",
    password: "1234",
    port: 5432
}

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())




app.get("/", (req, res) => {
    let client = new Client(conn)
    client.connect((err) => {
        if (err) {
            throw err.message
        }
    })
    let sql = "SELECT * FROM Usuario"
    client.query(sql, (err, qRes) => {
        if (err) {
            throw err.message
        } else {
            client.end()
            return res.send(qRes.rows)
        }
    })
})
app.post("/cadastrarUsuario", (req, res) => {
    bcrypt.hash(req.body.senha, 10, (err, hash) => {
        if (err) {
            throw err.message
        } else {

            let client = new Client(conn)
            client.connect((err) => {
                if (err) {
                    throw err.message
                }
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
        }
    })
})
app.get("/consultarUsuario/:id", (req, res) => {
    let client = new Client(conn)
    client.connect((err) => {
        if (err) {
            throw err.message
        }
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


app.post("/validarLogin", (req, res) => {

    let client = new Client(conn)
    client.connect((err) => {
        if (err) {
            throw err.message
        }
    })
    let sql = "SELECT senha_usuario FROM USUARIO WHERE email_usuario = $1"
    client.query(sql, [req.body.email], (err, qres) => {
        if (err) {
            throw err.message
        } else {
            if (qres.rowCount > 0) {
                bcrypt.compare(req.body.senha, qres.rows.senha_usuario, (bErr, bRes) => {
                    if (bRes) {
                        client.end()
                        return res.send(true)
                    } else {
                        client.end()
                        return res.send(bRes)
                    }
                })
            }else{
                return res.send("error")
            }
        }
    })

})
















app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta: ${process.env.PORT}`)
})

