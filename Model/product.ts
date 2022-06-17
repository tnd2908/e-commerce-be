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
        required: false,
        type: Number
    },
    rom: {
        required: false,
        type: Number
    },
    category:{
        required: false,
        type: Schema.Types.ObjectId,
        ref: "category"
    },
    brand: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'brand'
    },
    saled:{
        type: Number,
        default: 0
    },
    colors: {
        required: true,
        type: [{
            name: {
                type: String,
                required: true,
            },
            value: {
                type: String,
                required: true,
            }
        }]
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
        required: false
    },
    description: {
        type: String,
        required: false,
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})
const Product = model('Product', productSchema)
export default Product