import { connectToDatabase } from '@db/db'
import express from 'express'
import * as bodyParser from 'body-parser'
import errorHandler from '@core/middleware/error-middleware'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import { env } from 'process'
import requireAuthentication from '@core/middleware/authentication-middleware'
import bookRouter from './api/book'
import authorRouter from './api/author'
import publisherRouter from './api/publisher'
import inventoryRouter from './api/inventory'
import authenticationRouter from './api/authenticate'

const app = express()
const oneDay = 1000 * 60 * 60 * 24

app.use(bodyParser.json())
app.use(
    session({
        secret: env.SESSION_KEY ?? 'a_secret_key',
        saveUninitialized: true,
        cookie: { maxAge: oneDay },
        resave: false,
    })
)
app.use(cookieParser())
const PORT = 8000

app.use('/authentication', authenticationRouter)
app.use(requireAuthentication)
app.use('/books', bookRouter)
app.use('/authors', authorRouter)
app.use('/publishers', publisherRouter)
app.use('/inventory', inventoryRouter)
app.use(errorHandler)

connectToDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(
                `[server]: Server is running at http://localhost:${PORT}`
            )
        })
    })
    .catch((err) => {
        console.log(err)
    })
