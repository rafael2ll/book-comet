export interface CreateBookModel {
    title: string
    authorIds: string[]
    publisherId: string
    publishedYear: number
    summary: string
    amount: number
    format: 'paper' | 'digital'
}
export interface UpdateBookModel {
    id: string
    title?: string
    authorIds?: string[]
    publisherId?: string
    publishedYear?: number
    summary?: string
    amount?: number
    format?: 'paper' | 'digital'
}

export interface ListBookRequest {
    page: number
    size?: number
    authorId?: string
    publisherId?: string
}
