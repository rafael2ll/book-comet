/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request } from 'express'

const logout = async (req: Request): Promise<void> => {
    return new Promise((resolve, reject) => {
        req.session.destroy((err) => {
            if (err) reject(err)
            else resolve()
        })
    })
}
export default logout
