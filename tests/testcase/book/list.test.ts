import { BookModel } from '@db/models'
import usecaseCreatePublisher from '../../core/usecase/publisher/create'
import usecaseCreateAuthor from '../../core/usecase/author/create'
import { usecaseCreateNBooks } from '../../core/usecase/book/create'
import usecaseListBook from '../../core/usecase/book/list'

describe('list book tests', () => {
    const bookCount = 100
    const page = 1
    const pageSize = 50

    test('should list all books successfully when size is the size of the data', async () => {
        const { books } = await usecaseCreateNBooks('N Book ', bookCount)
        expect(await BookModel.count()).toBe(bookCount)
        const bookPage = await usecaseListBook(page, bookCount)
        expect(bookPage.numOfElements).toBe(bookCount)
        expect(bookPage.items.length).toBe(bookCount)
        expect(bookPage.page).toBe(page)
        expect(bookPage.pageSize).toBe(bookCount)
    })

    test('should paginate successfully when size is the smaller than the data', async () => {
        const { books } = await usecaseCreateNBooks('N Book ', bookCount)
        expect(await BookModel.count()).toBe(bookCount)
        const bookPage = await usecaseListBook(page, pageSize)
        expect(bookPage.numOfElements).toBe(bookCount)
        expect(bookPage.items.length).toBe(pageSize)
        expect(bookPage.page).toBe(page)
        expect(bookPage.pageSize).toBe(pageSize)
    })
    test('should fetch only books from an author when author_id is present', async () => {
        const otherAuthorCount = 10
        await usecaseCreateNBooks('N Book ', bookCount)
        const author = await usecaseCreateAuthor('Other Author')
        const publisher = await usecaseCreatePublisher('Other Publisher')
        await usecaseCreateNBooks(
            'Other N Boook',
            otherAuthorCount,
            author.id,
            publisher.id
        )
        expect(await BookModel.count()).toBe(bookCount + otherAuthorCount)
        const bookPage = await usecaseListBook(
            page,
            pageSize,
            undefined,
            author.id
        )
        expect(bookPage.numOfElements).toBe(otherAuthorCount)
        expect(bookPage.items.length).toBe(otherAuthorCount)
        expect(bookPage.page).toBe(page)
        expect(bookPage.pageSize).toBe(otherAuthorCount)
    })
    test('should fetch only books from a publisher when publisher_id is present', async () => {
        const otherPublisherCount = 51
        await usecaseCreateNBooks('N Book ', bookCount)
        const author = await usecaseCreateAuthor('Other Author')
        const publisher = await usecaseCreatePublisher('Other Publisher')
        await usecaseCreateNBooks(
            'Other N Boook',
            otherPublisherCount,
            author.id,
            publisher.id
        )
        expect(await BookModel.count()).toBe(bookCount + otherPublisherCount)
        const bookPage = await usecaseListBook(page, pageSize, publisher.id)
        expect(bookPage.numOfElements).toBe(otherPublisherCount)
        expect(bookPage.items.length).toBe(pageSize)
        expect(bookPage.page).toBe(page)
        expect(bookPage.pageSize).toBe(pageSize)
    })

    test('should fetch only books from a publisher and author when publisher_id  and author_id is present', async () => {
        const otherPublisherCount = 51
        await usecaseCreateNBooks('N Book ', bookCount)
        const author = await usecaseCreateAuthor('Other Author')
        const publisher = await usecaseCreatePublisher('Other Publisher')
        const otherPublisher = await usecaseCreatePublisher(
            'Other Publisher II'
        )
        await usecaseCreateNBooks(
            'Other N Boook',
            otherPublisherCount,
            author.id,
            publisher.id
        )
        await usecaseCreateNBooks(
            'Other N Boook P2',
            otherPublisherCount,
            author.id,
            otherPublisher.id
        )
        expect(await BookModel.count()).toBe(
            bookCount + otherPublisherCount * 2
        )
        const bookPage = await usecaseListBook(page, pageSize, publisher.id)
        expect(bookPage.numOfElements).toBe(otherPublisherCount)
        expect(bookPage.items.length).toBe(pageSize)
        expect(bookPage.page).toBe(page)
        expect(bookPage.pageSize).toBe(pageSize)
    })
})
