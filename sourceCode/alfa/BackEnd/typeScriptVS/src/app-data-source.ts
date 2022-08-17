import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Renda } from "./entity/Renda"
import { Photo } from "./entity/Photo"
import { Func } from "./entity/Func"

const myDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "dbControleSe",
    entities: [ User, Renda, Func, Photo],
    logging: false,
    synchronize: true
})

export { myDataSource }