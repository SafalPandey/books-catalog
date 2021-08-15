import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, act } from '@testing-library/react';

import BookDetails from '../../components/BookDetails';
import BookDetailsInterface from '../../domain/BookDetails';
import { fetchBookDetails } from '../../services/bookDetails';

jest.mock('../../services/bookDetails', () => ({
  fetchBookDetails: jest.fn()
}));

describe('Component: BookDetails', () => {
  it('renders the fields in book details', async () => {
    const data = {
      id: 1,
      title: "Harry Potter and the Philosopher's Stone",
      year: 2000,
      description: 'Test description'
    };
    const mockResponse: Promise<BookDetailsInterface> = Promise.resolve(data);
    (fetchBookDetails as jest.MockedFunction<typeof fetchBookDetails>).mockImplementation(() => mockResponse);

    render(
      <BrowserRouter>
        <BookDetails />
      </BrowserRouter>
    );

    const element = screen.getByText(/loading.../i);

    expect(fetchBookDetails).toBeCalled();
    expect(element).toBeInTheDocument();

    await act(async () => {
      await mockResponse;
    });

    const titleElement = screen.getByText(data.title);
    const yearElement = screen.getByText(data.year);
    const descriptionElement = screen.getByText(data.description);

    expect(titleElement).toBeInTheDocument();
    expect(yearElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  it('renders the error message if request fails while fetching book details', async () => {
    const error = { message: 'This is a test error.' };
    const mockResponse: Promise<BookDetailsInterface> = Promise.reject(error);
    (fetchBookDetails as jest.MockedFunction<typeof fetchBookDetails>).mockImplementation(() => mockResponse);

    render(
      <BrowserRouter>
        <BookDetails />
      </BrowserRouter>
    );

    const element = screen.getByText(/loading.../i);

    expect(fetchBookDetails).toBeCalled();
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
    (fetchBookDetails as jest.MockedFunction<() => Promise<any>>).mockImplementation(() => mockResponse);

    render(
      <BrowserRouter>
        <BookDetails />
      </BrowserRouter>
    );

    const element = screen.getByText(/loading.../i);

    expect(fetchBookDetails).toBeCalled();
    expect(element).toBeInTheDocument();

    await act(async () => {
      await mockResponse;
    });

    const empty = screen.getByText(/no data available!/i);

    expect(empty).toBeInTheDocument();
  });
});
