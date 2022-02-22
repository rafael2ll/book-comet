import { Schema, Types } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

import baseFields from './base'

const authorSchema = new Schema({
    id: Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    ...baseFields,
})
authorSchema.plugin(mongoosePaginate)
export default authorSchema
