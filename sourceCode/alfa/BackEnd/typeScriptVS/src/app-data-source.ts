import { DataSource } from "typeorm"

const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "postgres",
    password: "123456",
    database: "postgres",
    entities: ["src/entity/*.js"],
    logging: true,
    synchronize: true,
})