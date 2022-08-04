const express = require('express')
const app = express()
const cors = require('cors')
const { Pool, Client } = require('pg')
const conn = process.env.DATABASE_OBJ

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.post("/cadastrarUsuario",(req, res)=>{
    return res.send(req.body.nome)
})




















app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta: ${process.env.PORT}`)
})

