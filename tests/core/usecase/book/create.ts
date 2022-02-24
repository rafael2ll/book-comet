import { Book, BookFormat } from '@db/schema/book'
import createBook from '@usecases/book/create'
import usecaseCreateAuthor from '../author/create'
import usecaseCreatePublisher from '../publisher/create'

const usecaseCreateBook = async (
    title: string,
    publisherId: string,
    authorIds: string[],
    amount = 10,
    format = BookFormat.PAPER
): Promise<Book> => {
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
    format = BookFormat.PAPER
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

export const usecaseCreateNBooks = async (
    title = 'Sample Book:',
    n = 1,
    authorId: string | undefined = undefined,
    publisherId: string | undefined = undefined
) => {
    const author = authorId ?? (await usecaseCreateAuthor()).id
    const publisher = publisherId ?? (await usecaseCreatePublisher()).id

    const books = await Promise.all(
        Array(n)
            .fill(0)
            .map((_, index) =>
                usecaseCreateBook(`${title} ${index + 1}`, publisher, [author])
            )
    )
    return { author, publisher, books }
}
export default usecaseCreateBook
