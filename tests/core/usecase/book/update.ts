import { UpdateBookModel } from '@usecases/book/models'
import updateBook from '@usecases/book/update'

const usecaseUpdateBook = async (
    updateOpts: UpdateBookModel
): Promise<void> => {
    return updateBook(updateOpts)
}

export default usecaseUpdateBook
