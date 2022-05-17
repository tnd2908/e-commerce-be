import { model, Schema } from "mongoose";

const schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true,
    },
    applyFor:{
        type: Number,
        required: false,
        default: 0,
    },
    discount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})
const Voucher = model("voucher", schema);
export default Voucher;