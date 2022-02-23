export interface UpdateInventoryModel {
    amount?: number
    action?: 'increase' | 'decrease'
    bookId: string
}
