import {Request, Response} from 'express'
import Revenue from '../Model/Revenue'

export class RevenueController {
    public static addRevenue = async (req: Request, res: Response) =>{
        const {month, year, staffId, total} = req.body
        try {
            await Revenue.create({month, year, staffId, total})
            return res.status(200).json({
                success: true,
                message: 'Added revenue successfully'
            })
        } catch (error) {
            console.log(error)
            return res.json({
                success: false,
                error
            })
        }
    }
    public static getRevenue = async (req: Request, res: Response) =>{
        try {
            const {year} = req.params
            const data = await Revenue.find({year})
            return res.status(200).json({
                success: true,
                message: 'Get revenue successfully',
                data
            })
        } catch (error) {
            console.log(error)
            return res.json({
                success: false,
                error
            })
        }
    }
}