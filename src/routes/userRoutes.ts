import { Router, Request, Response } from "express"
import { User } from "./../entity/User"

const router: Router = new Router()

router.post("/signUp", async function (req: Request, res: Response) {
    console.log(req.body)
    const tuser = await req.app.get("myDataSource").getRepository(User).create(req.body)
    const results = await req.app.get("myDataSource").getRepository(User).save(tuser)
    return res.send(results)
})


router.get("/query", async (req: Request, res: Response) => {
    const users = await req.app.get("myDataSource").getRepository(User).find()
    console.log(users)


    res.json(users)
})
router.get("/query/:id", async (req: Request, res: Response) => {
    const user = await req.app.get("myDataSource").getRepository(User).findOneBy(
        { userCode: req.params.id })


    res.json(user)
})

router.put("/edit/:id", async (req: Request, res: Response) => {
    const user = await req.app.get("myDataSource").getRepository(User).findOneBy(
        { userCode: req.params.id }
    )
    req.app.get("myDataSource").getRepository(User).merge(user, req.body)
    const results = await req.app.get("myDataSource").getRepository(User).save(user)
    return res.send(results)
})

router.delete("/delete/:id", async (req: Request, res: Response) => {
    const results = await req.app.get("myDataSource").getRepository(User).delete(req.params.id)
    return res.send(results)
})

router.post("/login", async (req: Request, res: Response) => {
    const user = await req.app.get("myDataSource").getRepository(User).findOneBy(
        { userEmail: req.body.email }
    )
    if (user.userPasswd === req.body.password) return res.json({ logged: true, user })
    else return res.json({ logged: false, user })

})

export default router