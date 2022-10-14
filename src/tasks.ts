import { scheduleJob } from "node-schedule"
import { Income } from "./entity/Income"
import { Expense } from "./entity/Expense"
import { User } from "./entity/User"
import { Between } from "typeorm"
import * as moment from "moment"

class Tasks  {
    myDataSource:any                        //sec min hor day monthy weekDay
    monthlyBalance: any 
    debugText: string
    constructor(myDataSource:any, debugText: string) {
        this.myDataSource = myDataSource
        this.debugText = debugText
        console.log(this.debugText);
        
    }
}
export default Tasks



/*= () =>  scheduleJob(`20 00 00 * * *`, async function () {
        console.log("tentou schedue");
        
        const date = new Date()
        const mounth = date.getMonth() + 1
        const year = date.getFullYear()
        const datePeriod = Between(`${year}[-]${mounth}[-]01`, `${year}[-]${mounth}[-]31`)//"Automatic Launch Monthy Balance"

        const users = await this.myDataSource.getRepository(User).find()
        await users.forEach(async user => {
            var totalIncomes = 0
            var totalExpenses = 0
            const incomes = await this.myDataSource.getRepository(Income).find({
                where:
                {
                    user:
                        { userCode: user.userCode },
                    incDate: datePeriod
                }
            })
            await incomes.forEach(income => {
                totalIncomes = totalIncomes + income.incMoney
            })
            const expenses = await this.myDataSource.getRepository(Expense).find({
                where:
                {
                    user:
                        { userCode: user.userCode },
                    expDate: datePeriod
                }
            })
            await expenses.forEach(income => {
                totalExpenses = totalExpenses + income.expMoney
            })
            var table = ""
            var total = 0
            var scheme = null
            if (totalIncomes > totalExpenses) {
                table = "inc",
                total = totalIncomes - totalExpenses
            }else{
                table = "exp",
                total = totalExpenses - totalIncomes

            }
            var launche = {}
            launche[`${table}Money`] = total
            launche[`${table}Category`] = "MonthlyBalance"
            launche[`${table}PaymentMethod`] = 1
            launche[`${table}Times`] = 1
            launche[`${table}Peding`] = false
            launche[`${table}Date`] = moment(date).format("YYYY[-]MM[-]DD")
            launche[`${table}Description`] = "Automatic Monthly Balance Launche"
            launche[`user`] = user.userCode
            launche[`wallet`] = 0

            const monthlyBalance = await this.myDataSource.getRepository(totalIncomes > totalExpenses?Income:Expense).create(launche)
            await this.myDataSource.getRepository(Income).save(monthlyBalance)
        })
        
    })*/