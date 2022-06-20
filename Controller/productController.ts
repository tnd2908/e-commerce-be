import {Request, Response} from 'express'
import mongoose from 'mongoose'
import Product from '../Model/product'
import {Singleton} from '../Util/function'

export class productController {
    public static getProduct = async (req: Request, res: Response) => {
        try {
            const product = await Product.find({}).populate("category").populate('brand').limit(12)
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
    public static getProductDetailByName = async (req: Request, res: Response) => {
        try {
            const {name} = req.params;
            const arr = name.split(" ")
            const relatedName = arr.slice(0, arr.length - 1).join(" ")
            const detail = await Product.findOne({name}).populate('brand').populate('category')
            const relatedProduct = await Product.find({name: {$regex: relatedName}})
            const model = relatedProduct.map((item : any) => {
                return {
                    rom: item.rom,
                    link: relatedName+' '+item.rom
                }
            })            
            return res.json({
                success: true,
                data: {
                    detail,
                    relatedProduct,
                    model
                }
            })
        } catch (error) {
            console.log(error);
            return res.json({
                success: false,
                msg: error
            })
        }
    }
    public static getProductDetail = async (req: Request, res: Response) => {
        try {
            const {id} = req.params
            const detail: any = await Product.findById(id).populate("category").populate('brand')
            return res.status(200).json({
                success: true,
                message: 'Get detail successfully',
                data: detail,
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
            const {name, price, images, description, category, totalQuantity, colors, ram, rom, brand} = req.body;
            rom.map(async (item : any, index: number) => {
                const data = {
                    name: name + ' ' + item + 'GB',
                    images,
                    description,
                    category,
                    brand,
                    colors,
                    totalQuantity: totalQuantity[index],
                    price: price[index],
                    ram: ram[index],
                    rom: item
                }
                await Product.create(data)
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
        const {name, price, totalQuantity, ram, rom, category, brand, colors, description, images } = req.body
        const {id} = req.params
        try {
            await Product.findByIdAndUpdate(id, {
                name,
                price,
                totalQuantity,
                category,
                brand,
                colors,
                description,
                ram,
                rom,
                images
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
            const data = await Product.find({}).sort({saled: -1}).limit(5)            
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
    public static deleteProduct = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await Product.findByIdAndDelete(id)
            return res.json({
                success: true,
                msg: 'Deleted product successfully'
            })
        } catch (error) {
            return res.json({
                success: false,
                message: 'Fail'
            })
        }
    }
}