import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { sendEmail } from "../middleware/sendEmail.js";

dotenv.config();
const saltRounds = process.env.SALT || 10;
const salt = bcrypt.genSaltSync(saltRounds);

export const createUser = async (req, res) => {
    try {
        const { username, email, phone, password, confirmPassword } = req.body;
        console.log(phone);
        if (password === confirmPassword) {
            const emailExist = await User.findOne({ where: { email } });
            if (emailExist) {
                return res.status(409).json({
                    status: "fail",
                    msg: "email already exists"
                })
            }
            const otp = Math.floor(100000 + Math.random() * 900000);
            const data = {
                username,
                email,
                phone,
                password: await bcrypt.hash(password, salt),
                otp,
                isVerified: false
            }
            sendEmail(email, otp);
            const response = await User.create(data);
            if (!response) return res.status(400).json({
                status: "fail",
                msg: "user can't created"
            })
            return res.status(201).json({
                status: "success",
                msg: "user created",
                email: response.email
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

export const verifyUser = async (req, res) => {
    try {
        const email = req.query.email;
        const { otp } = req.body;
        const user = await User.findOne({ where: { email } });
        if (user) {
            if (otp == user.otp) {
                const response = await User.update({ isVerified: true, otp: null }, { where: { email } });
                if (!response) return res.status(400).json({
                    status: "fail",
                    msg: "user not verified"
                })
                return res.status(200).json({
                    status: "success",
                    msg: "user verified"
                })
            }
            else {
                return res.status(400).json({
                    status: "fail",
                    msg: "otp does not match"
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



export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const token = jwt.sign({ email: user.email, username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' }); // expires in 1 hour
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
