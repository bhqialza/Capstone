import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const saltRounds = process.env.SALT || 10;
const salt = bcrypt.genSaltSync(saltRounds);


export const createUser = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;
        if (password === confirmPassword) {
            const emailExist = await User.findOne({ where: { email } });
            if (emailExist) {
                return res.status(409).json({
                    status: "fail",
                    msg: "email already exists"
                })
            }
            const data = {
                username,
                email,
                password: await bcrypt.hash(password, salt)
            }
            const response = await User.create(data);
            return res.status(201).json({
                status: "success",
                msg: "user created"
            })
        }
        else {
            return res.status(400).json({
                status: "fail",
                msg: "password and confirm password does not match"
            })

        }
    } catch (error) {
        console.log(error.message);
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const token = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60 * 60 * 12' }); // expires in 12 hour
                return res.status(200).json({
                    status: "success",
                    msg: "login successful",
                    token
                })
            }
            else {
                return res.status(400).json({
                    status: "fail",
                    msg: "password does not match"
                })
            }
        }
        else {
            return res.status(400).json({
                status: "fail",
                msg: "user does not exist"
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['username', 'email']
        });
        return res.status(200).json({
            status: "success",
            users
        })
    } catch (error) {
        console.log(error.message);
    }
}
