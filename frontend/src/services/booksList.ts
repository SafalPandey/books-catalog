import http from "../utils/http";
import Endpoints from "../enums/endpoints";

/**
 * Fetches a list of books from the API.
 *
 * @param bookId
 * @returns {Promise<Response>}
 */
export async function fetchBooksList() {
  const { data } = await http.get(Endpoints.BOOKS_LIST);

  return data.data;
}
