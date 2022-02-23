import { NotFoundError } from '@errors/api-errors'
import { BookInventoryModel, BookModel } from '@db/models'

const deleteBook = async (id: string): Promise<void> => {
    if (await BookModel.exists({ _id: id })) {
        await BookModel.deleteOne({ _id: id })
        await BookInventoryModel.deleteOne({ book: id })
    } else throw new NotFoundError('Book')
}

export default deleteBook
