import { connectToDatabase } from '@db/db'
import express from 'express'
import * as bodyParser from 'body-parser'
import errorHandler from '@errors/error-handler'
import bookRouter from './api/book'
import authorRouter from './api/author'
import publisherRouter from './api/publisher'
import inventoryRouter from './api/inventory'

const app = express()
app.use(bodyParser.json())

const PORT = 8000

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
