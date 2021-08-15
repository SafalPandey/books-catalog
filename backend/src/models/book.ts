import bookshelf from '../config/bookshelf';

class Book extends bookshelf.Model<Book> {
  get requireFetch(): boolean {
    return false;
  }

  get tableName(): string {
    return 'books';
  }

  get hasTimestamps(): boolean {
    return true;
  }
}

export default Book;
