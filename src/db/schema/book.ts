import defaultSerializationOpts from '@core/utils/serialization'
import { Schema, Document } from 'mongoose'
import { mongoosePagination } from 'mongoose-paginate-ts'
import baseFields, { BaseFields } from './base'

export enum BookFormat {
    PAPER = 'paper',
    DIGITAL = 'digital',
}

export interface Book extends Document, BaseFields {
    title: string
    authors: { id: Schema.Types.ObjectId; name: string }[]
    publisher: { id: Schema.Types.ObjectId; name: string }
    published_year: number
    outOfStock: boolean
    format: BookFormat
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
        enum: [BookFormat.PAPER, BookFormat.DIGITAL],
        default: BookFormat.PAPER,
    },
    ...baseFields,
})
bookSchema.plugin(mongoosePagination)
bookSchema.set('toJSON', defaultSerializationOpts)
export default bookSchema
