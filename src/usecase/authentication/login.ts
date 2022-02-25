/* eslint-disable @typescript-eslint/ban-ts-comment */
import { UnauthorizedError } from '@core/errors/api-errors'
import { Request } from 'express'

export interface User {
    username: string
}

export const login = async (
    username: string,
    password: string,
    req: Request
): Promise<User> => {
    if (username.length > 0 && password === 'password') {
        // @ts-ignore
        req.session.userId = username
        return {
            username,
        }
    }
    throw new UnauthorizedError('user credentials are invalid')
}
