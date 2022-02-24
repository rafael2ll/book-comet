import { BookModel } from '@db/models'
import { Book } from '@db/schema/book'
import { Types } from 'mongoose'
import { PageResponse } from '@core/pagination'
import { ListBookRequest } from './models'

const listBooks = async (
    opts: ListBookRequest
): Promise<PageResponse<Book>> => {
    const paginationOpts = {
        query: {
            ...(opts.publisherId && {
                'publisher.id': opts.publisherId,
            }),
            ...(opts.authorId && {
                authors: {
                    $elemMatch: { id: opts.authorId },
                },
            }),
        },
        page: opts.page,
        limit: opts.size,
    }
    const booksPaginated = await BookModel.paginate(paginationOpts)
    return {
        items: booksPaginated?.docs ?? [],
        page: booksPaginated?.page ?? 1,
        numOfElements: booksPaginated?.totalDocs ?? 0,
        pageSize: booksPaginated?.docs?.length ?? 0,
    }
}

export default listBooks
