import updateInventory from '@usecases/inventory/update'

export const usecaseAddFixedAmount = async (bookId: string, amount: number) => {
    await updateInventory({ amount, bookId })
}

export const usecaseIncreaseBookInventory = async (bookId: string) => {
    await updateInventory({ bookId, action: 'increase' })
}

export const usecaseDecreaseBookInventory = async (bookId: string) => {
    await updateInventory({ bookId, action: 'decrease' })
}
