import deleteBook from '@usecases/book/delete'

const usecaseDeleteBook = async (id: string) => {
    return deleteBook(id)
}

export default usecaseDeleteBook
