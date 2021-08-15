import { act } from '@testing-library/react';

import BookDetails from '../../domain/BookDetails';
import { fetchBookDetails } from '../../services/bookDetails';
import {
  getBookDetails,
  FETCH_BOOK_DETAILS_PENDING,
  FETCH_BOOK_DETAILS_REJECTED,
  FETCH_BOOK_DETAILS_COMPLETED
} from '../../actions/bookDetails';

jest.mock('../../services/bookDetails', () => ({
  fetchBookDetails: jest.fn()
}));

describe('Action: getBookDetails', () => {
  it('should dispatch correct actions in order while getting book details is successful', async () => {
    const mockedDispatch = jest.fn();

    const data = {
      id: 1,
      title: "Harry Potter and the Philosopher's Stone",
      year: 2000,
      description: 'Test description'
    };
    const mockResponse: Promise<BookDetails> = Promise.resolve(data);
    (fetchBookDetails as jest.MockedFunction<typeof fetchBookDetails>).mockImplementation(() => mockResponse);

    await act(async () => await getBookDetails(1, mockedDispatch));
    expect(mockedDispatch).toHaveBeenNthCalledWith(1, { type: FETCH_BOOK_DETAILS_PENDING });
    expect(mockedDispatch).toHaveBeenNthCalledWith(2, { type: FETCH_BOOK_DETAILS_COMPLETED, payload: data });
  });

  it('should dispatch correct actions while getting book details fails', async () => {
    const mockedDispatch = jest.fn();

    const error = { message: 'This is a test error' };
    const mockResponse: Promise<BookDetails> = Promise.reject(error);
    (fetchBookDetails as jest.MockedFunction<typeof fetchBookDetails>).mockImplementation(() => mockResponse);

    await act(async () => await getBookDetails(1, mockedDispatch));
    expect(mockedDispatch).toHaveBeenNthCalledWith(1, { type: FETCH_BOOK_DETAILS_PENDING });
    expect(mockedDispatch).toHaveBeenNthCalledWith(2, { type: FETCH_BOOK_DETAILS_REJECTED, payload: error });
  });
});
