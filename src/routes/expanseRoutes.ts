import { Router, Request, Response } from "express"
import { Expenses } from "./../entity/Expenses"


const router: Router = new Router()

router.post("/new", async function (req: Request, res: Response) {
    const expenses = await req.app.get("myDataSource").getRepository(Expenses).create(req.body.launch)
    const results = await req.app.get("myDataSource").getRepository(Expenses).save(expenses)
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
    //const decoded = await verify(req.body.token, 'segredo')
    const expenses = await req.app.get("myDataSource").getRepository(Expenses).findBy({
        userCode:req.body.userCode
    })
    return res.json(expenses)
})

router.post("/query/all", async (req:Request, res:Response)=>{
    //const decoded = await verify(req.body.token, 'segredo')
    const Expensess = await req.app.get("myDataSource").getRepository(Expenses).find()
    return res.json(Expensess)
})

router.put("/edit/:id", async (req: Request, res: Response) => {
    const expenses = await req.app.get("myDataSource").getRepository(Expenses).findOneBy(
        { userCode: req.params.id }
    )
    req.app.get("myDataSource").getRepository(Expenses).merge(Expenses, req.body)
    const results = await req.app.get("myDataSource").getRepository(Expenses).save(expenses)
    return res.json(results)
})

router.delete("/delete/:id", async (req: Request, res: Response) => {
    const results = await req.app.get("myDataSource").getRepository(Expenses).delete(req.params.id)
    return res.json(results)
})

export default router