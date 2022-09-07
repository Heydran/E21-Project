import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Income } from "./entity/Income"
import { Expenses } from "./entity/Expenses"
const myDataSource = new DataSource({
    type: "postgres",
    host: "ec2-44-207-253-50.compute-1.amazonaws.com",
    port: 5432,
    username: "wuyrutizvjdnqe",
    password: "2f982159cab6aaeb310f2c4e684ef261fdfa60039b3a83ce0c9a16fb6616f4e5",
    database: "d91dhaif9e9kd5",
    entities: [ User, Income, Expenses],
    logging: false,
    synchronize: true,
    migrations: [],
    subscribers: [],
    ssl: { rejectUnauthorized: false }
})

export { myDataSource }