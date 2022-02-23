import createBook from '@usecases/book/create'
import usecaseCreateAuthor from '../author/create'
import usecaseCreatePublisher from '../publisher/create'

type Format = 'paper' | 'digital'
const usecaseCreateBook = async (
    title: string,
    publisherId: string,
    authorIds: string[],
    amount = 10,
    format: Format = 'paper'
) => {
    return createBook({
        title,
        summary: 'Some summary info',
        format,
        publishedYear: 2000,
        publisherId,
        authorIds,
        amount,
    })
}

export const usecaseCreateDefaultBook = async (
    title = 'Sample book',
    amount = 10,
    format: Format = 'paper'
) => {
    const author = await usecaseCreateAuthor()
    const publisher = await usecaseCreatePublisher()
    const book = await usecaseCreateBook(
        title,
        publisher.id,
        [author.id],
        amount,
        format
    )
    return { book, publisher, author }
}
export default usecaseCreateBook
