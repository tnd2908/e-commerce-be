import * as express from 'express';
import { Router} from 'express'
import { productController } from '../Controller/productController';
import {checkToken} from '../Middleware/authentication'
export const productRouter: Router = express.Router()

productRouter.get('/', productController.getProduct)
productRouter.get('/query', productController.queryProduct)
productRouter.get('/:name', productController.getProductDetail)
productRouter.get('/status/:status', productController.getProductByStatus)
productRouter.post('/add-new',checkToken , productController.addNewProduct)
productRouter.post('/comment/:id', productController.addNewComment)
productRouter.put('/:id', checkToken, productController.editProduct)
productRouter.get('/name/:name', productController.getRelatedProduct)
productRouter.get('/sale/best-saling', productController.getProductBestSaling)

