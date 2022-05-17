import {Request, Response} from 'express'
import Category from '../Model/category'
export class categoryController{
    public static addCategory = async (req: Request, res: Response) =>{
        try {
            const {name, avatar, gender} = req.body
            await Category.create({
                name,
                avatar,
                gender
            })
            return res.json({
                success: true,
                message: 'Add category successfully'
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
            const categoriesForMen = categories.filter((cate: any)=>cate.gender === 'Men')
            const categoriesForWomen = categories.filter((cate: any)=>cate.gender === 'Women')
            if (categories.length)
            return res.status(200).json({
                success: true,
                message: 'Get category successfully',
                data: {
                    categoriesForMen,
                    categoriesForWomen,
                    categories
                }
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
    public static updateCategory = async (req: Request, res: Response) =>{
        try {
            const {name, gender} = req.body
            const {id} = req.params
            await Category.findByIdAndUpdate(id, {name, gender})
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