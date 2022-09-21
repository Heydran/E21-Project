import { Router, Request, Response } from "express"
import { User } from "./../entity/User"
import { verify, sign } from "jsonwebtoken"
import { hash, compare } from "bcrypt"


const router: Router = new Router()

router.post("/signUp", async function (req: Request, res: Response) {
    return await hash(req.body.newUser.passwd, 10, async (err, hash) => {
        const tuser = await req.app.get("myDataSource").getRepository(User).create({

            userName: req.body.newUser.userName,
            userPhone: req.body.newUser.userPhone,
            userEmail: req.body.newUser.userEmail,
            userPasswd: hash


        })
        const results = await req.app.get("myDataSource").getRepository(User).save(tuser)
        const user = await req.app.get("myDataSource").getRepository(User).findOneBy({ userEmail: req.body.newUser.userEmail })
        var result = {}
        if (user)
            result = ({
                registered: true,
                userCode: user.userCode
            })
        else
            result = ({
                registered: false,
                userCode: null
            })
        return res.json(result)
    })

    //var token = await sign(result, "segredo")


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
    return res.json(results)
})

router.delete("/delete/:id", async (req: Request, res: Response) => {
    const results = await req.app.get("myDataSource").getRepository(User).delete(req.params.id)
    return res.json(results)
})

router.post("/login", async (req: Request, res: Response) => {
    console.log(req.body.user)

    const user = await req.app.get("myDataSource").getRepository(User).findOneBy(
        { userEmail: req.body.user.email }
    )
    var result = {}

    if (user && await compare(req.body.user.password, user.userPasswd))//bcrypt.compare( user.passwd,10)
        result = {
            logged: true,
            user: {
                userName: user.userName,
                userPhone: user.userPhone,
                userCode: user.userCode
            }
        }
    else
        result = { logged: false, user: null }
    //var token = await sign(result, "segredo")

    ///console.log("data",new Date().getDate())

    return res.json(result)
})

export default router