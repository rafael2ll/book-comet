import { createPublisher } from '@usecases/publisher/create'
import { Request, Response, Router } from 'express'
import handleResponse from './utils/responses'

const publisherRouter = Router()

publisherRouter.post('/', async (req: Request, res: Response, next: any) => {
    createPublisher(req.body)
        .then((publisher) => handleResponse(res, 201, publisher))
        .catch(next)
})

export default publisherRouter
