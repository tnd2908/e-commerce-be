import express, {Router} from 'express'
import { VouncherController } from '../Controller/voucherController';
export const vouncherRouter: Router = express.Router();
vouncherRouter.get('/', VouncherController.getVoucher)
vouncherRouter.post('/:code', VouncherController.getDetail)
vouncherRouter.post('/', VouncherController.createVoucher)