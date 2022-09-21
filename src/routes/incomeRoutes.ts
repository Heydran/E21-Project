import { Router, Request, Response } from "express"
import { Income } from "./../entity/Income"
import { verify, sign } from "jsonwebtoken"


const router: Router = new Router()

router.post("/new", async function (req: Request, res: Response) {
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

router.post("/query", async (req:Request, res:Response)=>{
    const decoded = await verify(req.body.token, 'segredo')
    const incomes = await req.app.get("myDataSource").getRepository(Income).findBy({
        userCode:decoded.UserCode
    })
    return res.json(incomes)
})

router.put("/edit/:id", async (req: Request, res: Response) => {
    const income = await req.app.get("myDataSource").getRepository(Income).findOneBy(
        { userCode: req.params.id }
    )
    req.app.get("myDataSource").getRepository(Income).merge(income, req.body)
    const results = await req.app.get("myDataSource").getRepository(Income).save(Income)
    return res.json(results)
})

router.delete("/delete/:id", async (req: Request, res: Response) => {
    const results = await req.app.get("myDataSource").getRepository(Income).delete(req.params.id)
    return res.json(results)
})

export default router