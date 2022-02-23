/* eslint-disable @typescript-eslint/ban-ts-comment */
import { connect, connection } from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

export const connectToDatabase = async (): Promise<void> => {
    const mongod = await MongoMemoryServer.create()
    const uri = mongod.getUri()
    console.log(`Local mongo URI: ${uri}`)
    // @ts-ignore
    await connect(uri, { useNewUrlParser: true })
}

export const closeDatabase = async () => {
    await connection.dropDatabase()
    await connection.close()
}
