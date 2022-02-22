import mongoose from 'mongoose'
import authorSchema from './schema/author'
import bookSchema from './schema/book'
import inventorySchema from './schema/inventory'
import publisherSchema from './schema/publisher'

const BookModel = mongoose.model('Book', bookSchema)
const BookInventoryModel = mongoose.model('BookIventory', inventorySchema)
const AuthorModel = mongoose.model('Autor', authorSchema)
const PublisherModel = mongoose.model('Publisher', publisherSchema)

export { BookModel, BookInventoryModel, AuthorModel, PublisherModel }
