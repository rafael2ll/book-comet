import { BadRequestError, NotFoundError } from '@core/errors/api-errors'
import { BookInventoryModel } from '@db/models'
import { startSession } from 'mongoose'
import { UpdateInventoryModel } from './models'

const updateInventory = async (model: UpdateInventoryModel) => {
    const session = await startSession()
    await session.withTransaction(async () => {
        const inventory = await BookInventoryModel.findOne({
            book: model.bookId,
        })
        if (!inventory)
            throw new NotFoundError(`Inventory of book '${model.bookId}'`)
        if (model.amount) {
            if (model.amount < 0)
                throw new BadRequestError('`amount` cannot be less than 0')

            inventory.amount = model.amount
        } else if (model.action === 'increase') inventory.amount += 1
        else if (model.action === 'decrease') {
            inventory.amount -= 1
            if (inventory.amount < 0)
                throw new BadRequestError('inventory cannot be less than 0')
        }
        await inventory.save()
    })
    await session.endSession()
}
export default updateInventory
