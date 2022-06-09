import { Request, Response } from 'express'
import Brand from '../Model/brand'
export class BrandController{
    public static addBrand = async (req: Request, res: Response) =>{
        try {
            const {name, logo} = req.body
            const cate = await Brand.findOne({name})
            if (cate) {
                return res.json({
                    success: false,
                    msg: 'Loại sản phẩm này đã tồn tại '
                })
            }
            await Brand.create({
                name,
                logo,
            })
            return res.json({
                success: true,
                message: 'Thêm loại sản phẩm thành công'
            })
        } catch (error) {
            res.json({
                success: false,
                message: 'Add category failed'
            })
        }
    }
    public static getBrand = async (req: Request, res: Response) =>{
        try {
            const brands = await Brand.find({})
            return res.status(200).json({
                success: true,
                msg: 'Get category successfully',
                brands
            })
        } catch (error) {
            res.json({
                success: false,
                message: 'Get category failed'
            })
        }
    }
    public static getBrandDetail = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const brand = await Brand.findById(id);
            if (brand) {
                return res.json({
                    success: true,
                    brand
                })
            } return res.json({
                success: false,
                msg: 'Loại sản phẩm này không tồn tại'
            })
        } catch (error) {
            console.log(error);
        }
    }
    public static updateBrand = async (req: Request, res: Response) =>{
        try {
            const {name, gender} = req.body
            const {id} = req.params
            await Brand.findByIdAndUpdate(id, {name, gender})
            return res.json({
                success: true,
                message: 'Updated category successfully'
            })
        } catch (error) {
            res.json({
                success: false,
                message: 'Add category failed'
            })
        }
    }
}