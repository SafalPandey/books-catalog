import { fetchAllBooks, fetchBookById } from "../../services/books"

jest.mock('../../models/book', () => ({
  __esModule: true,
  default: function () {
    return {
      fetch: jest.fn(() => Promise.resolve(book)),
      fetchAll: jest.fn(() => Promise.resolve(bookArray))
    }
  }
}));

const book = {
  id: 1,
  title: "Harry Potter and the Philosopher's Stone",
  year: 2000,
  description: "Test description.",
}
const bookArray = [book];

describe('Service: fetchAllBooks', () => {
  it('should return an array of books', async () => {
    const response = await fetchAllBooks();
    expect(response).toBeDefined();
    expect(response).toEqual({ data: bookArray });
  })
})

describe('Service: fetchBookById', () => {
  it('should return a book', async () => {
    const response = await fetchBookById(1);
    expect(response).toBeDefined()
    expect(response).toEqual({ data: book });
  })
})
