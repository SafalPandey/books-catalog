import { act } from '@testing-library/react';

import BooksList from '../../domain/BooksList';
import { fetchBooksList } from '../../services/booksList';
import {
  getBooksList,
  FETCH_BOOKS_LIST_PENDING,
  FETCH_BOOKS_LIST_REJECTED,
  FETCH_BOOKS_LIST_COMPLETED
} from '../../actions/booksList';

jest.mock('../../services/booksList', () => ({
  fetchBooksList: jest.fn()
}));

describe('Action: getBooksList', () => {
  it('should dispatch correct actions in order while getting books list is successful', async () => {
    const mockedDispatch = jest.fn();

    const data = [
      {
        id: 1,
        title: "Harry Potter and the Philosopher's Stone",
        year: 2000
      }
    ];
    const mockResponse: Promise<BooksList> = Promise.resolve(data);
    (fetchBooksList as jest.MockedFunction<typeof fetchBooksList>).mockImplementation(() => mockResponse);

    await act(async () => await getBooksList(mockedDispatch));
    expect(mockedDispatch).toHaveBeenNthCalledWith(1, { type: FETCH_BOOKS_LIST_PENDING });
    expect(mockedDispatch).toHaveBeenNthCalledWith(2, { type: FETCH_BOOKS_LIST_COMPLETED, payload: data });
  });

  it('should dispatch correct actions while getting books list fails', async () => {
    const mockedDispatch = jest.fn();

    const error = { message: 'This is a test error' };
    const mockResponse: Promise<BooksList> = Promise.reject(error);
    (fetchBooksList as jest.MockedFunction<typeof fetchBooksList>).mockImplementation(() => mockResponse);

    await act(async () => await getBooksList(mockedDispatch));
    expect(mockedDispatch).toHaveBeenNthCalledWith(1, { type: FETCH_BOOKS_LIST_PENDING });
    expect(mockedDispatch).toHaveBeenNthCalledWith(2, { type: FETCH_BOOKS_LIST_REJECTED, payload: error });
  });
});
