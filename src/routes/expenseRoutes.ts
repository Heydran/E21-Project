import { Router, Request, Response } from "express"
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
        const mDays = [28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 31]
        try {
            const newExpense = async () => {
                const expanse = await req.app.get("myDataSource").getRepository(Expense).create(req.body.launch)
                const results = await req.app.get("myDataSource").getRepository(Expense).save(expanse)
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
                results = await newExpense()
            } else if (req.body.launch.expPaymentMethod == 2) {
                await newParcel()
                const date = new Date(req.body.launch.expDate)
                const originalDay = date.getDate() + 1
                for (let i = 0; i < req.body.launch.expTimes; i++) {
                    results = await newExpense()
                    if (originalDay > mDays[date.getMonth()]) {
                        date.setDate(mDays[date.getMonth()])
                        date.setMonth(date.getMonth() + 1)
                    } else {
                        date.setMonth(date.getMonth() + 1)
                        date.setDate(originalDay)
                    }
                    req.body.launch.expDate = moment(date).format("YYYY[-]MM[-]DD")
                }
                results = await newExpense()
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
            user:
                { userCode: req.body.user.code },
            incPending: false
        }

        if (req.body.filter.wallet.code)
            filters["wallet"] = { walletCode: req.body.filter.wallet.code }

        if (req.body.filter.parcel.code)
            filters["parcel"] = { parcelCode: req.body.filter.parcel.code }

        if (req.body.pending)
            filters["expPending"] = true


        if (req.body.filter.date.type && req.body.filter.date.type == "[]")
            filters["expDate"] = Between(req.body.filter.date.initDate, req.body.filter.date.endDate)
        else if (req.body.filter.date.type == ">")
            filters["expDate"] = MoreThanOrEqual(req.body.filter.date.initDate)
        else if (req.body.filter.date.type == "<")
            filters["expDate"] = LessThanOrEqual(req.body.filter.date.endDate)


        if (req.body.filter.omey.type && req.body.filter.money.type == ">")
            filters["expMoney"] = MoreThanOrEqual(req.body.filter.money.minValue)
        else if (req.body.filter[1][0] == "<")
            filters["expMoney"] = LessThanOrEqual(req.body.filter.money.maxValue)
        else if (req.body.filter[1][0] == "[]")
            filters["expMoney"] = Between(req.body.filter.money.minValue, req.body.filter.maxValue)


        if (req.body.filter.category.type && req.body.filter.category.type == "all")
            filters["expCategory"] = Like("%%")
        else
            filters["expCategory"] = Equal(req.body.filter.category.value)
        if (req.body.filter.description.value)
            filters["expDescription"] = Like(`%${req.body.filter.description.value}%`)


        const registers = await req.app.get("myDataSource").getRepository(Expense).find({ where: filters })
        return res.json({ registers })
    } catch (e) {
        res.json({ err: e.message })
    }
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
        const newExpense = req.app.get("myDataSource").getRepository(Expense).merge(expense, req.body.launch.column)
        const results = await req.app.get("myDataSource").getRepository(Expense).save(newExpense)
        return res.json(results)
    } catch (e) {
        console.log(e.message)
        return res.json({ results: null, error: e.message })
    }
})

router.post("/delete", async (req: Request, res: Response) => {
    try {
        const results = await req.app.get("myDataSource").getRepository(Expense).delete(req.body.code)
        return res.json({ result: results })
    } catch (e) {
        console.log(e.message);

    }
})

export default router

