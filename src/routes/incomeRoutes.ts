import { Router, Request, Response } from "express"
import { Income } from "./../entity/Income"
import { Parcel } from "./../entity/Parcel"
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
            const newIncome = async () => {
                const income = await req.app.get("myDataSource").getRepository(Income).create(req.body.launch)
                const results = await req.app.get("myDataSource").getRepository(Income).save(income)
                return results
            }
            var newParcel = async () => {
                const parcel = await req.app.get("myDataSource").getRepository(Parcel).create({
                    parcelDescription: req.body.launch.incDescription,
                    user: req.body.launch.user
                })
                req.body.launch.incMoney = req.body.launch.incMoney / req.body.launch.incTimes
                const parcelResult = await req.app.get("myDataSource").getRepository(Parcel).save(parcel)
                req.body.launch["parcelCode"] = parcelResult.parcelCode
            }
            if (req.body.launch.incPaymentMethod == 1) {
                console.log("vista")
                results = newIncome()
            } else if (req.body.launch.incPaymentMethod == 2) {
                await newParcel()
                const date = new Date(req.body.launch.incDate)
                const originalDay = date.getDate() + 1
                for (let i = 0; i < req.body.launch.incTimes; i++) {
                    results = await newIncome()
                    if (originalDay > mDays[date.getMonth()]) {
                        date.setDate(mDays[date.getMonth()])
                        date.setMonth(date.getMonth() + 1)
                    } else {
                        date.setMonth(date.getMonth() + 1)
                        date.setDate(originalDay)
                    }
                    req.body.launch.incDate = moment(date).format("YYYY[-]MM[-]DD")
                }
                results = await newIncome()
            } else if (req.body.incPaymentMethod == 3) {
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

    console.log(req.body)

    try {
        var filters = {
            user: req.body.user.code,
            incPending: false
        }
        try {

            filters["wallet"] = req.body.filter.wallet.code 
        } catch { }

        try {
            filters["parcel"] = req.body.filter.parcel.code 
        } catch { }

        if (req.body.pending == true)
            filters["incPending"] = true
        try {

            if (req.body.filter.date.type == "[]")
                filters["incDate"] = Between(req.body.filter.date.initDate, req.body.filter.date.endDate)
            else if (req.body.filter.date.type == ">")
                filters["incDate"] = MoreThanOrEqual(req.body.filter.date.initDate)
            else if (req.body.filter.date.type == "<")
                filters["incDate"] = LessThanOrEqual(req.body.filter.date.endDate)
        } catch { }

        try {

            if (req.body.filter.money.type == ">")
                filters["incMoney"] = MoreThanOrEqual(req.body.filter.money.minValue)
            else if (req.body.filter.money.type == "<")
                filters["incMoney"] = LessThanOrEqual(req.body.filter.money.maxValue)
            else if (req.body.filter.money.type == "[]")
                filters["incMoney"] = Between(req.body.filter.money.minValue, req.body.filter.maxValue)
        } catch { }


        try {

            if (req.body.filter.category.type == "all")
                filters["incCategory"] = Like("%%")
            else
                filters["incCategory"] = Equal(req.body.filter.category.value)
        } catch { }



        try {
            filters["incDescription"] = Like(`%${req.body.filter.description.value}%`)
        } catch (e) {
            console.log("err in description filter:", e.message)
         }


        const registers = await req.app.get("myDataSource").getRepository(Income).find({ where: filters })

        console.log("filters", filters)
        console.log("registers", registers)
        return res.json({ registers })
    } catch (e) {

        console.log("erro in income:", e.message)
        res.json({ err: e.message })
    }
})


router.post("/query/all", async (req: Request, res: Response) => {
    //const decoded = await verify(req.body.token, 'segredo')
    const incomes = await req.app.get("myDataSource").getRepository(Income).find()
    return res.json(incomes)
})

router.post("/edit", async (req: Request, res: Response) => {
    try {
        const income = await req.app.get("myDataSource").getRepository(Income).findOneBy(
            { incCode: req.body.launch.code }
        )
        const newIncome = req.app.get("myDataSource").getRepository(Income).merge(income, req.body.launch.column)

        const results = await req.app.get("myDataSource").getRepository(Income).save(newIncome)
        return res.json({ result: { successful: true, results } })
    } catch (e) {
        console.log(e.message)
        return res.json({ result: { successful: false, error: e.message } })
    }
})


router.post("/delete", async (req: Request, res: Response) => {
    try {
        const results = await req.app.get("myDataSource").getRepository(Income).delete(req.body.code)
        return res.json({ result: { successful: true, results } })
    } catch (e) {
        console.log(e.message);
        return res.json({ result: { successful: false, error: e.message } })

    }
})

export default router

