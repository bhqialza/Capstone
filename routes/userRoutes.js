import express from "express";
import {
  createUser,
  getUsers,
  loginUser,
  predict,
  historyPredict,
  profileUser,
} from "../controller/userController.js";
import { addProduct } from "../controller/productController.js";
import authenticateToken from "../middleware/auth.js";
const Router = express.Router();

Router.post("/register", createUser);
// Router.get("/getUsers", getUsers);
Router.post("/login", loginUser);
Router.get("/profile", authenticateToken, profileUser);
Router.post("/predict", authenticateToken, predict);
Router.post("/addproduct", addProduct);
Router.get("/history", authenticateToken, historyPredict);

export default Router;
