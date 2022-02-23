/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-restricted-syntax */
import { connectToDatabase } from '@db/db'
import { connection } from 'mongoose'

beforeAll(async () => {
    await connectToDatabase()
})

beforeEach(async () => {
    const collections = await connection.collections
    const promises = []
    const collectionsKeys = Object.keys(collections)
    for (const key of collectionsKeys) {
        const collection = collections[key]
        // @ts-ignore
        promises.push(collection.deleteMany())
    }
    await Promise.all(promises)
})
