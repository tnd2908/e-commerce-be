import {Request, Response} from 'express'
import mongoose from 'mongoose'
import Product from '../Model/product'
import {Singleton} from '../Util/function'

export class productController {
    public static getProduct = async (req: Request, res: Response) => {
        try {
            const product = await Product.find({}).populate("category").select('-comment')
            return res.status(200).json({
                success: true,
                message: 'Get product successfully',
                data: product,
            })
        } catch (error) {
            console.log(error)
            return res.json({
                err: error,
                success: false,
                message: 'Get product failed'
            })
        }
    }
    public static getProductDetail = async (req: Request, res: Response) => {
        try {
            const {name} = req.params
            const relatedName = name.split('-')[0]
            const detail: any = await Product.findOne({name}).populate("category")
            const relatedProduct = await Product.find({name: {$regex: relatedName}}).select('-comment')
            let totalStar = 0
            let count = {
                oneStar: 0,
                twoStar: 0,
                threeStar: 0,
                fourStar: 0,
                fiveStar: 0 
            }
            if(detail.comment.length === 1){
                let star = detail.comment[0].star
                totalStar = star/detail.comment.length
            }
            else if(detail.comment.length > 1){
                let star = 0
                detail.comment.map((item: any)=> star += item.star)
                totalStar = star/detail.comment.length
            }
            detail.comment.map((item:any)=>{
                if(item.star == 1){
                    count = {...count, oneStar: count.oneStar + 1}
                }
                else if (item.star == 2){
                    count = {...count, twoStar: count.twoStar + 1}
                }
                else if (item.star == 3){
                    count = {...count, threeStar: count.threeStar + 1}
                }
                else if (item.star == 4){
                    count = {...count, fourStar: count.fourStar + 1}
                }
                else if (item.star == 5){
                    count = {...count, fiveStar: count.fiveStar + 1}
                }
            })
            return res.status(200).json({
                success: true,
                message: 'Get detail successfully',
                data: detail,
                relatedProduct,
                star: totalStar.toFixed(1),
                countStar: count
            })
        } catch (error) {
            console.log(error)
            return res.json({
                err: error,
                success: false,
                message: 'Get product failed'
            })
        }
    }
    public static queryProduct = async (req: Request, res: Response) =>{
        try {
            const {page, color, category}: any = req.query;
            let data = []; 
            if(category !== 'undefined'){
                if(color !== 'null'){
                    data = await Product.find({category, color}).select('-comment')
                }
                else {
                    data = await Product.find({category}).select('-comment')          
                }    
            }
            else {
                if(color !== 'null'){
                    data = await Product.find({color}).select('-comment')
                }
                else data = await Product.find({}).select('-comment')
            }
            const singleton = Singleton.getInstance()
            const product = singleton.pagination(page, data)
            return res.json({
                success: true,
                message: 'Get product success',
                data: product,
                totalPage: Math.ceil((data.length/8))
            })
        } catch (error) {
            return res.json({
                err: error,
                success: false,
                message: 'Get product failed'
            })
        }
    }
    public static getProductByStatus = async (req: Request, res: Response) =>{
        try {
            const {page}: any = req.query || 1;
            const {status} = req.params
            const data = await Product.find({status}).select('-comment')
            const singleton = Singleton.getInstance()
            const product = singleton.pagination(page, data)
            return res.json({
                success: true,
                message: 'Get product success',
                data: product
            })
        } catch (error) {
            return res.json({
                err: error,
                success: false,
                message: 'Get product failed'
            })
        }
    }
    public static addNewProduct = async (req: Request, res: Response) => {
        try {
            const {name, price, images, description, category, quantity, color, status, material, weight, size} = req.body;
            await Product.create({
                name,
                price,
                images,
                description,
                category,
                quantity,
                color,
                status,
                material,
                weight,
                size
            })
            return res.status(200).json({
                success: true,
                message: 'Add new product successfully'
            })
        } catch (error) {
            return res.json({
                err: error,
                success: false,
                message: 'Add product failed'
            })
        }
    }
    public static addNewComment = async (req: Request, res: Response) =>{
        const {userId, userComment, star, userName} = req.body
        const {id} = req.params
        const newComment = [{userId, userName,userComment, star, reply: []}]
        try {
            const oldComment: any = await Product.findById(id, 'comment')
            await Product.findByIdAndUpdate(id, {comment: [...oldComment.comment, ...newComment ]})
            return res.json({
                success: true,
                message: 'Posted your comment',
                data: oldComment
            })
        } catch (error) {
            console.log(error)
            return res.json({
                success: false,
                message: 'Fail to comment'
            })
        }
    }
    public static editProduct = async (req: Request, res: Response) =>{
        const {name, price, quantity, status, category, saleOf, color, description, weight, size, material} = req.body
        const {id} = req.params
        try {
            await Product.findByIdAndUpdate(id, {
                name,
                price,
                status,
                quantity,
                category,
                saleOf,
                color,
                description,
                weight,
                size,
                material
            })
            return res.status(200).json({
                success: true,
                message: 'Updated product successfully'
            })
        } catch (error) {
            console.log(error)
            return res.json({
                success: false,
                message: 'Fail to edit'
            })
        }
    }
    public static getRelatedProduct = async (req: Request, res: Response) =>{
        try {
            const name = req.params.name
            console.log(name)
            const data = await Product.find({}, '-description').select('-comment').populate("category")
            const result = data.filter((item: any)=>{
                return item.category.name === name
            })
            return res.json({
                success: true,
                data: result
            })
        } catch (error) {
            console.log(error)
            return res.json({
                success: false,
                message: 'Fail to edit'
            })
        }
    }
    public static getProductBestSaling = async (req: Request, res: Response) =>{
        try {
            const data = await Product.find({}).sort({saled: -1}).limit(5).select('-comment')
            return res.json({
                success: true,
                data
            })
        } catch (error) {
            console.log(error)
            return res.json({
                success: false,
                message: 'Fail'
            })
        }
    }
}