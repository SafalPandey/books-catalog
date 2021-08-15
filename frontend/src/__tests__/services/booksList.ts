import http from '../../utils/http';
import BooksList from '../../domain/BooksList';
import { fetchBooksList } from '../../services/booksList';

jest.mock('../../utils/http', () => ({
  __esModule: true,
  default: {
    get: jest.fn()
  }
}));

describe('Service: fetchBooksList', () => {
  it('should return contents of data only if fetching books list is successful', async () => {
    const data = {
      data: [
        {
          id: 1,
          title: "Harry Potter and the Philosopher's Stone",
          year: 2000
        }
      ]
    };
    const mockResponse: Promise<{ data: { data: BooksList } }> = Promise.resolve({ data });
    (http.get as jest.MockedFunction<typeof http.get>).mockImplementation(async (x) => mockResponse);

    const receivedResponse = await fetchBooksList();

    expect(receivedResponse).toEqual(data.data);
  });

  it('should throw error if request to fetch books list fails', async () => {
    const mockResponse: Promise<{ data: { data: BooksList } }> = Promise.reject('Test error');
    (http.get as jest.MockedFunction<typeof http.get>).mockImplementation(async (x) => mockResponse);

    try {
      await fetchBooksList();
    } catch (e) {
      expect(e).toMatch('Test error');
    }
  });
});
