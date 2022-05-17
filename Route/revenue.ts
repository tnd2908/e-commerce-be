import express, {Router} from 'express'
import { RevenueController } from '../Controller/revenueController';
import {checkToken} from '../Middleware/authentication'
export const revenueRouter : Router = express.Router();
revenueRouter.post('/add', checkToken, RevenueController.addRevenue)
revenueRouter.get('/:year', checkToken, RevenueController.getRevenue)

