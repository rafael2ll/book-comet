import { NotFoundError } from '@core/errors/api-errors'
import { BookModel } from '@db/models'
import findAuthorById from '@usecases/author/find-by-id'
import findPublisherById from '@usecases/publisher/find-by-id'
import { validateUpdateExistence } from './helpers/validators'
import { UpdateBookModel } from './models'

const updateBook = async (model: UpdateBookModel): Promise<void> => {
    const book = await BookModel.findOne({ _id: model.id })
    if (!book) throw new NotFoundError('Book')
    if (model.title || model.authorIds)
        await validateUpdateExistence(
            model,
            book.authors.map((a) => String(a.id))
        )
    const authorsPromise = model.authorIds?.map((aId) => findAuthorById(aId))
    const publisherPromise = model.publisherId
        ? findPublisherById(model.publisherId)
        : undefined

    const dataResponse = await Promise.all([
        ...(authorsPromise || []),
        ...(publisherPromise ? [publisherPromise] : []),
    ])

    const publisher = publisherPromise ? dataResponse.pop() : undefined

    const authors = authorsPromise
        ? dataResponse.map((author) => ({ id: author.id, name: author.name }))
        : undefined

    book.title = model.title ?? book.title
    book.summary = model.summary ?? book.summary
    book.format = model.format ?? book.format
    book.published_year = model.publishedYear ?? book.published_year
    book.title = model.title ?? book.title
    book.updatedAt = new Date()
    if (authors) book.authors = authors
    if (publisher) book.publisher = { id: publisher.id, name: publisher.name }

    await book.save()
}

export default updateBook
