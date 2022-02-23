import { NotFoundError } from '@core/errors/api-errors'
import usecaseCreateAuthor from '../../core/usecase/author/create'
import usecaseCreatePublisher from '../../core/usecase/publisher/create'
import usecaseCreateBook, {
    usecaseCreateDefaultBook,
} from '../../core/usecase/book/create'

describe('book tests', () => {
    test('should create user sucessfully', async () => {
        const title = 'Some book'
        const { book, author, publisher } = await usecaseCreateDefaultBook(
            title
        )
        expect(book.title).toBe(title)
        expect(String(book.authors[0].id)).toBe(String(author.id))
        expect(String(book.publisher.id)).toBe(String(publisher.id))
    })
    test('should throw exception when author_id is invalid', async () => {
        const title = 'Some book'
        const publisher = await usecaseCreatePublisher()
        await expect(async () => {
            await usecaseCreateBook(title, publisher.id, [publisher.id], 10)
        }).rejects.toThrow(new NotFoundError(`Author '${publisher.id}'`))
    })
    test('should throw exception when publisher_id is invalid', async () => {
        const title = 'Some book'
        const author = await usecaseCreateAuthor()
        await expect(async () => {
            await usecaseCreateBook(title, author.id, [author.id], 10)
        }).rejects.toThrow(new NotFoundError(`Publisher ${author.id}`))
    })
})
