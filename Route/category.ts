import express from 'express'
import {Router} from 'express'
import { categoryController } from '../Controller/categoryController'
import {checkToken} from '../Middleware/authentication'
export const categoryRouter: Router = express.Router()

categoryRouter.post('/',checkToken, categoryController.addCategory)
categoryRouter.get('/', categoryController.getCategory)