import mongoose from 'mongoose'
import {model, Schema} from 'mongoose'

const revenueSchema = new Schema({
    month: {
        required: true,
        type: Number,
    },
    year: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true,
    },
    staffId: {
        required: false,
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})
const Revenue = model('revenue', revenueSchema)
export default Revenue