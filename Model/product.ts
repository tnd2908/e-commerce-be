import { model, Schema } from "mongoose";

const productSchema: Schema = new Schema({
    name: {
        required: true, 
        type: String
    },
    price: {
        required: true, 
        type: Number
    },
    images:{
        type: [String],
        required: true
    },
    ram: {
        required: true,
        type: String
    },
    rom: {
        required: true,
        type: String
    },
    frontCamera:{
        require: true,
        type: String
    },
    camera: {
        required: true,
        type: String
    },
    category:{
        required: true,
        type: Schema.Types.ObjectId,
        ref: "category"
    },
    saled:{
        type: Number,
        default: 0
    },
    color: {
        required: true,
        type: String
    },
    totalQuantity: {
        required: true,
        type: Number
    },
    saleOf: {
        type: Number,
        default: 0
    },
    status:{
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})
const Product = model('Product', productSchema)
export default Product