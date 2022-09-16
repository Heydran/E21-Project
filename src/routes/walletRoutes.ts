import { Router, Request, Response } from "express"
import { User } from "../entity/User"
import { verify } from "jsonwebtoken"
import { Wallet } from "../entity/Wallet"
import { WalletUsers } from "../entity/WalletUsers"


const router: Router = new Router()

router.post("/new", async function (req: Request, res: Response) {
    const decoded = await verify(req.body.token, 'segredo')
    const wallet = await req.app.get("myDataSource").getRepository(Wallet).create(decoded.Wallet)
    const results = await req.app.get("myDataSource").getRepository(Wallet).save(wallet)
    const walletOwner = await req.app.get("myDataSource").getRepository(WalletUsers).create({
        userCode: decoded.userCode,
        walletCode: results.walletCode
        
    })
    const woResults = await req.app.get("myDataSource").getRepository(Wallet).save(walletOwner)
    return res.json({tryed:true})//provisorio
})


router.get("/query/:id", async (req: Request, res: Response) => {

    const wallets = await req.app.get("myDataSource").getRepository(Wallet).query(`
    SELECT Wallet."walletCode" FROM wallet_users 
    INNER JOIN Wallet 
    ON Wallet."walletCode" = wallet_users."walletCodeWalletCode"
    WHERE "userCodeUserCode" = $1


`, [req.params.id])
    console.log(wallets)


    res.json(wallets)
})



export default router