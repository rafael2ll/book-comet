import { NotFoundError } from '@core/errors/api-errors'
import { BookInventoryModel } from '@db/models'
import { Inventory } from '@db/schema/inventory'

const getInventoryByBook = async (bookId: string): Promise<Inventory> => {
    const inventory = await BookInventoryModel.findOne({
        book: bookId,
    })
    if (!inventory) throw new NotFoundError(`Inventory of book '${bookId}'`)
    return inventory
}

export default getInventoryByBook
