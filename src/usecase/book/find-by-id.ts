import { NotFoundError } from '@core/errors/api-errors'
import { BookModel } from '@db/models'
import { Book } from '@db/schema/book'
import getInventoryByBook from '@usecases/inventory/get-by-book'
import { Types } from 'mongoose'

const findBookById = async (
    id: string,
    withInventory = false
): Promise<Book & { amount?: number }> => {
    const book: (Book & { amount?: number }) | null = await BookModel.findOne({
        _id: new Types.ObjectId(id),
    }).lean()
    if (!book) {
        throw new NotFoundError(`Book ${id}`)
    }
    if (withInventory) {
        const inventory = await getInventoryByBook(id)
        console.log(inventory)
        book.amount = inventory.amount
    }
    return book
}
export default findBookById
