import db from "../middleware/db.js";
import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const { DataTypes } = Sequelize;

const Product = db.define('tbl_products', {
    category: DataTypes.STRING,
    name: DataTypes.STRING,
    img: DataTypes.TEXT,
    steps: DataTypes.TEXT,
}, {
    freezeTableName: true,
})

export default Product;

(async () => {
    await db.sync()
})();