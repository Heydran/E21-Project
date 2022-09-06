const express = require('express')
const app = express()

const cors = require('cors')
const rotasUsuario = require('./rotasUsuario')


app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/usuario",rotasUsuario)

app.get("/",(req, res)=> {
    res.redirect("https://google.com")
})

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta: ${process.env.PORT}`)
})

