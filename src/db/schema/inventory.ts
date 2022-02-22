import { Schema } from 'mongoose'
import baseFields from './base'

export interface Inventory {
    book: Schema.Types.ObjectId
    quantity: number
}
const inventorySchema = new Schema<Inventory>({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
    },
    quantity: {
        type: Number,
        default: 0,
    },
    ...baseFields,
})

export default inventorySchema
