import { Request, Response } from 'express';
import User from '../Model/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Product from '../Model/product';
import Bill from '../Model/bill';
export class UserController {
    public static userRegister = async (req: Request, res: Response) => {
        const { email } = req.body;
        try {
            const user = await User.findOne({ email })
            if (!user) {
                const password = await bcrypt.hash(req.body.password, 10)
                await User.create({ ...req.body, password });
                return res.status(200).json({
                    success: true,
                    msg: 'User register successful',
                })
            }
            else {
                return res.json({
                    msg: 'Email is already existed'
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    public static userLogin = async (req: Request, res: Response) => {
        const { email, password } = req.body
        try {
            const user: any = await User.findOne({ email })
            const jwtSecret: string = process.env.JWT_SECRET || " "
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: 'Wrong email or Password!'
                })
            }
            else if (user) {
                await bcrypt.compare(password, user.password, (err, same) => {
                    if (same) {
                        const { fullName, email, role, phone, _id } = user
                        const accessToken = jwt.sign({
                            userId: user._id,
                            fullName,
                            email,
                            role,
                            phone,
                        }, jwtSecret)
                        return res.status(200).json({
                            success: true,
                            msg: 'Login successful',
                            accessToken,
                            user: {
                                id: _id,
                                fullName,
                                email,
                                role,
                                phone
                            }
                        })
                    }
                    else
                        return res.json({
                            success: false,
                            msg: 'Wrong email or password!'
                        })
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    public static getUserByJWT = async (req: Request, res: Response) => {
        const header = req.header('Authorization')
        const jwtSecret = process.env.JWT_SECRET || " "
        const token = header && header.split(' ')[1]
        if (!token) {
            return res.json({
                success: false,
                msg: 'Need token'
            })
        }
        try {
            jwt.verify(token, jwtSecret, (err, valid: any) => {
                if (valid.userId && valid.role) {
                    res.json({
                        success: true,
                        validInfor: valid
                    })
                }
            })
        } catch (error) {
            return res.json({
                success: false,
                msg: 'Invalid token'
            })
        }
    }
    public static addToCart = async (req: Request, res: Response) => {
        const { id } = req.params
        const { productId } = req.body
        try {
            const oldCart: any = await User.findById(id, 'cart')
            const condition = oldCart.cart.some((item: any) => item.productId == productId)
            if (condition && oldCart) {
                const newArr = <any>[]
                oldCart.cart.map((item: any) => {
                    if (item.productId == productId) {
                        newArr.push({ productId, quantity: item.quantity + 1 })
                    }
                    else {
                        newArr.push(item)
                    }
                    return newArr
                })
                await User.findByIdAndUpdate(id, {
                    cart: [...newArr]
                })
                return res.json({
                    success: true,
                    message: 'Updatated quantity',
                    res: newArr
                })
            }
            else if (!condition && oldCart) {
                await User.findByIdAndUpdate(id, {
                    cart: [...oldCart.cart, { productId }]
                })
                return res.status(200).json({
                    success: true,
                    message: 'Add success',
                })
            }
        } catch (error) {
            console.log(error)
            return res.json({
                success: false,
                message: 'Add fail',
                error: error
            })
        }
    }
    public static getCart = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const data: any = await User.findById(id).select('cart -_id')
            const productArray = data.cart.map((item: any) => item.productId)
            const cart = await Product.find({ _id: { $in: productArray } }, 'name price quantity images saleOf')
            const userCart = <any>[]
            data.cart.map((item: any) => {
                cart.map((product: any) => {
                    if (item.productId.toString() === product._id.toString()) {
                        const { _id, name, price, quantity, images, saleOf } = product
                        const newObj = { _id, name, price, quantity, images, quantityInCart: item.quantity, saleOf }
                        userCart.push(newObj)
                    }
                })
            })
            return res.json({
                success: true,
                message: 'Get user shopping cart successfully',
                data: userCart
            })
        } catch (error) {
            console.log(error)
            return res.json({
                success: false,
                message: 'Get cart fail',
                error: error
            })
        }
    }
    public static removeItem = async (req: Request, res: Response) => {
        const { id } = req.params
        const { productId } = req.body
        try {
            const data: any = await User.findById(id, 'cart')
            if (data.cart.length) {
                const cart = data.cart.filter((item: any) => {
                    if (item.productId !== productId) {
                        return item
                    }
                })
                await User.findByIdAndUpdate(id, { cart: [...cart] })
                return res.status(200).json({
                    success: true,
                    message: 'Removed item',
                })
            }
            else return res.json({
                success: false,
                message: 'Update fail'
            })
        } catch (error) {
            console.log(error)
            return res.json({
                success: false,
                message: 'Update cart fail',
                error: error
            })
        }
    }
    public static getHistory = async (req: Request, res: Response) => {
        const {id} = req.params;
        try {
            const data = await Bill.find({userId: id})
            if(data.length){
                return res.status(200).json({
                    success: true,
                    messsage: "Get history successfully",
                    data: data.reverse()
                })
            }
            else return res.status(200).json({
                success: true,
                message: "Empty"
            })
        } catch (error) {
            console.log(error)
            return res.json({
                success: false,
                error
            })
        }
    }
    public static changePassword = async (req: Request, res: Response) =>{
        const {id} = req.params
        const {oldPassword, password} = req.body
        try {
            const user :any = await User.findById(id, 'password')
            await bcrypt.compare(oldPassword, user.password, async (err, same) =>{
                if(same){
                    const newPassword = await bcrypt.hash(password, 10)
                    await User.findByIdAndUpdate(id, {password: newPassword})
                    return res.status(200).json({
                        success: true,
                        message: 'Updated your password'
                    })
                }
                else if(err){
                    return res.json({
                        success: false,
                        message: 'Wrong password, please try again!'
                    })
                }
            })
        } catch (error) {
            return res.json({
                success: false,
                message: 'Fail to change password'
            })
        }
    }
    public static changeInfor = async (req: Request, res: Response) =>{
        const {id} = req.params
        const {fullName, phone, password} = req.body
        try {
            const user :any = await User.findById(id)
            await bcrypt.compare(password, user.password, async (err, same) =>{
                if(same){
                    await User.findByIdAndUpdate(id, {fullName, phone})
                    return res.status(200).json({
                        success: true,
                        message: 'Updated your information'
                    })
                }
                else if(err){
                    return res.json({
                        success: false,
                        message: 'Wrong password, please try again!'
                    })
                }
            })
        } catch (error) {
            return res.json({
                success: false,
                message: 'Fail to update information'
            })
        }
    }

    public static refreshToken = async (req: Request, res: Response) => {
        const {userId} = req.params
        const jwtSecret: string = process.env.JWT_SECRET || " "
        const user :any = await User.findById(userId)
        try {
            const refreshToken = jwt.sign({
                userId: user._id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                role: user.role,
            }, jwtSecret)
            return res.status(200).json({
                success: true,
                refreshToken
            })
        } catch (error) {
            res.json({
                success: false,
                message: error
            })
        }
    }
}