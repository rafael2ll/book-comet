import { BadRequestError, ConflictError } from '@errors/api-errors'
import { PublisherModel } from '@db/models'
import { Publisher } from '@db/schema/publisher'

export interface CreatePublisherModel {
    name: string
}
export const createPublisher = async (
    publisherOpts: CreatePublisherModel
): Promise<Publisher> => {
    if (await PublisherModel.exists({ ...publisherOpts }))
        throw new ConflictError('Publisher')

    const publisher: Publisher = new PublisherModel(publisherOpts)
    const error = publisher.validateSync()
    if (error) {
        throw new BadRequestError(
            Object.keys(error.errors)
                .map((k) => error.errors[k].message)
                .join(', ')
        )
    }
    return publisher.save()
}
