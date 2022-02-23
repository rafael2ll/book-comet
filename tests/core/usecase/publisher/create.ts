import { Publisher } from '@db/schema/publisher'
import { createPublisher } from '@usecases/publisher/create'

const usecaseCreatePublisher = async (
    name = 'Sample Publisher'
): Promise<Publisher> => {
    return createPublisher({ name })
}

export default usecaseCreatePublisher
