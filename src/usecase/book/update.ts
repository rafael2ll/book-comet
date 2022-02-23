import { Publisher } from '@db/schema/publisher'
import findAuthorById from '@usecases/author/find-by-id'
import findPublisherById from '@usecases/publisher/find-by-id'
import findBookById from './find-by-id'
import { UpdateBookModel } from './models'

const updateBook = async (model: UpdateBookModel): Promise<void> => {
    const book = await findBookById(model.id)
    const authorsPromise = model.authorIds?.map((aId) => findAuthorById(aId))
    const publisherPromise = model.publisherId
        ? findPublisherById(model.publisherId)
        : undefined
    const dataResponse = await Promise.all([
        ...(authorsPromise && authorsPromise!),
        ...(publisherPromise && [publisherPromise]),
    ])
    const publisher: Publisher = publisherPromise
        ? dataResponse.pop()!
        : undefined

    const authors = authorsPromise
        ? dataResponse.map((author) => ({ id: author.id, name: author.name }))
        : undefined

    book.title = model.title ?? book.title
    book.summary = model.summary ?? book.summary
    book.format = model.format ?? book.format
    book.published_year = model.publishedYear ?? book.published_year
    book.title = model.title ?? book.title
    if (authors) book.authors = authors
    if (publisher) book.publisher = { id: publisher.id, name: publisher.name }
    await book.save()
}

export default updateBook
