import defaultSerializationOpts from '@core/utils/serialization'
import { Schema, Document } from 'mongoose'
import { mongoosePagination } from 'mongoose-paginate-ts'
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

publisherSchema.plugin(mongoosePagination)
publisherSchema.set('toJSON', defaultSerializationOpts)
export default publisherSchema
