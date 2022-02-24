import listBooks from '@usecases/book/list'

const usecaseListBook = async (
    page = 1,
    size = 10,
    publisherId: string | undefined = undefined,
    authorId: string | undefined = undefined
) => {
    return listBooks({
        publisherId,
        authorId,
        page,
        size,
    })
}

export default usecaseListBook
