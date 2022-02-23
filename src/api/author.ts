import { createAuthor } from '@usecases/author/create'
import { Request, Response, Router } from 'express'
import handleResponse from './utils/responses'

const authorRouter = Router()

authorRouter.post('/', async (req: Request, res: Response, next: any) => {
    createAuthor(req.body)
        .then((author) => handleResponse(res, 201, author))
        .catch(next)
})

export default authorRouter
