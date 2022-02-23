/* eslint-disable no-restricted-syntax */
import { connectToDatabase } from '@db/db'
import { connection } from 'mongoose'

beforeAll(async () => {
    await connectToDatabase()
})

beforeEach(async () => {
    const collections = await connection.collections
    const collectionsKeys = Object.keys(collections)
    for (const key of collectionsKeys) {
        const collection = collections[key]
        // @ts-ignore
        await collection.deleteMany()
    }
})
