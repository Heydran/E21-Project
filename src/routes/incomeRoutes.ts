import { Router, Request, Response } from "express"
import { Income } from "./../entity/Income"
import { verify, sign } from "jsonwebtoken"


const router: Router = new Router()

router.post("/signUp", async function (req: Request, res: Response) {
    const decoded = await verify(req.body.token, 'segredo')
    const income = await req.app.get("myDataSource").getRepository(Income).create(decoded)
    const results = await req.app.get("myDataSource").getRepository(Income).save(income)
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