import { Schema, Document } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import baseFields from './base'

export interface Publisher extends Document {
    name: string
}
const publisherSchema = new Schema<Publisher>({
    name: {
        type: String,
        required: true,
    },
    ...baseFields,
})

publisherSchema.plugin(mongoosePaginate)
export default publisherSchema
