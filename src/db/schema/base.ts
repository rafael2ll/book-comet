import { SchemaDefinition } from 'mongoose'

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
