import mongoose from 'mongoose'
import { Pagination } from 'mongoose-paginate-ts'
import authorSchema, { Author } from './schema/author'
import bookSchema, { Book } from './schema/book'
import inventorySchema, { Inventory } from './schema/inventory'
import publisherSchema, { Publisher } from './schema/publisher'

const BookModel: Pagination<Book> = mongoose.model<Book, Pagination<Book>>(
    'Book',
    bookSchema
)

const BookInventoryModel: Pagination<Inventory> = mongoose.model<
    Inventory,
    Pagination<Inventory>
>('BookIventory', inventorySchema)

const AuthorModel: Pagination<Author> = mongoose.model<
    Author,
    Pagination<Author>
>('Author', authorSchema)

const PublisherModel: Pagination<Publisher> = mongoose.model<
    Publisher,
    Pagination<Publisher>
>('Publisher', publisherSchema)

export { BookModel, BookInventoryModel, AuthorModel, PublisherModel }
