import defaultSerializationOpts from '@core/utils/serialization'
import { Schema, Document } from 'mongoose'
import { mongoosePagination } from 'mongoose-paginate-ts'
import baseFields from './base'

export interface Inventory extends Document {
    book: Schema.Types.ObjectId
    amount: number
}
const inventorySchema = new Schema<Inventory>({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
    },
    amount: {
        type: Number,
        default: 0,
        min: 0,
    },
    ...baseFields,
})

inventorySchema.plugin(mongoosePagination)
inventorySchema.set('toJSON', defaultSerializationOpts)

export default inventorySchema
