import { Router, Request, Response  } from "express"
import { tUser } from "./../entity/User"
import { myDataSource } from "./../app-data-source"

myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err.message)
    })

const router: Router = new Router()

router.post("/singUp", async function (req: Request, res: Response) {
    const user = await myDataSource.getRepository(tUser).create(req.body)
    const results = await myDataSource.getRepository(tUser).save(user)
    return res.send(results)
})


router.get("/querry", async function(req: Request, res: Response){
    const users = await myDataSource.getRepository(tUser).find()
    res.json(users)
} )

export {router}