import { scheduleJob } from "node-schedule"
import { Income } from "./entity/Income"
import { Expense } from "./entity/Expense"
import { User } from "./entity/User"
import { Between } from "typeorm"
import * as moment from "moment"

class Tasks {
    myDataSource: any                        //sec min hor day monthy weekDay
    monthlyBalance: any


    async resetUserMoney(userCode: number, myDataSource: any) {
        const user = await myDataSource.getRepository(User).findOneBy({ userCode: userCode })
        const newUser = {
            userMoney: 0,
            userTotalIncomes: 0,
            userTotalExpenses: 0
        }
        const updateUser = await myDataSource.getRepository(User).merge(user, newUser)
        await myDataSource.getRepository(User).save(updateUser)
    }

    async newLaunche(totalIncomes: number, totalExpenses: number, user: number, myDataSource: any) {
        const date = new Date()
        var table = ""
        var total = 0
        if (totalIncomes >= totalExpenses) {
            table = "inc",
                total = totalIncomes - totalExpenses
        } else {
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
        launch[`user`] = user
        console.log("launcheeeeeeeeeeeeeeeeeeeeeeeeeee", launch)

        var monthlyBalance = await myDataSource.getRepository(totalIncomes > totalExpenses ? Income : Expense).create(launch)
        await myDataSource.getRepository(Income).save(monthlyBalance)
        return true
    }

    async monthlyBalanceCalc(myDataSource: any, resetUserMoney: any, newLaunche: any) {
        scheduleJob(`* * * * * *`, async function () {//`20 00 00 01 * *`
            try {
                console.log("tentou schedue")
                const lastDay = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
                var date = new Date()
                date.setMonth(date.getMonth() - 1)//usado para reduzir o ano automaticamente caso for em janeiro
                var mounth = date.getMonth() + 1
                var year = date.getFullYear()
                var datePeriod = Between(`${year}-${mounth}-01`, `${year}-${mounth}-${lastDay[mounth]}`)//"Automatic Launch Monthy Balance"

                var users = await myDataSource.getRepository(User).find()

                await users.forEach(async (user: User) => {
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
                    await resetUserMoney(user.userCode)
                    await newLaunche(totalIncomes, totalExpenses, user.userCode)
                })

            } catch (e) {
                console.log(e.message)

            }
        }
        )
    }
    teste() {
        console.log("testeandoooooooooooooooooooooooooooooooo")

    }

    constructor(myDataSource: any) {
        console.log("init task")
        this.myDataSource = myDataSource
        this.monthlyBalanceCalc(myDataSource, this.resetUserMoney, this.newLaunche )
    }



}

export default Tasks



/**/