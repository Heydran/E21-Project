import { Router, Request, Response } from "express"
import { Wallet } from "../entity/Wallet"
import { WalletUsers } from "../entity/WalletUsers"
import { ShareRequest } from "../entity/ShareRequest"
import { Equal } from "typeorm"


const router: Router = Router()

router.post("/new", async function (req: Request, res: Response) {
    try {
        const wallet = await req.app.get("myDataSource").getRepository(Wallet).create(req.body.wallet)
        const results = await req.app.get("myDataSource").getRepository(Wallet).save(wallet)
        const walletOwner = await req.app.get("myDataSource").getRepository(WalletUsers).create({
            user: req.body.userCode,
            wallet: results.walletCode,
            favorite: req.body.wallet.favorite

        })
        const woResults = await req.app.get("myDataSource").getRepository(WalletUsers).save(walletOwner)
        if (woResults) return res.json({ result: { successful: true } })
        else return res.json({ result: { successful: false }, woResults })
    } catch (err) {
        return res.json({ result: { successful: false, error: err.message } })
    }
})



router.post("/get", async (req: Request, res: Response) => {
    try {


        const wallets = await req.app.get("myDataSource").getRepository(WalletUsers).find({
            relations: {
                wallet: true,
                user: true
            },
            where: {
                user: { userCode: req.body.userCode }
            }
        })
        await wallets.forEach(wallet => {
            wallet.user.userPasswd = "can't explaned"
        });
        return res.json({ registers: wallets })
    } catch (e) {
        console.log(e.message)
        return res.json({ err: e.message })
    }
})


router.post("/join", async function (req: Request, res: Response) {
    try {

        console.log(req.body.wallet, "bodyyyyyyyyyyyyyyyyyyyyyyyyyy")

        const wallet = await req.app.get("myDataSource").getRepository(Wallet).findOneBy({
            walletCode: req.body.wallet.walletCode
        })

        const coWallet = await req.app.get("myDataSource").getRepository(WalletUsers).find({
            relations: {
                wallet: true
            },
            where: {
                user: Equal(req.body.wallet.userCode)
            }
        })
        coWallet.forEach(wallet => {
            if (wallet.wallet.walletCode == req.body.wallet.walletCode) {
                throw "wallet already acess"
            }
        })
        const walletOwner = await req.app.get("myDataSource").getRepository(WalletUsers).create({
            user: req.body.wallet.userCode,
            wallet: wallet.walletCode,
            favorite: req.body.wallet.favorite

        })
        const woResults = await req.app.get("myDataSource").getRepository(WalletUsers).save(walletOwner)

        return res.json({ result: { successful: true, error: "Wallet Adicionada" } })

    } catch (err) {
        console.log(err, "eroooooooooooooooo")

        return res.json({ result: { successful: false, error: "Wallet inexistente ou ja acessada" } })
    }
})


router.post("/shareCreate", async (req: Request, res: Response) => {
    let shareCode = null
    let wallet = null
    do {
        shareCode = Math.random() * (999999 - 111111) + 111111
        wallet = await req.app.get("myDataSource").getRepository(Wallet).findOneBy(
            { shareCode }
        )
    } while (wallet.shareCode)
    const sharingConn = await req.app.get("myDataSource").getRepository(ShareRequest).create({
        shareCode,
        walletCode: req.body.walletCode
    })
    const sharing = await req.app.get("myDataSource").getRepository(ShareRequest).create(sharingConn)
    res.json({ result: { successful: true, sharing } })
})


router.post("/share", async (req: Request, res: Response) => {
    const share = await req.app.get("myDataSource").getRepository(ShareRequest).findOneBy(
        { shareCode: req.body.shareCode }
    )
    const walletOwner = await req.app.get("myDataSource").getRepository(WalletUsers).create({
        userCode: req.body.userCode,
        walletCode: share.walletCode

    })
    const woResult = await req.app.get("myDataSource").getRepository(WalletUsers).save(walletOwner)

    const delShare = await req.app.get("myDataSource").getRepository(ShareRequest).delete(req.body.shareCode)
    return res.json({ result: { successful: true } })
})

router.post("/exit", async (req: Request, res: Response) => {
    try {
        const results = await req.app.get("myDataSource").getRepository(WalletUsers).delete(req.body.wuCode)
        return res.json({ result: { successfull: true, results } })
    } catch (e) {
        console.log(e.message);
        return res.json({ result: { successfull: false, error: e.message } })

    }
})
export default router