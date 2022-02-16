import { Schema, Types } from 'mongoose'

const bookSchema = new Schema({
    id: Types.ObjectId,
    title: String,
    authors: [
        {
            id: Types.ObjectId,
            name: String,
        },
    ],
    publisher: {
        id: Types.ObjectId,
        name: String,
    },
    published_year: Number,
    summary: String,
})

export default bookSchema
