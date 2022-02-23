import { Author } from '@db/schema/author'
import { createAuthor } from '@usecases/author/create'

const usecaseCreateAuthor = async (name = 'Sample Author'): Promise<Author> => {
    return createAuthor({ name })
}

export default usecaseCreateAuthor
