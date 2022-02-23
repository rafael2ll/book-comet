import { BookInventoryModel } from '@db/models'
import { Inventory } from '@db/schema/inventory'
import { BadRequestError } from '@errors/api-errors'
import { Schema } from 'mongoose'

export interface InternalInventoryCreateModel {
    bookId: Schema.Types.ObjectId
    quantity: number
}
export const createInventoryInternal = async (
    inventoryModel: InternalInventoryCreateModel
): Promise<Inventory> => {
    const inventory = new BookInventoryModel({
        book: inventoryModel.bookId,
        amount: inventoryModel.quantity,
    })
    const error = inventory.validateSync()
    if (error) {
        throw new BadRequestError(
            Object.keys(error.errors)
                .map((k) => error.errors[k].message)
                .join(', ')
        )
    }
    return inventory.save()
}
