import { DataSource } from "typeorm"
import { tUser } from "./entity/User"

const myDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "dbControleSe",
    entities: [tUser],
    logging: false,
    synchronize: true,
})

export { myDataSource }