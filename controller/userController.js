import User from "../model/userModel.js";
import Product from "../model/productModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { sendEmail } from "../middleware/sendEmail.js";
import axios from "axios";
import multer from "multer";
import FormData from "form-data";

dotenv.config();
const saltRounds = process.env.SALT || 10;
const salt = bcrypt.genSaltSync(saltRounds);
const storage = multer.memoryStorage();

// export const createUser = async (req, res) => {
//     try {
//         const { username, email, phone, password, confirmPassword } = req.body;
//         if (!username || !email || !phone || !password || !confirmPassword) return res.status(400).json({
//             status: "fail",
//             msg: "Please fill all the fields"
//         })
//         if (password === confirmPassword) {
//             const emailExist = await User.findOne({ where: { email } });
//             if (emailExist) {
//                 return res.status(409).json({
//                     status: "fail",
//                     msg: "email already exists"
//                 })
//             }
//             const otp = Math.floor(100000 + Math.random() * 900000);
//             const data = {
//                 username,
//                 email,
//                 phone,
//                 password: await bcrypt.hash(password, salt),
//                 otp,
//                 isVerified: false
//             }
//             sendEmail(email, otp);
//             const response = await User.create(data);
//             if (!response) return res.status(400).json({
//                 status: "fail",
//                 msg: "failed to create user"
//             })
//             return res.status(201).json({
//                 status: "success",
//                 msg: "user created",
//                 email: response.email
//             })
//         }
//         else {
//             return res.status(422).json({
//                 status: "fail",
//                 msg: "password and confirm password does not match"
//             })

//         }
//     } catch (error) {
//         console.log(error.message);
//     }
// }

export const createUser = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;
        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({
                status: "fail",
                msg: "please fill all fields"
            })
        }
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
            if (!response) return res.status(400).json({
                status: "fail",
                msg: "failed to create user"
            })
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


// export const verifyUser = async (req, res) => {
//     try {
//         const email = req.query.email;
//         const { otp } = req.body;
//         if (!email || !otp) return res.status(400).json({
//             status: "fail",
//             msg: "Please fill all the fields"
//         })
//         const user = await User.findOne({ where: { email } });
//         if (user) {
//             if (otp == user.otp) {
//                 const response = await User.update({ isVerified: true, otp: null }, { where: { email } });
//                 if (!response) return res.status(400).json({
//                     status: "fail",
//                     msg: "failed to verify user"
//                 })
//                 return res.status(200).json({
//                     status: "success",
//                     msg: "user verified"
//                 })
//             }
//             else {
//                 return res.status(400).json({
//                     status: "fail",
//                     msg: "Wrong OTP"
//                 })
//             }
//         }
//         else {
//             return res.status(404).json({
//                 status: "fail",
//                 msg: "user does not exist"
//             })
//         }
//     } catch (error) {
//         console.log(error.message);
//     }
// }



export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // const user = await User.findOne({ where: { email, isVerified: true } });
        const user = await User.findOne({ where: { email } });
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const token = jwt.sign({ email: user.email, username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' }); // expires in 1 hour
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
            return res.status(404).json({
                status: "fail",
                msg: "email does not exist or user is not verified"
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

export const predict = async (req, res) => {
    try {
        const file = req.files.imgFile;
        const formData = new FormData();
        formData.append('imgFile', file.data, file.name);
        const response = await axios.post('https://api-ml-bw6dhamona-et.a.run.app/predict', formData, {
            headers: {
                'Content-Type': `multipart/form-data'`,
            }
        });
        const cekProduct = await Product.findAll({ where: { category: response.data.result.class } });
        const dataProduct = cekProduct.map((item) => {
            return {
                name: item.name,
                img: item.img,
                steps: item.steps
            }
        })
        if (cekProduct.length > 0) {
            return res.status(200).json({
                status: "success",
                msg: "product found",
                product: dataProduct
            })
        }
        else {
            return res.status(404).json({
                status: "fail",
                msg: "product not found"
            })
        }
    }
    catch (error) {
        console.log(error.message);
    }

}