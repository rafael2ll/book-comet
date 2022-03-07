import { Request, Response } from 'express'
import { Error } from 'mongoose'
import { ApiError } from '../errors/api-errors'

const errorHandler = (err: any, req: Request, res: Response, next: any) => {
    if (err instanceof ApiError) {
        console.log(`API Error:${err}`)
        res.status(err.code)
        res.json({ message: err.message })
    } else if (err instanceof Error.CastError) {
        res.status(422)
        res.json({ message: err.message })
    } else {
        console.log('Application Error')
        console.error(err)
        res.status(500)
        res.json({ error: err.message })
    }
}

export default errorHandler
