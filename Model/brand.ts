import mongoose from 'mongoose'
import {Schema, model} from 'mongoose'
const brandSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
})
const Brand = model("brand", brandSchema)
export default Brand
