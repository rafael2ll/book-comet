import { BadRequestError } from '@errors/api-errors'
import { BookModel } from '@db/models'
import { Book } from '@db/schema/book'
import { createInventoryInternal } from '@usecases/inventory/internal-create'
import findAuthorById from '@usecases/author/find-by-id'
import findPublisherById from '@usecases/publisher/find-by-id'
import { Author } from '@db/schema/author'
import { Publisher } from '@db/schema/publisher'
import validateInsertion from './helpers/validators'
import { CreateBookModel } from './models'

const createBook = async (createBookModel: CreateBookModel): Promise<Book> => {
    await validateInsertion(createBookModel)
    const book = await createBookObject(createBookModel)
    const error = book.validateSync()
    if (error) {
        throw new BadRequestError(
            Object.keys(error.errors)
                .map((k) => error.errors[k].message)
                .join(', ')
        )
    }

    const createdBook = await book.save()
    await createInventoryInternal({
        bookId: createdBook.id,
        quantity: createBookModel.amount,
    })
    return createdBook
}
const createBookObject = async (model: CreateBookModel): Promise<Book> => {
    const authorsPromise = model.authorIds.map((aId) => findAuthorById(aId))
    const publisherPromise = findPublisherById(model.publisherId)
    const dataResponse = await Promise.all([
        ...authorsPromise,
        publisherPromise,
    ])
    const publisher: Publisher = dataResponse.pop()!
    return new BookModel({
        title: model.title,
        summary: model.summary,
        outOfStock: model.amount === 0 ?? true,
        published_year: model.publishedYear,
        publisher: { id: publisher.id, name: publisher.name },
        authors: dataResponse.map((author: Author) => ({
            id: author.id,
            name: author.name,
        })),
        format: model.format,
    })
}

export default createBook
