import { Router, Request, Response } from "express"
import { User } from "./../entity/User"
import { verify } from "jsonwebtoken"
import { Wallet } from "./../entity/Wallet"


const router: Router = new Router()

router.post("/new", async function (req: Request, res: Response) {
    const decoded = await verify(req.body.token, 'segredo')
    const wallet = await req.app.get("myDataSource").getRepository(Wallet).create(decoded)
    const results = await req.app.get("myDataSource").getRepository(Wallet).save(wallet)
    return res.send(results)
})


router.get("/query/:id", async (req: Request, res: Response) => {
    const wallets = await req.app.get("myDataSource").getRepository(Wallet).query(`
        select walletCode from wallet_users where userCode == $1 
        inner join Wallet on Wallet.walletCode == wallet_users.walletCode
        
    `,[req.parans.id])
    console.log(wallets)


    res.json(wallets)
})


export default router