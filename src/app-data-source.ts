import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Income } from "./entity/Income"
import { Expense } from "./entity/Expense"
import { Wallet } from "./entity/Wallet"
import { WalletUsers } from './entity/WalletUsers'
import { Parcel } from "./entity/Parcel"

// const myDataSource = new DataSource({
//     type: "postgres",
//     host: "ec2-44-207-253-50.compute-1.amazonaws.com",
//     port: 5432,
//     username: "wuyrutizvjdnqe",
//     password: "2f982159cab6aaeb310f2c4e684ef261fdfa60039b3a83ce0c9a16fb6616f4e5",
//     database: "d91dhaif9e9kd5",
//     entities: [ User, Income, Expense, Wallet, WalletUsers, Parcel],
//     logging: false,
//     synchronize: true,
//     migrations: [],
//     subscribers: [], 
//     ssl: { rejectUnauthorized: false }
// })

const myDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "postgres",
    entities: [User, Income, Expense, Wallet, WalletUsers, Parcel],
    logging: false,
    synchronize: true
})

/*
drop table Parcel;
drop table income;
drop table expense;
drop table Wallet_Users;
drop table wallet;
drop table "user";


*/


export { myDataSource }
