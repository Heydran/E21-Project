import * as cors from "cors"
import * as express from "express"
import { Request, Response } from "express"
import userRoutes from "./routes/userRoutes"
import walletRoutes from "./routes/walletRoutes"
import incomeRoutes from "./routes/incomeRoutes"
import expenseRoutes from "./routes/expenseRoutes"
import Tasks from "./tasks"


import { myDataSource } from "./app-data-source"

myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!!!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err.message)
    })


const app = express()


app.set("myDataSource", myDataSource)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use("/user", userRoutes)
app.use("/wallet", walletRoutes)
app.use("/income", incomeRoutes)
app.use("/expense", expenseRoutes)


const task: any = new Tasks(myDataSource, "texto debug------------------------------------")
app.get("/", (req: Request, res: Response) => {
    return res.send("Olá xd")
})


const port = process.env.PORT
app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`
    )
})

