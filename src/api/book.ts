/* eslint-disable camelcase */
import { MissingParameterError } from '@core/errors/api-errors'
import createBook from '@usecases/book/create'
import findBookById from '@usecases/book/find-by-id'
import listBooks from '@usecases/book/list'
import updateBook from '@usecases/book/update'
import { Request, Response, Router } from 'express'
import handleResponse from './utils/responses'

const bookRouter = Router()

bookRouter.post('/', async (req: Request, res: Response, next: any) => {
    createBook(req.body)
        .then((book) => handleResponse(res, 201, book))
        .catch(next)
})
bookRouter.put('/:id', async (req: Request, res: Response, next: any) => {
    if (!req.params.id) throw new MissingParameterError('path variable id')
    const { publisher_id, authors_id } = req.body
    req.body.id = req.params.id
    req.body.publisherId = publisher_id
    req.body.authorsId = authors_id
    updateBook(req.body)
        .then((book) => handleResponse(res, 201, book))
        .catch(next)
})

bookRouter.delete('/:id', async (req: Request, res: Response, next: any) => {
    if (!req.params.id) throw new MissingParameterError('path variable id')
    createBook(req.body)
        .then((book) => handleResponse(res, 201, book))
        .catch(next)
})

bookRouter.get('/:id', async (req: Request, res: Response, next: any) => {
    if (!req.params.id) throw new MissingParameterError('path variable id')
    findBookById(req.params.id, !req.query.includeInventory)
        .then((book) => handleResponse(res, 200, book))
        .catch(next)
})

bookRouter.get('/', async (req: Request, res: Response, next: any) => {
    const { page, size, author_id, publisher_id } = req.query
    listBooks({
        page: Number(page ?? '1'),
        ...(size && { size: Number(size) }),
        ...(author_id && { authorId: String(author_id) }),
        ...(publisher_id && { publisherId: String(publisher_id) }),
    })
        .then((bookList) => handleResponse(res, 200, bookList))
        .catch(next)
})

export default bookRouter
