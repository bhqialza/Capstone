import express from 'express';
import { createUser, getUsers, loginUser } from '../controller/userController.js';
import authenticateToken from '../middleware/auth.js';
const Router = express.Router();

Router.post('/register', createUser);
Router.get('/getUsers', getUsers);
Router.post('/login', loginUser);
Router.get('/profile', authenticateToken, (req, res) => {
    res.send(req.user);
});

export default Router;