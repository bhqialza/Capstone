import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();
const dbName = process.env.DB_NAME || 'capstone'
const dbHost = process.env.MYSQL_HOST || 'localhost'
const dbPassword = process.env.MYSQL_ROOT_PASSWORD || ''

const db = new Sequelize(dbName, 'root', dbPassword, {
    host: dbHost,
    dialect: 'mysql',
    "ssl": true,
    "dialectOptions": {
        "ssl": {
            "require": true
        }
    }

})

export default db;


