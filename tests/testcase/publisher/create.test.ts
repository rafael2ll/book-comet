import usecaseCreatePublisher from '../../core/usecase/publisher/create'

describe('publisher unit tests', () => {
    test('should create publisher sucessfully', async () => {
        const name = 'A&B Publisher'
        const publisher = await usecaseCreatePublisher(name)
        expect(publisher.name).toBe(name)
        expect(publisher.id).toBeDefined()
    })
})
