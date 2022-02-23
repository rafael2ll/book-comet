import { NotFoundError } from '@core/errors/api-errors'
import { PublisherModel } from '@db/models'
import { Publisher } from '@db/schema/publisher'
import { Types } from 'mongoose'

const findPublisherById = async (id: string): Promise<Publisher> => {
    const publisher = await PublisherModel.findOne({
        _id: new Types.ObjectId(id),
    })
    if (!publisher) {
        throw new NotFoundError(`Publisher ${id}`)
    }
    return publisher
}

export default findPublisherById
