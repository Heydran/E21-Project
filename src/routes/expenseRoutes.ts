import { Router, Request, Response } from "express"
import { User } from "../entity/User"
import { Wallet } from "../entity/Wallet"
import { Expense } from "../entity/Expense"
import { Parcel } from "../entity/Parcel"
import { MoreThanOrEqual, LessThanOrEqual, Equal, Between, Like } from "typeorm"
import * as moment from "moment"
//import { verify, sign } from "jsonwebtoken"

const router: Router = Router()
router.post("/new", async function (req: Request, res: Response) {
    try {
        console.log("start");
        console.log(req.body.launch);
        var results = null
        var calc = true
        const mDays = [28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 31]
        try {
            const newExpense = async (calc) => {
                const expanse = await req.app.get("myDataSource").getRepository(Expense).create(req.body.launch)
                const results = await req.app.get("myDataSource").getRepository(Expense).save(expanse)
                if (calc && !req.body.launch.expPending) {
                    const user = await req.app.get("myDataSource").getRepository(User).findOneBy(
                        { userCode: req.body.launch.user }
                    )
                    var update = {
                        userMoney: user.userMoney - req.body.launch.expMoney,
                        userTotalExpenses: user.userTotalExpenses + req.body.launch.expMoney
                    }

                    await req.app.get("myDataSource").getRepository(User).merge(user, update)
                    await req.app.get("myDataSource").getRepository(User).save(user)
                }
                try {
                    console.log(req.body.launch.wallet, "wallettttttttttttttttttttttt")

                    if (req.body.launch.wallet > 0 && req.body.launch.wallet != undefined) {
                        const wallet = await req.app.get("myDataSource").getRepository(Wallet).findOneBy(
                            {
                                walletCode: req.body.launch.wallet
                            }
                        )

                        var walletUpdate = {
                            walletTotalExpenses: wallet.walletTotalExpenses + req.body.launch.expMoney
                        }
                        const newWallet = await req.app.get("myDataSource").getRepository(Wallet).merge(wallet, walletUpdate)
                        await req.app.get("myDataSource").getRepository(Wallet).save(newWallet)
                    }
                } catch (e) {
                    console.log("error in expenseRoutes, wallet total exp refresh --------------------------------", e.message)

                }
                return results
            }
            var newParcel = async () => {
                const parcel = await req.app.get("myDataSource").getRepository(Parcel).create({
                    parcelDescription: req.body.launch.expDescription,
                    userCode: req.body.launch.userCode
                })
                req.body.launch.expMoney = req.body.launch.expMoney / req.body.launch.expTimes
                const parcelResult = await req.app.get("myDataSource").getRepository(Parcel).save(parcel)
                req.body.launch["parcelCode"] = parcelResult.parcelCode
            }
            if (req.body.launch.expPaymentMethod == 1) {
                console.log("vista")
                results = await newExpense(true)
            } else if (req.body.launch.expPaymentMethod == 2) {
                await newParcel()
                const date = new Date(req.body.launch.expDate)
                const originalDay = date.getDate() + 1
                for (let i = 0; i < req.body.launch.expTimes; i++) {
                    results = await newExpense(calc)
                    calc = false
                    if (originalDay > mDays[date.getMonth()]) {
                        date.setDate(mDays[date.getMonth()])
                        date.setMonth(date.getMonth() + 1)
                    } else {
                        date.setMonth(date.getMonth() + 1)
                        date.setDate(originalDay)
                    }
                    req.body.launch.expDate = moment(date).format("YYYY[-]MM[-]DD")
                }
                results = await newExpense(calc)
            } else if (req.body.expPaymentMethod == 3) {
                "continuo, limite de vezes desconhecido"
            }
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
        } catch (err) {
            console.log(err)
        }
    } catch (e) {
        console.log(e.mesage);

    }
})

