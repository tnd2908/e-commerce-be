import express from 'express'
import {Router} from 'express'
import {BillController} from '../Controller/billController'
export const billRouter: Router = express.Router()

billRouter.post('/add', BillController.addNewBill)
billRouter.get('/', BillController.getBill)
billRouter.get('/status/:status', BillController.getBillByStatus)
billRouter.get('/:id', BillController.getBillDetail)
billRouter.put('/update', BillController.updateBill)