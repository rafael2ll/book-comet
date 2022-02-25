import findBookById from '@usecases/book/find-by-id'
import { BadRequestError } from '@core/errors/api-errors'
import {
    usecaseAddFixedAmount,
    usecaseIncreaseBookInventory,
    usecaseDecreaseBookInventory,
} from '../../core/usecase/inventory/manipulate'
import { usecaseCreateDefaultBook } from '../../core/usecase/book/create'

describe('inventory manipulation tests', () => {
    test('should add fixed amount to book inventory sucessfully', async () => {
        const defaultAmount = 10
        const plusAmount = 20
        const { book } = await usecaseCreateDefaultBook(
            'Sample Book',
            defaultAmount
        )
        await usecaseAddFixedAmount(book.id, plusAmount)
        const updatedBook = await findBookById(book.id, true)
        expect(updatedBook.amount).toBe(defaultAmount + plusAmount)
    })
    test('should increase inventory sucessfully', async () => {
        const amount = 10
        const { book } = await usecaseCreateDefaultBook('Sample Book', amount)
        await usecaseIncreaseBookInventory(book.id)
        const updatedBook = await findBookById(book.id, true)
        expect(updatedBook.amount).toBe(amount + 1)
    })
    test('should decrease inventory sucessfully', async () => {
        const amount = 10
        const { book } = await usecaseCreateDefaultBook('Sample Book', amount)
        await usecaseDecreaseBookInventory(book.id)
        const updatedBook = await findBookById(book.id, true)
        expect(updatedBook.amount).toBe(amount - 1)
    })
    test('should throw exception when new amount < 0', async () => {
        const amount = 10
        const newAmount = -11
        const { book } = await usecaseCreateDefaultBook('Sample Book', amount)
        await expect(async () => {
            await usecaseDecreaseBookInventory(book.id, newAmount)
        }).rejects.toThrow(
            new BadRequestError('inventory cannot be less than 0')
        )
        const updatedBook = await findBookById(book.id, true)
        expect(updatedBook.amount).toBe(amount)
    })
})
