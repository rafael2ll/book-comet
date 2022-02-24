import { BookModel } from '@db/models'
import { NotFoundError } from '@core/errors/api-errors'
import publisher from '@db/schema/publisher'
import usecaseDeleteBook from '../../core/usecase/book/delete'
import { usecaseCreateDefaultBook } from '../../core/usecase/book/create'

describe('delete book tests', () => {
    test('should delete book successfully when id exists', async () => {
        const { book } = await usecaseCreateDefaultBook()
        expect(await BookModel.count()).toBe(1)
        await usecaseDeleteBook(book.id)
        expect(await BookModel.count()).toBe(0)
    })
    test('should throw exception when book id is invalid', async () => {
        const fakeId = 'abcdedfghijk'

        await expect(async () => {
            await usecaseDeleteBook(fakeId)
        }).rejects.toThrow(new NotFoundError(`Book ${fakeId}`))
    })
})
