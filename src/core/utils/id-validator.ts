import {
    InvalidParameterError,
    MissingParameterError,
} from '@core/errors/api-errors'
import { isValidObjectId } from 'mongoose'

const checkId = (obj: any, fields = ['id'], required = true) => {
    const values = fields.map((key) => obj[key])
    values.forEach((v, i) => {
        if (!v && required) {
            throw new MissingParameterError(fields[i])
        } else if (Array.isArray(v)) {
            v.forEach((key) => {
                if (!isValidObjectId(key))
                    throw new InvalidParameterError(fields[i])
            })
        } else if (!isValidObjectId(v) && required) {
            throw new InvalidParameterError(
                `${fields[i]} is not a valid id or list of ids`
            )
        }
    })
}

export default checkId
