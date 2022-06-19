import mongoose from 'mongoose'
import {Schema, model} from 'mongoose'
const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: 'main'
    }
})
const Category = model("category", categorySchema)
export default Category
