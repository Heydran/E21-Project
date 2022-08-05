
module.exports = function (app) {

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
}