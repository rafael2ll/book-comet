import { Schema, Document } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import baseFields from './base'

export interface Book extends Document {
    title: string
    authors: { id: Schema.Types.ObjectId }[]
    publisher: { id: Schema.Types.ObjectId }
    published_year: number
    outOfStock: boolean
    format: 'paper' | 'digital'
    summary: string
}

const bookSchema = new Schema<Book>({
    title: {
        type: String,
        required: true,
    },
    authors: [{ id: { type: Schema.Types.ObjectId, ref: 'Author' } }],
    publisher: { id: { type: Schema.Types.ObjectId, ref: 'Publisher' } },
    published_year: { type: Number, required: true },
    summary: { type: String, required: false },
    outOfStock: {
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
