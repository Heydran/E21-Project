import * as express from "express"
import { Request, Response } from "express"
import {router as testeRoutes}  from "./routes/testeRoutes"
import {router as userRoutes}  from "./routes/userRoutes"
import { myDataSource } from "./app-data-source.ts"

const app = express()

import * as cors from "cors"

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use("/teste", testeRoutes)
app.use("/user", userRoutes)


app.get("/",(req: Request, res: Response)=> {
    return res.send("teste")
})


app.listen(8080, () => {
    console.log(`Servidor rodando na porta: 8080`)
})


