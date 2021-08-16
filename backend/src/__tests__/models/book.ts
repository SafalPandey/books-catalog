import Book from '../../models/book';

describe('Model: Book', () => {
  it('should use correct table', async () => {
    expect(Book).toBeDefined();
    expect(new Book().tableName).toEqual('books');
    expect(new Book().requireFetch).toEqual(false);
    expect(new Book().hasTimestamps).toEqual(true);
  });
});
