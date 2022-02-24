import { NotFoundError } from '@core/errors/api-errors'
import { BookModel } from '@db/models'
import { Book } from '@db/schema/book'
import getInventoryByBook from '@usecases/inventory/get-by-book'

type BookInventory = Book & { amount?: number }

const findBookById = async (
    id: string,
    withInventory = false
): Promise<BookInventory> => {
    const book: BookInventory | null = await BookModel.findOne({
        _id: id,
    }).lean()

    if (!book) {
        throw new NotFoundError(`Book ${id}`)
    }

    if (withInventory) {
        const inventory = await getInventoryByBook(id)
        book.amount = inventory.amount
    }

    return book
}
export default findBookById
