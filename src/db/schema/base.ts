import { SchemaDefinition } from 'mongoose'

export interface BaseFields {
    createdAt: Date
    updatedAt: Date
    enabled: boolean
}
const baseFields: SchemaDefinition = {
    createdAt: {
        default: Date.now,
        type: Date,
    },
    updatedAt: {
        default: Date.now,
        type: Date,
    },
    enabled: {
        default: true,
        type: Boolean,
    },
}

export default baseFields
