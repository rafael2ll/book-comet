import { BadRequestError, ConflictError } from '@errors/api-errors'
import { AuthorModel } from '@db/models'
import { Author } from '@db/schema/author'

export interface CreateAuthorModel {
    name: string
}
export const createAuthor = async (
    authorOpts: CreateAuthorModel
): Promise<Author> => {
    if (await AuthorModel.exists({ ...authorOpts }))
        throw new ConflictError('Publisher')

    const author: Author = new AuthorModel(authorOpts)
    const error = author.validateSync()
    if (error) {
        throw new BadRequestError(
            Object.keys(error.errors)
                .map((k) => error.errors[k].message)
                .join(', ')
        )
    }
    return author.save()
}
