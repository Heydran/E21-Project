import * as express from "express"
import { Request, Response } from "express"
import userRoutes  from "./routes/userRoutes"
import { myDataSource } from "./app-data-source"

myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err.message)
    })

    
const app = express()

import * as cors from "cors"
app.set("myDataSource",myDataSource)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use("/user", userRoutes)


app.get("/",(req: Request, res: Response)=> {
    return res.send("teste")
})



app.listen(8080, () => {
    console.log(`Servidor rodando na porta: 8080`)
})


