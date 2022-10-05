import { Router, Request, Response } from "express"
import { Income } from "./../entity/Income"
import { Parcel } from "./../entity/Parcel"
import { MoreThanOrEqual, LessThanOrEqual, Equal, Between, Like } from "typeorm"
import * as moment from "moment"
//import { verify, sign } from "jsonwebtoken"

const router: Router = new Router()
router.post("/new", async function (req: Request, res: Response) {
    try{
    console.log("start");
    console.log(req.body.launch);
    var results = null
    const mDays = [ 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,31]
    try {
        const newIncome = async () => {
            const income = await req.app.get("myDataSource").getRepository(Income).create(req.body.launch)
            const results = await req.app.get("myDataSource").getRepository(Income).save(income)
            return results
        }
        var newParcel = async () => {
            const parcel = await req.app.get("myDataSource").getRepository(Parcel).create({
                parcelDescription: req.body.launch.incDescription,
                userCode: req.body.launch.userCode
            })
            req.body.launch.incMoney = req.body.launch.incMoney/req.body.launch.incTimes
            const parcelResult = await req.app.get("myDataSource").getRepository(Parcel).save(parcel)
            req.body.launch["parcelCode"] = parcelResult.parcelCode
        }
        if (req.body.launch.incPaymentMethod == 1) {
            console.log("vista")
            results = newIncome()
        } else if (req.body.launch.incPaymentMethod == 2) {
            await newParcel()
            const date = new Date(req.body.launch.incDate)
            const originalDay = date.getDate()+1
            for (let i = 0; i < req.body.launch.incTimes; i++) {
                results = await newIncome()                
                if (originalDay > mDays[date.getMonth()]) {
                    date.setDate(mDays[date.getMonth()])
                    date.setMonth(date.getMonth()+1)          
                }else {
                    date.setMonth(date.getMonth()+1)
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
}catch(e){
    console.log(e.mesage);
}
})

router.post("/query", async (req: Request, res: Response) => {
    var filters = {}

    if (req.body.pending){
        filters["incPending"] = true
    } else {
        filters["incPending"] = false
    }

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
    }else if (req.body.filterType == "..."){
        filters["incDate"] = Between(req.body.filter[0][0], req.body.filter[0][1])
        if (req.body.filter[1][0] == ">") filters["incMoney"] = MoreThanOrEqual(req.body.filter[1][1])
        else if (req.body.filter[1][0] == "<") filters["incMoney"] = LessThanOrEqual(req.body.filter[1][1])
        else if (req.body.filter[1][0] == "[]") filters["incMoney"] = Between(req.body.filter[1][1],req.body.filter[1][2])
        if (req.body.filter[2] == "all") filters["incCategory"] = Like("%%")
        else filters["incCategory"] = Equal(req.body.filter[2])
        filters["incDescription"] = Like(`%${req.body.filter[3]}%`)
    }
    console.log(filters)
    const registers = await req.app.get("myDataSource").getRepository(Income).find({where:filters})
            return res.json({ registers })
})


router.post("/query/all", async (req: Request, res: Response) => {
    //const decoded = await verify(req.body.token, 'segredo')
    const incomes = await req.app.get("myDataSource").getRepository(Income).find()
    return res.json(incomes)
})

router.post("/edit/", async (req: Request, res: Response) => {
    const income = await req.app.get("myDataSource").getRepository(Income).findOneBy(
        { userCode: req.body.launch.incCode }
    )
    req.app.get("myDataSource").getRepository(Income).merge(income, req.body.launch)
    const results = await req.app.get("myDataSource").getRepository(Income).save(Income)
    return res.json(results)
})

router.post("/delete", async (req: Request, res: Response) => {
    try {
        const results = await req.app.get("myDataSource").getRepository(Income).delete(req.body.incCode)
        return res.json(results)
    }catch(e){
        console.log(e.message);
        
    }
})

export default router

