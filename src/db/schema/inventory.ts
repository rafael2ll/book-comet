import { Schema, Types } from 'mongoose'
import baseFields from './base'

const inventorySchema = new Schema({
    id: Types.ObjectId,
    book: {
        type: Types.ObjectId,
        required: true,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    ...baseFields,
})

export default inventorySchema
