import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();
const dbName = process.env.DB_NAME || 'capstone'
const dbHost = process.env.DB_HOST || 'localhost'
const dbPassword = process.env.DB_PASS || ''

const db = new Sequelize(dbName, 'root', dbPassword, {
    host: dbHost,
    dialect: 'mysql',

})

export default db;