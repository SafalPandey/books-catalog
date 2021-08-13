import { generatePath } from "react-router-dom";

import http from "../utils/http";
import Endpoints from "../enums/endpoints";
import BookDetails from "../domain/BookDetails";

/**
 * Fetches book details for given bookId from the API.
 *
 * @param bookId
 * @returns {Promise<BookDetails>}
 */
export async function fetchBookDetails(bookId: number): Promise<BookDetails> {
  const url = generatePath(Endpoints.BOOK_DETAILS, { bookId });

  const { data } = await http.get(url);

  return data.data;
}
