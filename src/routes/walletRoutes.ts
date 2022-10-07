import { Router, Request, Response } from "express"
import { Wallet } from "../entity/Wallet"
import { WalletUsers } from "../entity/WalletUsers"


const router: Router = Router()

router.post("/new", async function (req: Request, res: Response) {
    try {
        const wallet = await req.app.get("myDataSource").getRepository(Wallet).create(req.body.wallet)
        const results = await req.app.get("myDataSource").getRepository(Wallet).save(wallet)
        const walletOwner = await req.app.get("myDataSource").getRepository(WalletUsers).create({
            userCode: req.body.userCode,
            walletCode: results.walletCode

        })
        const woResults = await req.app.get("myDataSource").getRepository(WalletUsers).save(walletOwner)
        return res.json({ result: { successful: true } })
    } catch (err) {
        return res.json({ result: { successful: false, error: err.message } })
    }
})



router.post("/get", async (req: Request, res: Response) => {
    try {
        const wallets = await req.app.get("myDataSource").getRepository(WalletUsers).find({
            relations: {
                walletCode: true,
                userCode: true
            },
            where: { userCode: req.body.userCode }
        })
        await wallets.forEach(wallet => {
            wallet.userCode.userPasswd = "can't explaned"
        });
        return res.json({ registers: wallets })
    } catch (e) {
        console.log(e.message)
        return res.json({ err: e.message })
    }
})


router.post("/newCW", async function (req: Request, res: Response) {
    try {
        const wallet = await req.app.get("myDataSource").getRepository(Wallet).findOneBy(
            { walletCode: req.body.wallet.walletCode }
        )
        if (wallet.walletPasswd == req.body.wallet.password) {

            const walletOwner = await req.app.get("myDataSource").getRepository(WalletUsers).create({
                userCode: req.body.wallet.userCode,
                walletCode: req.body.wallet.walletCode

            })
            const woResults = await req.app.get("myDataSource").getRepository(WalletUsers).save(walletOwner)
            return res.json({ result: { successful: true } })
        }else {
            return res.json({ result: { successful: false, error: "crendenciais invalidas" } })    
        }
    } catch (err) {
        return res.json({ result: { successful: false, error: err.message } })
    }
})

export default router