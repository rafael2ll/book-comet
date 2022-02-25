import { MissingParameterError } from '@core/errors/api-errors'
import updateInventory from '@usecases/inventory/update'
import { Request, Response, Router } from 'express'
import handleResponse from './utils/responses'

const inventoryRouter = Router()

inventoryRouter.put(
    '/:bookId/increase',
    async (req: Request, res: Response, next: any) => {
        const { bookId } = req.params
        const { amount } = req.body
        if (!bookId) throw new MissingParameterError('path var bookId')
        updateInventory({ bookId, action: 'increase', amount })
            .then(() => handleResponse(res, 204, undefined))
            .catch(next)
    }
)
inventoryRouter.put(
    '/:bookId/decrease',
    async (req: Request, res: Response, next: any) => {
        const { bookId } = req.params
        const { amount } = req.body
        if (!bookId) throw new MissingParameterError('path var bookId')
        updateInventory({ bookId, action: 'decrease', amount })
            .then(() => handleResponse(res, 204, undefined))
            .catch(next)
    }
)

export default inventoryRouter
