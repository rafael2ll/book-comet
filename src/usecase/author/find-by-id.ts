import { NotFoundError } from '@core/errors/api-errors'
import checkId from '@core/utils/id-validator'
import { AuthorModel } from '@db/models'
import { Author } from '@db/schema/author'
import { Types } from 'mongoose'

const findAuthorById = async (id: string): Promise<Author> => {
    checkId({ id })
    const author = await AuthorModel.findOne({ _id: id })
    if (!author) throw new NotFoundError(`Author '${id}'`)
    return author
}

export default findAuthorById
