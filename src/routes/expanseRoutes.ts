import { Router, Request, Response } from "express"
import { Expenses } from "./../entity/Expenses"
import { verify, sign } from "jsonwebtoken"


const router: Router = new Router()

router.post("/new", async function (req: Request, res: Response) {
    const decoded = await verify(req.body.token, 'segredo')
    const expanse = await req.app.get("myDataSource").getRepository(Expenses).create(decoded)
    const results = await req.app.get("myDataSource").getRepository(Expenses).save(expanse)
    var result = {}
    if (results)
        result = ({
            registered: true
        })
    else
        result = ({
            registered: false
        })
    //var token = await sign(result, "segredo")
    return res.json(result)

})

export default router