router.post("/query", async (req: Request, res: Response) => {
    try {
        var filters = {
            user: { userCode: req.body.user.code },
            expPending: false
        }
        try {

            filters["wallet"] = Equal(req.body.filter.wallet.code)
        } catch (e) {

        }

        try {
            filters["parcel"] = { parcel: req.body.filter.parcel.code }
        } catch { }

        if (req.body.pending == true)
            filters["expPending"] = true
        try {

            if (req.body.filter.date.type == "[]")
                filters["expDate"] = Between(req.body.filter.date.initDate, req.body.filter.date.endDate)
            else if (req.body.filter.date.type == ">")
                filters["expDate"] = MoreThanOrEqual(req.body.filter.date.initDate)
            else if (req.body.filter.date.type == "<")
                filters["expDate"] = LessThanOrEqual(req.body.filter.date.endDate)
        } catch { }

        try {

            if (req.body.filter.money.type == ">")
                filters["expMoney"] = MoreThanOrEqual(req.body.filter.money.minValue)
            else if (req.body.filter.money.type == "<")
                filters["expMoney"] = LessThanOrEqual(req.body.filter.money.maxValue)
            else if (req.body.filter.money.type == "[]")
                filters["expMoney"] = Between(req.body.filter.money.minValue, req.body.filter.maxValue)
        } catch { }


        try {

            if (req.body.filter.category.type == "all")
                filters["expCategory"] = Like("%%")
            else
                filters["expCategory"] = Equal(req.body.filter.category.value)
        } catch { }



        try {
            filters["expDescription"] = Like(`%${req.body.filter.description.value}%`)
        } catch (e) { }
        const registers = await req.app.get("myDataSource").getRepository(Expense).find({ where: filters })

        console.log("filters", filters)
        console.log("registers", registers)
        return res.json({ registers })
    } catch (e) {

        console.log("erro in expense:", e.message)
        res.json({ err: e.message })
    }
})

router.post("/query/wallet", async (req: Request, res: Response) => {
    const registers = await req.app.get("myDataSource").getRepository(Expense).find({
        where:{
            wallet:Equal(req.body.filter.wallet.code),
            expPending: false
        }
    })
    return res.json({ registers })
})

router.post("/query/all", async (req: Request, res: Response) => {
    //const decoded = await verify(req.body.token, 'segredo')
    const expanses = await req.app.get("myDataSource").getRepository(Expense).find()
    return res.json(expanses)
})

router.post("/edit", async (req: Request, res: Response) => {
    try {
        const expense = await req.app.get("myDataSource").getRepository(Expense).findOneBy(
            { expCode: req.body.launch.code }
        )
        const newExpense = await req.app.get("myDataSource").getRepository(Expense).merge(expense, req.body.launch.column)
        const results = await req.app.get("myDataSource").getRepository(Expense).save(newExpense)
        console.log(results)

        try{
            if (req.body.launch.column.expPending == false) { 
                const user = await req.app.get("myDataSource").getRepository(User).findOneBy(
                    { userCode: req.body.launch.user }
                )
                var userUpdate = {
                    userMoney: user.userMoney - req.body.launch.expMoney,
                    userTotalExpenses: user.userTotalExpenses + req.body.launch.expMoney
                }

                const newUser = await req.app.get("myDataSource").getRepository(User).merge(user, userUpdate)
                await req.app.get("myDataSource").getRepository(User).save(newUser)
            }
        }catch (err){
            
        }

        return res.json({ result: { successfull: true, results } })
    } catch (e) {
        console.log(e.message)
        return res.json({ results: null, error: e.message })
    }
})

router.post("/delete", async (req: Request, res: Response) => {
    try {
        const results = await req.app.get("myDataSource").getRepository(Expense).delete(req.body.code)
        return res.json({ result: { successfull: true, results } })
    } catch (e) {
        console.log(e.message);
        return res.json({ result: { successfull: false, error: e.message } })

    }
})


async function updateUserMoney(userCode: number, money: number, table) {
    const user = await table.findOneBy(
        { userCode }
    )
    var userUpdate = {
        userMoney: user.userMoney + money,
        userTotalExpense: user.userTotalExpense + money
    }

    const newUser = await table.merge(user, userUpdate)
    await table.save(newUser)
}

export default router

