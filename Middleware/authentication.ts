import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
export const checkToken = (req: Request, res: Response, next: NextFunction) =>{
    const header = req.header('Authorization')
    const jwtSecret = process.env.JWT_SECRET || " "
    const token = header && header.split(' ')[1]
    if(!token){
        return res.json({
            success: false,
            message: 'Access token not found'
        })
    }
    try {
        jwt.verify(token, jwtSecret, (err, valid: any) =>{
            if (valid.role === 'admin' && valid.userId)
            next()
        })
    } catch (error) {
        return res.json({
            success: false,
            message: 'Invalid token'
        })
    }
}
export const checkUserToken = (req: Request, res: Response, next: NextFunction) =>{
    const header = req.header('Authorization')
    const jwtSecret = process.env.JWT_SECRET || " "
    const token = header && header.split(' ')[1]
    if(!token){
        return res.json({
            success: false,
            message: 'Access token not found'
        })
    }
    try {
        jwt.verify(token, jwtSecret, (err, valid: any) =>{
            if (valid.role === 'customer' && valid.userId)
            next()
        })
    } catch (error) {
        return res.json({
            success: false,
            message: 'Invalid token'
        })
    }
}