import { ConflictError } from '@core/errors/api-errors'
import findBookById from '@usecases/book/find-by-id'
import updateBook from '@usecases/book/update'
import usecaseCreateBook, {
    usecaseCreateDefaultBook,
} from '../../core/usecase/book/create'
import usecaseUpdateBook from '../../core/usecase/book/update'

describe('update book tests', () => {
    const title = 'New Book Name'
    const summary = 'New Summary'
    const publishedYear = 2020

    test('should update book successfully when id is valid', async () => {
        const { book } = await usecaseCreateDefaultBook()
        await usecaseUpdateBook({
            id: book.id,
            title,
            publishedYear,
            summary,
        })
        const updatedBook = await findBookById(book.id)
        expect(updatedBook.title).toBe(title)
        expect(updatedBook.summary).toBe(summary)
        expect(updatedBook.published_year).toBe(publishedYear)
    })

    test('should throw conflict when update author and title matching a book that already exists', async () => {
        const { book, author, publisher } = await usecaseCreateDefaultBook()
        const otherBook = await usecaseCreateBook('Other Book', publisher.id, [
            author.id,
        ])

        await expect(async () => {
            await updateBook({
                id: book.id,
                title: otherBook.title,
                publishedYear,
                summary,
            })
        }).rejects.toThrow(new ConflictError('Book'))
    })
})
