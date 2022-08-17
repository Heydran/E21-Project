import { Router, Request, Response  } from "express"
import { tUser } from "./../entity/User"

const router: Router = new Router()

router.post("/singUp", async function (req: Request, res: Response) {
    const tuser = await req.app.get("myDataSource").getRepository(tUser).create(req.body)
    const results = await req.app.get("myDataSource").getRepository(tUser).save(tuser)
    return res.send(results)
})


router.get("/querry", async function(req: Request, res: Response){
    const tusers = await req.app.get("myDataSource").getRepository(tUser).find()
    
    res.json(tusers)
} )

export default router