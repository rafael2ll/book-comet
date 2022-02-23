import { NotFoundError } from '@errors/api-errors'
import { AuthorModel } from '@db/models'

const deleteAuthor = async (id: string): Promise<void> => {
    if (await AuthorModel.exists({ _id: id }))
        await AuthorModel.deleteOne({ _id: id })
    else throw new NotFoundError('Author')
}

export default deleteAuthor
