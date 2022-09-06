import { Router, Request, Response  } from "express"
import { User } from "./../entity/User"

const router: Router = new Router()

router.post("/signUp", async function (req: Request, res: Response) {
    console.log(req.body)
    const tuser = await req.app.get("myDataSource").getRepository(User).create(req.body)
    const results = await req.app.get("myDataSource").getRepository(User).save(tuser)
    return res.send(results)
})


router.get("/query", async (req: Request, res: Response) => {
    const tusers = await req.app.get("myDataSource").getRepository(User).find()
    console.log(tusers)
    
    
    res.json(tusers)
} )

router.put("/edit/:id", async (req:Request, res: Response) => {
    const user  = await req.app.get("myDataSource").getRepository(User).findOneBy({userCode:req.params.id})
    req.app.get("myDataSource").getRepository(User).merge(user, req.body)
    const results = await req.app.get("myDataSource").getRepository(User).save(user)
    return res.send(results)
})

router.delete("/users/:id", async function (req: Request, res: Response) {
    const results = await req.app.get("myDataSource").getRepository(User).delete(req.params.id)
    return res.send(results)
})

export default router