import { Document, Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

import baseFields from './base'

export interface Author extends Document {
    name: string
}
const authorSchema = new Schema<Author>({
    name: {
        type: String,
        required: true,
    },
    ...baseFields,
})
authorSchema.plugin(mongoosePaginate)
export default authorSchema
