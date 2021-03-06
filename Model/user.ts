import { model, Schema } from "mongoose";
const userSchema = new Schema({
    fullName: {
        type: String
    },
    role:{
        type: String,
        default: 'USER'
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
    phone: {
        required: false,
        type: String
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
})
const User = model('User', userSchema)


export default User