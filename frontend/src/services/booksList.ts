import http from '../utils/http';
import Endpoints from '../enums/endpoints';
import BooksList from '../domain/BooksList';

/**
 * Fetches a list of books from the API.
 *
 * @param bookId
 * @returns {Promise<BooksList>}
 */
export async function fetchBooksList(): Promise<BooksList> {
  const { data } = await http.get(Endpoints.BOOKS_LIST);

  return data.data;
}
