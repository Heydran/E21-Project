import { Router, Request, Response } from "express"
import { Expense } from "../entity/Expense"


const router: Router = new Router()

router.post("/new", async function (req: Request, res: Response) {
    const expense = await req.app.get("myDataSource").getRepository(Expense).create(req.body.launch)
    const results = await req.app.get("myDataSource").getRepository(Expense).save(expense)
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
    const registers = await req.app.get("myDataSource").getRepository(Expense).findBy({
        userCode:req.body.userCode
    })
    return res.json(registers)
})

router.post("/query/all", async (req:Request, res:Response)=>{
    //const decoded = await verify(req.body.token, 'segredo')
    const results = await req.app.get("myDataSource").getRepository(Expense).find()
    return res.json(results)
})

router.put("/edit/:id", async (req: Request, res: Response) => {
    const expense = await req.app.get("myDataSource").getRepository(Expense).findOneBy(
        { userCode: req.params.id }
    )
    req.app.get("myDataSource").getRepository(Expense).merge(Expense, req.body)
    const results = await req.app.get("myDataSource").getRepository(Expense).save(expense)
    return res.json(results)
})

router.delete("/delete/:id", async (req: Request, res: Response) => {
    const results = await req.app.get("myDataSource").getRepository(Expense).delete(req.params.id)
    return res.json(results)
})

export default router