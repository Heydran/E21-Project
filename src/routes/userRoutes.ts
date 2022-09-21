import { Router, Request, Response } from "express"
import { User } from "./../entity/User"
import { verify, sign } from "jsonwebtoken"
import bcrypt from "bcrypt"


const router: Router = new Router()

router.post("/signUp", async function (req: Request, res: Response) {
    var decoded = await verify(req.body.token, 'segredo')
    decoded.passwd = bcrypt.hashSync(decoded.passwd, 10)
    const tuser = await req.app.get("myDataSource").getRepository(User).create(decoded)
    const results = await req.app.get("myDataSource").getRepository(User).save(tuser)
    const user = await req.app.get("myDataSource").getRepository(User).findOneBy({ userEmail: decoded.userEmail })
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
    //var token = await sign(result, "segredo")
    return res.json(result)

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
    const decoded = await verify(req.body.token, 'segredo')
    const user = await req.app.get("myDataSource").getRepository(User).findOneBy(
        { userEmail: decoded.email }
    )
    var result = {}
    if (user && bcrypt.compare( user.passwd,10))
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