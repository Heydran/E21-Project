import { scheduleJob } from "node-schedule"
import { Income } from "./entity/Income"
import { Expense } from "./entity/Expense"
import { User } from "./entity/User"
import { Between } from "typeorm"
import * as moment from "moment"

class Tasks  {
    myDataSource:any
    monthlyBalance: any = scheduleJob(`20 * * * * *`, async function () {
        console.log("acontecendo");
        
        // const date = new Date()
        // const mounth = date.getMonth() + 1
        // const year = date.getFullYear()
        // const datePeriod = Between(`${year}[-]${mounth}[-]01`, `${year}[-]${mounth}[-]31`)//"Automatic Launch Monthy Balance"

        // const users = await myDataSource.getRepository(User).find()
        // await users.forEach(async user => {
        //     var totalIncomes = 0
        //     var totalExpenses = 0
        //     const incomes = await myDataSource.getRepository(Income).find({
        //         where:
        //         {
        //             user:
        //                 { userCode: user.userCode },
        //             incDate: datePeriod
        //         }
        //     })
        //     await incomes.forEach(income => {
        //         totalIncomes = totalIncomes + income.incMoney
        //     })
        //     const expenses = await myDataSource.getRepository(Expense).find({
        //         where:
        //         {
        //             user:
        //                 { userCode: user.userCode },
        //             expDate: datePeriod
        //         }
        //     })
        //     await expenses.forEach(income => {
        //         totalExpenses = totalExpenses + income.expMoney
        //     })
        //     var table = ""
        //     var total = 0
        //     var scheme = null
        //     if (totalIncomes > totalExpenses) {
        //         table = "inc",
        //         total = totalIncomes - totalExpenses
        //     }else{
        //         table = "exp",
        //         total = totalExpenses - totalIncomes

        //     }
        //     var launche = {}
        //     launche[`${table}Money`] = total
        //     launche[`${table}Category`] = "MonthlyBalance"
        //     launche[`${table}PaymentMethod`] = 1
        //     launche[`${table}Times`] = 1
        //     launche[`${table}Peding`] = false
        //     launche[`${table}Date`] = moment(date).format("YYYY[-]MM[-]DD")
        //     launche[`${table}Description`] = "Automatic Monthly Balance Launche"
        //     launche[`user`] = user.userCode
        //     launche[`wallet`] = 0

        //     const monthlyBalance = await myDataSource.getRepository(totalIncomes > totalExpenses?Income:Expense).create(launche)
        //     await myDataSource.getRepository(Income).save(monthlyBalance)
        // })
    })
    constructor(myDataSource) {
        this.myDataSource = myDataSource
    }
}
export default Tasks