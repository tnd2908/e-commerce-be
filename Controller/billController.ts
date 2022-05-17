import {Request, Response} from 'express'
import User from '../Model/user'
import Bill from '../Model/bill'
import Product from '../Model/product'
export class BillController {
    public static addNewBill = async (req: Request, res: Response) =>{
        try {
            const {name, email, phone, address, delivery, details, total, userId, status, voucher, discount} = req.body
            await Bill.create({
                name,
                email,
                phone,
                address,
                delivery,
                details,
                total,
                status,
                voucher,
                discount,
                userId: userId && userId
            }, async (err, ok) =>{
                if(err){
                    console.log(err)
                    return res.json({
                        success: false,
                        message: 'Add new bill fail'
                    }) 
                }
                else if(ok){
                    if(userId){
                        await User.findByIdAndUpdate(userId, {cart: []})
                        if(status === 'Completed'){
                            details.forEach( async (element : any) => {
                                const data :any = await Product.findOne({name: element.productName})
                                await Product.findOneAndUpdate({name: element.productName}, {quantity: data.quantity - element.quantityInCart, saled: data.saled + element.quantityInCart})
                            });
                        }
                        return res.json({
                            success: true,
                            message: 'Add new bill successfully'
                        })
                    }
                    else return res.json({
                        success: true,
                        message: 'Add new bill successfully'
                    })
                }
            })
        } catch (error) {
            return res.json({
                success: false,
                message: 'Add new bill fail'
            })
        }
    }
    public static getBill = async (req: Request, res: Response) =>{
        try {
            const data = await Bill.find({})
            return res.json({
                data: data.reverse(),
                success: true,
                message: 'Get bill successfully'
            })
        } catch (error) {
            console.log(error)
            return res.json({
                success: false,
                message: 'Get bill fail',
                error
            })
        }
    }
    public static getBillDetail = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const bill: any = await Bill.findById(id)
            if(bill){
                return res.status(200).json({
                    success: true,
                    message: 'Get detail successfully',
                    data: bill
                })
            }
            else return res.json({
                success: false,
                message: 'Get bill fail',
            })
        } catch (error) {
            console.log(error)
            return res.json({
                success: false,
                message: 'Get bill fail',
                error
            })
        }
    }
    public static updateBill = async (req: Request, res: Response) =>{
        try {
            const {status, id, details} = req.body
            await Bill.findByIdAndUpdate(id, {status: status})
            if(status === 'In progress ' && details.length){
                details.forEach( async (element : any) => {
                    const data :any = await Product.findOne({name: element.productName})
                    await Product.findOneAndUpdate({name: element.productName}, {quantity: data.quantity - element.quantityInCart, saled: data.saled + element.quantityInCart})
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Updated successfully'
            })
        } catch (error) {
            console.log(error)
            return res.json({
                success: false,
                message: 'Fail',
                error
            })
        }
    }
    public static getBillByStatus = async (req: Request, res: Response) =>{
        try {
            const {status} = req.params
            const data = await Bill.find({status: status})
            return res.status(200).json({
                success: true,
                message: 'Get order successfully',
                data
            })
        } catch (error) {
            console.log(error)
            return res.json({
                success: false,
                message: 'Fail',
                error
            })
        }
    }
}