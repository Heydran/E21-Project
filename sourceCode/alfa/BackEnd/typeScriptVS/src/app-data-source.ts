import { DataSource } from "typeorm"
import { tUser } from "./entity/User"
import { Income } from "./entity/Income"
import { Expenses } from "./entity/Expenses"
const myDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "dbControleSe",
    entities: [ tUser, Income, Expenses],
    logging: false,
    synchronize: true
})

export { myDataSource }