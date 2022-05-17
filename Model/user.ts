import { model, Schema } from "mongoose";
const userSchema = new Schema({
    firstName: {
        type: String
    },
    lastName:{
        type: String
    },
    role:{
        type: String,
        default: null
    },
    email: {
        unique: true,
        type: String,
        required: true
    },
    password: {
        required: true,
        type: String
    },
    gender: {
        required: false,
        type: String
    },
    phone: {
        required: false,
        type: Number
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    history:{
        type: [Schema.Types.ObjectId],
        ref: 'Product',
        required: false
    },
    cart:{
        type: [{
            productId: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                required: false,
                default: 1
            },
        }],
        required: false,
    }
})
const User = model('User', userSchema)


export default User