import { BadRequestError, ConflictError } from '@errors/api-errors'
import { BookModel } from '@db/models'
import { Author } from '@db/schema/author'
import { Schema } from 'mongoose'
import { Book } from '@db/schema/book'

export interface CreateBookModel {
    name: string
    authorIds: string[]
    publisherId: string
    publishedYear: number
    summary: string
    quantity: number
    format: 'paper' | 'digital'
}

const createBook = async (createBookModel: CreateBookModel): Promise<Book> => {
    await validateExistence(createBookModel)
    const book = createBookObject(createBookModel)
    const error = book.validateSync()
    if (error) {
        throw new BadRequestError(
            Object.keys(error.errors)
                .map((k) => error.errors[k].message)
                .join(', ')
        )
    }
    return book.save()
}

const createBookObject = (model: CreateBookModel): Book => {
    return new BookModel({
        name: model.name,
        summary: model.summary,
        outOfStock: model.quantity === 0,
        published_year: model.publishedYear,
        publisher: new Schema.Types.ObjectId(model.publisherId),
        authors: model.authorIds.map((aId) => new Schema.Types.ObjectId(aId)),
        format: model.format,
    })
}
const validateExistence = async (model: CreateBookModel): Promise<void> => {
    const exists = await BookModel.exists({
        name: model.name,
        authors: { $all: model.authorIds },
    })
    if (exists) throw new ConflictError('Book')
}

export default createBook
