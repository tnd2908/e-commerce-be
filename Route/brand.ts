import express from 'express'
import {Router} from 'express'
import { BrandController } from '../Controller/brandController'
import {checkToken} from '../Middleware/authentication'
export const brandRouter: Router = express.Router()

brandRouter.post('/', BrandController.addBrand)
brandRouter.get('/', BrandController.getBrand)
brandRouter.get('/:id', BrandController.getBrandDetail)