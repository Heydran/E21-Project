import { Router, Request, Response } from "express"
import { Expense } from "../entity/Expense"
import { Parcel } from "../entity/Parcel"
import { MoreThanOrEqual, LessThanOrEqual, Equal, Between, Like } from "typeorm"
import * as moment from "moment"
//import { verify, sign } from "jsonwebtoken"

const router: Router = new Router()
router.post("/new", async function (req: Request, res: Response) {
    console.log("start");
    console.log(req.body.launch);
    var results = null
    const mDays = [ 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,31]
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
            const parcelResult = await req.app.get("myDataSource").getRepository(Parcel).save(parcel)
            req.body.launch["parcelCode"] = parcelResult.parcelCode
        }
        if (req.body.launch.expPaymentMethod == 1) {
            console.log("vista")
            results = await newExpense()
        } else if (req.body.launch.expPaymentMethod == 2) {
            await newParcel()
            const date = new Date(req.body.launch.expDate)
            const originalDay = date.getDate()+1
            for (let i = 0; i < req.body.launch.expTimes; i++) {
                results = await newExpense()                
                if (originalDay > mDays[date.getMonth()]) {
                    date.setDate(mDays[date.getMonth()])
                    date.setMonth(date.getMonth()+1)          
                }else {
                    date.setMonth(date.getMonth()+1)
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
})

router.post("/query", async (req: Request, res: Response) => {
    var registers
    var filters = {}
    var where = {}
    if (req.body.filterType == "=") {
        filters[req.body.column] = req.body.filter
    } else if (req.body.filterType == ">=") {
        filters[req.body.column] = MoreThanOrEqual(req.body.filter)
    } else if (req.body.filterType == "<=") {
        filters[req.body.column] = LessThanOrEqual(req.body.filter)
    } else if (req.body.filterType == "==") {
        filters[req.body.column] = Equal(req.body.filter)
    } else if (req.body.filterType == "[]") {
        filters[req.body.column] = Between(req.body.filter[0], req.body.filter[1])
    }else if (req.body.filterType == "+"){
        filters["expDate"] = Between(req.body.filter[0][0], req.body.filter[0][1])
        if (req.body.filter[1][0] == ">=") filters["expMoney"] = MoreThanOrEqual(req.body.filter[1][1])
        else if (req.body.filter[1][0] == "<=") filters["expMoney"] = LessThanOrEqual(req.body.filter[1][1])
        else if (req.body.filter[1][0] == "[]") filters["expMoney"] = Between(req.body.filter[1][1],req.body.filter[1][2])
        filters["expCategory"] = Equal(req.body.filter[2])
        filters["expDescription"] = Like(`%${req.body.filter[3]}%`)
    }
    console.log(filters)
    registers = await req.app.get("myDataSource").getRepository(Expense).findBy(filters)
    return res.json({ registers })
})

router.post("/query/all", async (req: Request, res: Response) => {
    //const decoded = await verify(req.body.token, 'segredo')
    const expanses = await req.app.get("myDataSource").getRepository(Expense).find()
    return res.json(expanses)
})

router.put("/edit/:id", async (req: Request, res: Response) => {
    const expanse = await req.app.get("myDataSource").getRepository(Expense).findOneBy(
        { userCode: req.params.id }
    )
    req.app.get("myDataSource").getRepository(Expense).merge(expanse, req.body)
    const results = await req.app.get("myDataSource").getRepository(Expense).save(Expense)
    return res.json(results)
})

router.delete("/delete/:id", async (req: Request, res: Response) => {
    const results = await req.app.get("myDataSource").getRepository(Expense).delete(req.params.id)
    return res.json(results)
})

export default router
