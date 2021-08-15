import { act, render, screen } from '@testing-library/react';

import App from '../App';
import Routes from '../enums/routes';
import { generatePath } from 'react-router-dom';
import BookDetails from '../domain/BookDetails';
import BooksListInterface from '../domain/BooksList';
import { fetchBooksList } from '../services/booksList';
import { fetchBookDetails } from '../services/bookDetails';

jest.mock('../services/booksList', () => ({
  fetchBooksList: jest.fn()
}));

jest.mock('../services/bookDetails', () => ({
  fetchBookDetails: jest.fn()
}));

describe('Component: App', () => {
  it('renders a header component', () => {
    render(<App />);
    const linkElement = screen.getByText(/books catalog/i);

    expect(linkElement).toBeInTheDocument();
  });

  it('renders books list when route matches', async () => {
    const booksList = [
      {
        id: 1,
        title: "Harry Potter and the Philosopher's Stone",
        year: 2000
      }
    ];
    const mockResponse: Promise<BooksListInterface> = Promise.resolve(booksList);
    (fetchBooksList as jest.MockedFunction<typeof fetchBooksList>).mockImplementation(() => mockResponse);

    window.history.pushState({}, 'List', '/');
    render(<App />);

    await act(async () => {
      await mockResponse;
    });

    booksList.forEach((book) => {
      const listElement = screen.getByText(book.title);

      expect(listElement).toBeInTheDocument();
    });
  });

  it('renders book details when route matches', async () => {
    const book = {
      id: 1,
      title: "Harry Potter and the Philosopher's Stone",
      year: 2000,
      description: 'Test description'
    };

    const mockResponse: Promise<BookDetails> = Promise.resolve(book);
    (fetchBookDetails as jest.MockedFunction<typeof fetchBookDetails>).mockImplementation(() => mockResponse);

    window.history.pushState({}, 'Details', generatePath(Routes.BOOK_DETAILS, { id: book.id }));
    render(<App />);

    await act(async () => {
      await mockResponse;
    });

    const element = screen.getByText(book.title);

    expect(element).toBeInTheDocument();
  });
});
