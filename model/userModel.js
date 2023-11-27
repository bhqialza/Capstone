import db from "../middleware/db.js";
import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const { DataTypes } = Sequelize;

// const User = db.define('tbl_user', {
//     username: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING,
//     phone: DataTypes.STRING,
//     otp: DataTypes.INTEGER,
//     isVerified: DataTypes.BOOLEAN,
// }, {
//     freezeTableName: true,
// })

const User = db.define('tbl_users', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
}, {
    freezeTableName: true,
})

export default User;

(async () => {
    await db.sync()
})();