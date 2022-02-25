/* eslint-disable @typescript-eslint/ban-ts-comment */
import { UnauthorizedError } from '@core/errors/api-errors'
import { Request, Response } from 'express'

const requireAuthentication = (req: Request, res: Response, next: any) => {
    // @ts-ignore
    if (req.session.userId) return next()
    return next(new UnauthorizedError('you must be logged in'))
}

export default requireAuthentication
