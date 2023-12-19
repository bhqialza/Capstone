import dbFirestore from "../middleware/dbFirestore.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import axios from "axios";
import FormData from "form-data";

dotenv.config();
const saltRounds = process.env.SALT || 10;
const salt = bcrypt.genSaltSync(saltRounds);
export const createUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({
        status: "fail",
        msg: "please fill all fields",
      });
    }
    if (password === confirmPassword) {
      const emailExist = await dbFirestore.collection("users").doc(email).get();
      if (emailExist.exists) {
        return res.status(400).json({
          status: "fail",
          msg: "email already exist",
        });
      }
      const data = {
        username,
        email,
        password: await bcrypt.hash(password, salt),
      };
      const docRef = await dbFirestore.collection("users").doc(email).set(data);
      if (!docRef)
        return res.status(400).json({
          status: "fail",
          msg: "failed to create user",
        });
      return res.status(201).json({
        status: "success",
        msg: "user created",
      });
    } else {
      return res.status(400).json({
        status: "fail",
        msg: "password and confirm password does not match",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await dbFirestore.collection("users").doc(email).get();
    if (user.exists) {
      const match = await bcrypt.compare(password, user.data().password);
      if (match) {
        const token = jwt.sign(
          { email: user.data().email, username: user.data().username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "7d" }
        );
        return res.status(200).json({
          status: "success",
          msg: "login successful",
          token,
        });
      } else {
        return res.status(400).json({
          status: "fail",
          msg: "password does not match",
        });
      }
    } else {
      return res.status(404).json({
        status: "fail",
        msg: "email does not exist or user is not verified",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = [];
    const snapshot = await dbFirestore.collection("users").get();
    snapshot.forEach((doc) => {
      const { username, email } = doc.data();
      users.push({ username, email });
    });
    return res.status(200).json({
      status: "success",
      users,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const predict = async (req, res) => {
  try {
    const file = req.files.imgFile;
    const email = req.user.email;
    const formData = new FormData();
    formData.append("imgFile", file.data, file.name);
    const response = await axios.post(
      "https://api-ml-bw6dhamona-et.a.run.app/predict",
      formData,
      {
        headers: {
          "Content-Type": `multipart/form-data'`,
        },
      }
    );
    if (response.data.result.confidence < 0.7) {
      return res.status(400).json({
        status: "fail",
        msg: "Mohon Maaf, gambar yang anda masukan tidak dapat diproses",
      });
    }
    const category = response.data.result.class;
    const cekProduct = await dbFirestore
      .collection("products")
      .where("category", "==", category)
      .get();
    if (cekProduct.empty) {
      return res.status(404).json({
        status: "fail",
        msg: "Mohon Maaf, gambar yang anda masukan tidak dapat diproses",
      });
    } else {
      const products = [];
      cekProduct.forEach((doc) => {
        products.push(doc.data());
      });

      const data = {
        email,
        category,
        date: new Date(),
        product: products,
      };
      const docRef = await dbFirestore.collection("history").add(data);
      if (!docRef)
        return res.status(400).json({
          status: "fail",
          msg: "failed to add history",
        });

      return res.status(200).json({
        status: "success",
        products,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const historyPredict = async (req, res) => {
  try {
    const email = req.user.email;
    const history = [];
    const snapshot = await dbFirestore
      .collection("history")
      .where("email", "==", email)
      .get();
    if (snapshot.empty) {
      return res.status(404).json({
        status: "fail",
        msg: "history not found",
      });
    }
    snapshot.forEach((doc) => {
      history.push(doc.data());
    });
    const data = [];
    history.forEach((doc) => {
      const { date, product } = doc;
      data.push({ date: date.toDate(), product });
    });
    return res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const profileUser = async (req, res) => {
  try {
    const email = req.user.email;
    const user = await dbFirestore.collection("users").doc(email).get();
    if (user.exists) {
      const { username, email } = user.data();
      return res.status(200).json({
        status: "success",
        data: { username, email },
      });
    } else {
      return res.status(404).json({
        status: "fail",
        msg: "user not found",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
