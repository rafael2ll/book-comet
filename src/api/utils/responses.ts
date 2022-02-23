import { Response } from 'express'

const handleResponse = (res: Response, statusCode: number, body: any) =>
    res.status(statusCode).send(body)

export default handleResponse
