import { MissingParameterError } from '@core/errors/api-errors'
import { login } from '@usecases/authentication/login'
import logout from '@usecases/authentication/logout'
import { Router, Request, Response } from 'express'

const authenticationRouter = Router()

authenticationRouter.post(
    '/login',
    async (req: Request, res: Response, next: any) => {
        const { username, password } = req.body
        if (!username) throw new MissingParameterError('username')
        if (!password) throw new MissingParameterError('password')
        login(username, password, req)
            .then(() => {
                res.status(200)
                res.send(null)
            })
            .catch(next)
    }
)

authenticationRouter.post(
    '/logout',
    async (req: Request, res: Response, next: any) => {
        logout(req)
            .then(() => {
                res.status(200)
                res.send(null)
            })
            .catch(next)
    }
)

export default authenticationRouter
