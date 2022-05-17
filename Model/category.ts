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
})
const Category = model("category", categorySchema)
export default Category
