import { Schema, Document } from 'mongoose'
import { mongoosePagination } from 'mongoose-paginate-ts'
import baseFields from './base'

export interface Book extends Document {
    title: string
    authors: { id: Schema.Types.ObjectId; name: string }[]
    publisher: { id: Schema.Types.ObjectId; name: string }
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
    authors: [{ id: { type: Schema.Types.ObjectId }, name: String }],
    publisher: {
        id: { type: Schema.Types.ObjectId },
        name: String,
    },
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
bookSchema.plugin(mongoosePagination)
export default bookSchema
