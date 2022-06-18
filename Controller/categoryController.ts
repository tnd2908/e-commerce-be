import {Request, Response} from 'express'
import Category from '../Model/category'
export class categoryController{
    public static addCategory = async (req: Request, res: Response) =>{
        try {
            const {name, icon} = req.body
            const cate = await Category.findOne({name})
            if (cate) {
                return res.json({
                    success: false,
                    msg: 'Loại sản phẩm này đã tồn tại '
                })
            }
            await Category.create({
                name,
                icon,
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
    public static getCategory = async (req: Request, res: Response) =>{
        try {
            const categories = await Category.find({})
            if (categories.length)
            return res.status(200).json({
                success: true,
                msg: 'Get category successfully',
                categories
            })
            else return res.json({
                success: false,
                message: 'Get category failed'
            })
        } catch (error) {
            res.json({
                success: false,
                message: 'Get category failed'
            })
        }
    }
    public static getCategoryDetail = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const category = await Category.findById(id);
            if (category) {
                return res.json({
                    success: true,
                    category
                })
            } return res.json({
                success: false,
                msg: 'Loại sản phẩm này không tồn tại'
            })
        } catch (error) {
            console.log(error);
        }
    }
    public static updateCategory = async (req: Request, res: Response) =>{
        try {
            const {name, type} = req.body
            const {id} = req.params
            await Category.findByIdAndUpdate(id, {name, type})
            return res.json({
                success: true,
                message: 'Updated category successfully'
            })
        } catch (error) {
            console.log(error);
            
            res.json({
                success: false,
                message: 'Add category failed'
            })
        }
    }
}