import updateInventory from '@usecases/inventory/update'

export const usecaseAddFixedAmount = async (bookId: string, amount: number) => {
    await updateInventory({ amount, bookId, action: 'increase' })
}

export const usecaseIncreaseBookInventory = async (
    bookId: string,
    amount = 1
) => {
    await updateInventory({ bookId, action: 'increase', amount })
}

export const usecaseDecreaseBookInventory = async (
    bookId: string,
    amount = 1
) => {
    await updateInventory({ bookId, action: 'decrease', amount })
}
