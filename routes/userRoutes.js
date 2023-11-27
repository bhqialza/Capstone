import express from 'express';
import { createUser, getUsers, loginUser, verifyUser } from '../controller/userController.js';
import authenticateToken from '../middleware/auth.js';
const Router = express.Router();

Router.post('/register', createUser);
Router.get('/getUsers', authenticateToken, getUsers);
Router.post('/login', loginUser);
// Router.post('/verify', verifyUser);
Router.get('/profile', authenticateToken, (req, res) => {
    res.send(req.user);
});
export default Router;