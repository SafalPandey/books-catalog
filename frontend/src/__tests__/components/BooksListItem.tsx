import React from 'react';
import { BrowserRouter, generatePath } from 'react-router-dom';
import { render, screen, act } from '@testing-library/react';

import BooksList, { Book } from '../../domain/BooksList';
import BookListItem from '../../components/BookListItem';
import Routes from '../../enums/routes';

describe('Component: BooksListItem', () => {
  it('renders the book list item element with link to book details', async () => {
    const book = {
      id: 1,
      title: "Harry Potter and the Philosopher's Stone",
      year: 2000
    };

    render(
      <BrowserRouter>
        <BookListItem book={book} />
      </BrowserRouter>
    );

    const titleElement = screen.getByText(book.title);
    const yearElement = screen.getByText(book.year);
    const linkElement = document.getElementsByTagName('a')[0];

    expect(titleElement).toBeInTheDocument();
    expect(yearElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', generatePath(Routes.BOOK_DETAILS, { id: book.id }));
  });

  it('renders truncated text for long titles', async () => {
    const book = {
      id: 1,
      title: 'This is a very long title as you can see it is longer than usual title lengths',
      year: 2000
    };

    render(
      <BrowserRouter>
        <BookListItem book={book} />
      </BrowserRouter>
    );

    const titleElement = screen.getByTitle(book.title); // Using title to get the element
    const yearElement = screen.getByText(book.year);
    const linkElement = document.getElementsByTagName('a')[0];

    expect(titleElement).toBeInTheDocument();
    expect(titleElement.innerHTML).not.toEqual(book.title);
    expect(yearElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', generatePath(Routes.BOOK_DETAILS, { id: book.id }));
  });
});
