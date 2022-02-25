import { BookModel } from '@db/models'
import { BadRequestError, ConflictError } from '@errors/api-errors'
import { CreateBookModel, UpdateBookModel } from '../models'

/**
 *
 * @description validate new book's model, looking for {title, author} conflicts and inventory amount, if present.
 */
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
        authors: { $elemMatch: { id: model.authorIds } },
    })

    if (booksExist) throw new ConflictError('Book')
}

/**
 *
 * @description validate book update, looking for {title, author} conflicts
 */
export const validateUpdateExistence = async (
    model: UpdateBookModel,
    bookAuthors: string[]
): Promise<void> => {
    const booksExist = await BookModel.exists({
        _id: { $ne: model.id },
        title: model.title,
        authors: {
            $elemMatch: { id: [...(model.authorIds || []), ...bookAuthors] },
        },
    })

    if (booksExist) throw new ConflictError('Book')
}

export default validateInsertion
