import { Schema, Types } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import baseFields from './base'

const bookSchema = new Schema({
    id: Types.ObjectId,
    title: {
        type: String,
        required: true,
    },
    authors: [
        {
            id: { type: Types.ObjectId, required: true },
            name: { type: String, required: true },
        },
    ],
    publisher: {
        id: { type: Types.ObjectId, required: true },
        name: { type: String, required: true },
    },
    published_year: { type: Number, required: true },
    summary: { type: String, required: false },
    outOfStack: {
        type: Boolean,
        default: false,
    },
    format: {
        type: String,
        enum: ['paper', 'digital'],
        default: 'paper',
    },
    ...baseFields,
})
bookSchema.plugin(mongoosePaginate)
export default bookSchema
