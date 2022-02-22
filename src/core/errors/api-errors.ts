/* eslint-disable max-classes-per-file */
import ErrorCodes from './error-codes'

export class ApiError extends Error {
    code: number

    constructor(code: number, message: string) {
        super(message)
        this.code = code
    }
}

export class BadRequestError extends ApiError {
    constructor(message: string) {
        super(ErrorCodes.BAD_REQUEST, message)
    }
}

export class NotFoundError extends ApiError {
    constructor(parameter: string) {
        super(ErrorCodes.NOT_FOUND, `${parameter} not found`)
    }
}
export class ConflictError extends ApiError {
    constructor(parameter: string) {
        super(ErrorCodes.CONFLICT, `${parameter} already exists`)
    }
}

export class MissingParameterError extends BadRequestError {
    constructor(parameter: string | string[]) {
        super(`Missing attributes: ${String(parameter)}`)
    }
}
