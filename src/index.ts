require('dotenv').config()
import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose'
import {userRouter} from '../Route/user'
import {uploadRouter} from '../Route/upload'
import {categoryRouter} from '../Route/category'
import {productRouter} from '../Route/product'
import {billRouter} from '../Route/bill'
import {vouncherRouter} from '../Route/vouncher'
import {revenueRouter} from '../Route/revenue'
import newsRoute from "../Route/news";
import http from 'http'
import fileUpload from 'express-fileupload';
import cors from 'cors'
const app: Application = express();
const server = http.createServer(app)
app.use(cors({
    credentials: true,
    origin: 'http://localhost:4200'
}))
app.use(express.json())
app.use(express.static('Public'))
app.use(fileUpload())
const PORT = 5050;

//Create connection
const connectDB = async () =>{
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@angular-ecommerce.phpbgbk.mongodb.net/?retryWrites=true&w=majority`)
        console.log('DB connected')
    } catch (error) {
        console.log(`Errors: ${error}`)
    }
}
connectDB()

app.get('/', (req: Request, res: Response) =>{
    res.send('Hello nodejs')
})
app.use('/auth', userRouter)
app.use('/upload', uploadRouter)
app.use('/product', productRouter)
app.use('/category', categoryRouter)
app.use('/bill', billRouter)
app.use('/voucher', vouncherRouter)
app.use('/revenue', revenueRouter)
app.use("/news", newsRoute);
server.listen(PORT, ()=> console.log(`Server is running on ${PORT}`));
