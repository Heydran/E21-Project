import { Router, Request, Response } from "express"
import { Income } from "./../entity/Income"
import { Parcel } from "./../entity/Parcel"
import { MoreThan, LessThan, MoreThanOrEqual, LessThanOrEqual, Equal, Between } from "typeorm"
import * as moment from "moment"
//import { verify, sign } from "jsonwebtoken"


const router: Router = new Router()

router.post("/new", async function (req: Request, res: Response) {
    console.log("start");
    console.log(req.body.launch);
    var results = null
    const mDays = [null, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

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
            const parcelResult = await req.app.get("myDataSource").getRepository(Parcel).save(parcel)


            req.body.launch["parcelCode"] = parcelResult.parcelCode

        }


        if (req.body.launch.incPaymentMethod == 1) {
            console.log("vista")
            results = newIncome()
        } else if (req.body.launch.incPaymentMethod == 2) {
            console.log("parcelado");
            await newParcel()
            console.log(req.body.launch.incTimes);
            const date = new Date(req.body.launch.incDate)
            //date.setDate(date.getDate()+1)
            for (let i = 0; i < req.body.launch.incTimes; i++) {
                console.log(i, req.body.launch.incTimes);

                results = await newIncome()
                if (date.getDate() > mDays[date.getMonth() + 1]) {
                    date.setDate(mDays[date.getMonth() + 1])
                }
                date.setMonth(date.getMonth() + 1)
                req.body.launch.incDate = moment(date).format("YYYY[-]MM[-]DD")
            }
        } else if (req.body.incPaymentMethod == 3) {
            "continuo, limite de vezes desconhecido"
        }
        console.log(req.body.launch.incDate);


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
    /*var where = {
        date: Between(req.body.filter[0][0], req.body.filter[0][1]),
        category: req.body.filter[1]
    }*/

    // if (req.body.filter[2].type == "")

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
    }

    // where[req.body.column[0]] = Between(req.body.filter[0][0], req.body.filter[0][1])
    // where[req.body.column[1]] = Equal(req.body.filter[1])
    // where[req.body.column[2]] = req.body.filter[2]

    console.log(filters);

    registers = await req.app.get("myDataSource").getRepository(Income).findBy(filters)
    console.log(registers);

    return res.json({ registers })
})

router.post("/query/all", async (req: Request, res: Response) => {
    //const decoded = await verify(req.body.token, 'segredo')
    const incomes = await req.app.get("myDataSource").getRepository(Income).find()
    return res.json(incomes)
})

router.put("/edit/:id", async (req: Request, res: Response) => {
    const income = await req.app.get("myDataSource").getRepository(Income).findOneBy(
        { userCode: req.params.id }
    )
    req.app.get("myDataSource").getRepository(Income).merge(income, req.body)
    const results = await req.app.get("myDataSource").getRepository(Income).save(Income)
    return res.json(results)
})

router.delete("/delete/:id", async (req: Request, res: Response) => {
    const results = await req.app.get("myDataSource").getRepository(Income).delete(req.params.id)
    return res.json(results)
})

export default router