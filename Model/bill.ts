import {model, Schema} from 'mongoose'
const productInBill = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "products",
        require: true
    },
    quantityInCart: {
        type: Number,
        required: true
    },
    cost:{
        type: Number,
        required: true
    },
    productName: {
        type: String,
        required: true
    }
})
const billSchema = new Schema({
    total: {
        type: Number,
        required: true
    },
    details: {
        type: [productInBill],
        require: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: false
    },
    name: {
        type: String,
        required: false
    },
    phone: {
        type: Number,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    status:{
        type: String,
        default: 'Waiting'
    },
    delivery: {
        type: Number,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    discount: {
        type: Number,
        default: 0
    },
    voucher: {
        type: String,
        require: false
    }
})
const Bill = model('bill', billSchema)
export default Bill