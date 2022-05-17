import { Request, Response } from 'express'
import Voucher from '../Model/Voucher'
export class VouncherController {
    public static createVoucher = async (req: Request, res: Response) => {
        try {
            const { name, code, startDate, endDate, applyFor, discount, quantity, description } = req.body
            await Voucher.create({ name, code, startDate, endDate, applyFor, discount, quantity, description })
            return res.status(200).json({
                success: true,
                message: "Created vouncher successfully"
            })
        } catch (error) {
            return res.json({
                error
            })
        }
    }
    public static getVoucher = async (req: Request, res: Response) => {
        try {
            const data = await Voucher.find({})
            return res.status(200).json({
                success: true,
                message: "Get vouncher successfully",
                data
            })
        } catch (error) {
            return res.json({
                error
            })
        }
    }
    public static getDetail = async (req: Request, res: Response) => {
        try {
            const { code } = req.params
            const total = parseInt(req.body.total)
            const data:any = await Voucher.findOne({ code })
            console.log(total)
            if (total > data.applyFor) {
                return res.status(200).json({
                    success: true,
                    message: 'Apply voucher success',
                    data
                })
            }
            if(total < data.applyFor){
                return res.json({
                    success: false,
                    message: 'This voucher is not suitable for your order',
                })
            }
            if(!data) return res.json({
                success: false,
                message: 'Wrong voucher',
            })
        } catch (error) {
            return res.json({
                error
            })
        }
    }
}