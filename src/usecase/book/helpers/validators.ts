import { BookModel } from '@db/models'
import { BadRequestError, ConflictError } from '@errors/api-errors'
import { Types } from 'mongoose'
import { CreateBookModel } from '../models'

const validateInsertion = async (model: CreateBookModel) => {
    validateInventory(model.amount)
    await validateExistence(model)
}

const validateInventory = (itemCount: number) => {
    if (itemCount < 0)
        throw new BadRequestError('quantity cannot be less than 0')
}
const validateExistence = async (model: CreateBookModel): Promise<void> => {
    const booksExist = await BookModel.exists({
        title: model.title,
        authors: {
            $elemMatch: {
                id: model.authorIds.map((aId) => new Types.ObjectId(aId)),
            },
        },
    })

    if (booksExist) throw new ConflictError('Book')
}

export default validateInsertion
