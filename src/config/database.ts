import { Sequelize } from "sequelize";

const dbhost = <string>process.env.DB_HOST;
const database = <string>process.env.DB;
const user = <string>process.env.DB_USER;
const password = <string>process.env.DB_PASSWORD;

const db = new Sequelize(database, user, password, {
    host: dbhost,
    dialect: "mysql"
})

export default db;