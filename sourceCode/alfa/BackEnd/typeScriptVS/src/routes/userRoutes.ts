import { Router, Request, Response  } from "express"
const router: Router = new Router()

router.post("/singUp",(req: Request, res:Response) => {
    var obj = {
        user_name: req.body.name,
        user_email: req.body.email,
        user_pass: req.body.pass
    }
    return res.json(obj)
})


export {router}