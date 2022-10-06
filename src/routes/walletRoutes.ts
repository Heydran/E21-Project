import { Router, Request, Response } from "express"
import { User } from "../entity/User"
import { verify } from "jsonwebtoken"
import { Wallet } from "../entity/Wallet"
import { WalletUsers } from "../entity/WalletUsers"


const router: Router = new Router()

router.post("/new", async function (req: Request, res: Response) {
    ///const decoded = await verify(req.body.token, 'segredo')
    const wallet = await req.app.get("myDataSource").getRepository(Wallet).create(req.body.wallet)
    const results = await req.app.get("myDataSource").getRepository(Wallet).save(wallet)
    const walletOwner = await req.app.get("myDataSource").getRepository(WalletUsers).create({
        userCode: req.body.userCode,
        walletCode: results.walletCode

    })
    const woResults = await req.app.get("myDataSource").getRepository(WalletUsers).save(walletOwner)
    return res.json({ tryed: true })//provisorio
})



router.post("/get", async (req: Request, res: Response) => {
    try {
        const walltes = await req.app.get("myDataSource").getRepository(WalletUsers).find({
            relations: {
                walletCode: true,
                userCode: true
            },
            where:{userCode:req.body.userCode}
        })
        return res.json()
        // return res.json(await req.app.get("myDataSource").getRepository(Wallet).query(`
        // SELECT Wallet."walletCode" FROM wallet_users 
        // INNER JOIN Wallet 
        // ON Wallet."walletCode" = wallet_users."walletCodeWalletCode"
        // WHERE wallet_users."userCodeUserCode`)) 
    } catch (e) {
        console.log(e.message)
        return res.json({err:e.message})
    }
})



export default router