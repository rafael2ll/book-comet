import { Schema, Types } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import baseFields from './base'

const publisherSchema = new Schema({
    id: Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    ...baseFields,
})

publisherSchema.plugin(mongoosePaginate)
export default publisherSchema
