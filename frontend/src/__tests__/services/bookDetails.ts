import http from '../../utils/http';
import BookDetails from '../../domain/BookDetails';
import { fetchBookDetails } from '../../services/bookDetails';

jest.mock('../../utils/http', () => ({
  __esModule: true,
  default: {
    get: jest.fn()
  }
}));

describe('Service: fetchBookDetails', () => {
  it('should return contents of data only if fetching books list is successful', async () => {
    const data = {
      data: {
        id: 1,
        title: "Harry Potter and the Philosopher's Stone",
        year: 2000,
        description: 'Test description.'
      }
    };
    const mockResponse: Promise<{ data: { data: BookDetails } }> = Promise.resolve({ data });
    (http.get as jest.MockedFunction<typeof http.get>).mockImplementation(async (x) => mockResponse);

    const receivedResponse = await fetchBookDetails(1);

    expect(receivedResponse).toEqual(data.data);
  });

  it('should throw error if request to fetch books list fails', async () => {
    const mockResponse: Promise<{ data: { data: BookDetails } }> = Promise.reject('Test error');
    (http.get as jest.MockedFunction<typeof http.get>).mockImplementation(async (x) => mockResponse);

    try {
      await fetchBookDetails(1);
    } catch (e) {
      expect(e).toMatch('Test error');
    }
  });
});
