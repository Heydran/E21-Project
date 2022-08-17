import { Router, Request, Response  } from "express"
import { User } from "./../entity/User"

const router: Router = new Router()

router.post("/singUp", async function (req: Request, res: Response) {
    const user = await req.app.get("myDataSource").getRepository(User).create(req.body)
    const results = await req.app.get("myDataSource").getRepository(User).save(user)
    return res.send(results)
})


router.get("/querry", async function(req: Request, res: Response){
    const users = await req.app.get("myDataSource").getRepository(User).find()
    
    res.json(users)
} )

export default router