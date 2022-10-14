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
        
        scheduleJob(`00 * * * * *`, async function () {
            console.log("tentou schedue");
            
            var date = new Date()
            var mounth = date.getMonth() + 1
            var year = date.getFullYear()
            var datePeriod = Between(`${year}-${mounth}-01`, `${year}-${mounth}-31`)//"Automatic Launch Monthy Balance"
    
            var users = await myDataSource.getRepository(User).find()
            await users.forEach(async user => {
                var totalIncomes = 0
                var totalExpenses = 0
                var incomes = await myDataSource.getRepository(Income).find({
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
                var expenses = await myDataSource.getRepository(Expense).find({
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
                
                var monthlyBalance = await myDataSource.getRepository(totalIncomes > totalExpenses?Income:Expense).create(launch)
                await myDataSource.getRepository(Income).save(monthlyBalance)
            })
            
        })
        console.log("iniciou")
        
        
    }
}
export default Tasks



/**/