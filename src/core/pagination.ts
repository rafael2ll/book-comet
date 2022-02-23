export interface PageResponse<T> {
    items: T[]
    page?: number
    pageSize?: number
    numOfElements?: number
}
export interface PageRequest {
    limit: number
    page: number
}
