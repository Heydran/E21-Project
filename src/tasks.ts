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
        console.log("iniciando")
        console.log(debugText);
        
        scheduleJob(`00 * 9 * * *`, async function () {
            console.log("tentou schedue");
            
            const date = new Date()
            const mounth = date.getMonth() + 1
            const year = date.getFullYear()
            const datePeriod = Between(`${year}-${mounth}-01`, `${year}-${mounth}-31`)//"Automatic Launch Monthy Balance"
    
            const users = await myDataSource.getRepository(User).find()
            await users.forEach(async user => {
                var totalIncomes = 0
                var totalExpenses = 0
                const incomes = await myDataSource.getRepository(Income).find({
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
                const expenses = await myDataSource.getRepository(Expense).find({
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
                var launch = {}
                launch[`${table}Money`] = total
                launch[`${table}Category`] = "MonthlyBalance"
                launch[`${table}PaymentMethod`] = 1
                launch[`${table}TotalPayment`] = false
                launch[`${table}Times`] = 1
                launch[`${table}Pending`] = false
                launch[`${table}Date`] = moment(date).format("YYYY[-]MM[-]DD")
                launch[`${table}Description`] = "Automatic Monthly Balance Launch"
                launch[`user`] = user.userCode
                console.log("launcheeeeeeeeeeeeeeeeeeeeeeeeeee", launch);
                
                const monthlyBalance = await myDataSource.getRepository(totalIncomes > totalExpenses?Income:Expense).create(launch)
                await myDataSource.getRepository(Income).save(monthlyBalance)
            })
            
        })
        console.log("iniciou")
        
        
    }
}
export default Tasks



/**/