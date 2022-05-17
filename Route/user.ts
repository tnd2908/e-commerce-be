import express from 'express';
import { Router } from 'express';
import {UserController} from '../Controller/userController'
import {checkUserToken} from '../Middleware/authentication'
export const userRouter: Router = express.Router();

userRouter.post('/register', UserController.userRegister)
userRouter.post('/login', UserController.userLogin)
userRouter.post('/cart/:id', UserController.addToCart)
userRouter.get('/cart/:id', UserController.getCart)
userRouter.put('/cart/:id', UserController.removeItem)
userRouter.get('/', UserController.getUserByJWT)
userRouter.get('/history/:id', checkUserToken, UserController.getHistory)
userRouter.put('/update/password/:id', checkUserToken, UserController.changePassword)
userRouter.put('/update/information/:id', checkUserToken, UserController.changeInfor)