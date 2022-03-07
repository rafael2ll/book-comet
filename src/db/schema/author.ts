import defaultSerializationOpts from '@core/utils/serialization'
import { Document, Schema } from 'mongoose'
import { mongoosePagination } from 'mongoose-paginate-ts'

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
authorSchema.plugin(mongoosePagination)
authorSchema.set('toJSON', defaultSerializationOpts)
export default authorSchema
