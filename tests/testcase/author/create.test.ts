import usecaseCreateAuthor from '../../core/usecase/author/create'

describe('author unit tests', () => {
    test('should create author sucessfully', async () => {
        const name = 'John Doe'
        const author = await usecaseCreateAuthor(name)
        expect(author.name).toBe(name)
        expect(author.id).toBeDefined()
    })
})
