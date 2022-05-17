import mongoose from 'mongoose'
import { model, Schema } from 'mongoose'

const newsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    // author: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Users"
    // },
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
})
const News = model('news', newsSchema)
export default News;