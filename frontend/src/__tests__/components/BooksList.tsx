import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, act } from '@testing-library/react';

import BooksList from '../../domain/BooksList';
import BookList from '../../components/BooksList';
import { fetchBooksList } from '../../services/booksList';

jest.mock('../../services/booksList', () => ({
  fetchBooksList: jest.fn()
}));

describe('Component: BooksList', () => {
  it('renders the every book list item element in books list', async () => {
    const data = [
      {
        id: 1,
        title: "Harry Potter and the Philosopher's Stone",
        year: 2000
      }
    ];
    const mockResponse: Promise<BooksList> = Promise.resolve(data);
    (fetchBooksList as jest.MockedFunction<typeof fetchBooksList>).mockImplementation(() => mockResponse);

    render(
      <BrowserRouter>
        <BookList />
      </BrowserRouter>
    );

    const element = screen.getByText(/loading.../i);

    expect(fetchBooksList).toBeCalled();
    expect(element).toBeInTheDocument();

    await act(async () => {
      await mockResponse;
    });

    data.forEach((book) => {
      const listItemElement = screen.getByText(book.title);

      expect(listItemElement).toBeInTheDocument();
    });
  });

  it('renders the error message if request fails while fetching books list', async () => {
    const error = { message: 'This is a test error.' };
    const mockResponse: Promise<BooksList> = Promise.reject(error);
    (fetchBooksList as jest.MockedFunction<typeof fetchBooksList>).mockImplementation(() => mockResponse);

    render(
      <BrowserRouter>
        <BookList />
      </BrowserRouter>
    );

    const element = screen.getByText(/loading.../i);

    expect(fetchBooksList).toBeCalled();
    expect(element).toBeInTheDocument();

    await act(async () => {
      await mockResponse.catch((e) => {
        return;
      });
    });

    const errorMessageElement = screen.getByText(error.message);

    expect(errorMessageElement).toBeInTheDocument();
  });

  it('renders the empty message if request resolves with null', async () => {
    const data = null;
    const mockResponse: Promise<null> = Promise.resolve(data);
    (fetchBooksList as jest.MockedFunction<() => Promise<any>>).mockImplementation(() => mockResponse);

    render(
      <BrowserRouter>
        <BookList />
      </BrowserRouter>
    );

    const element = screen.getByText(/loading.../i);

    expect(fetchBooksList).toBeCalled();
    expect(element).toBeInTheDocument();

    await act(async () => {
      await mockResponse;
    });

    const empty = screen.getByText(/no data available!/i);

    expect(empty).toBeInTheDocument();
  });
});
