import { NotFoundError } from '@core/errors/api-errors'
import { AuthorModel } from '@db/models'
import { Author } from '@db/schema/author'
import { Types } from 'mongoose'

const findAuthorById = async (id: string): Promise<Author> => {
    const author = await AuthorModel.findOne({ _id: new Types.ObjectId(id) })
    if (!author) throw new NotFoundError(`Author '${id}'`)
    return author
}

export default findAuthorById
