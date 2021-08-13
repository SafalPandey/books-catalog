import { Dispatch } from 'react';
import { AxiosError } from 'axios';

import BookDetails from '../domain/BookDetails';
import { Action, ActionWithPayload } from '../domain/Action';

import { fetchBookDetails } from '../services/bookDetails';

export const FETCH_BOOK_DETAILS_PENDING = 'FETCH_BOOK_DETAILS_PENDING';
export const FETCH_BOOK_DETAILS_REJECTED = 'FETCH_BOOK_DETAILS_REJECTED';
export const FETCH_BOOK_DETAILS_COMPLETED = 'FETCH_BOOK_DETAILS_COMPLETED';

type FetchBookDetailsPending = Action<typeof FETCH_BOOK_DETAILS_PENDING>;
type FetchBookDetailsCompleted = ActionWithPayload<typeof FETCH_BOOK_DETAILS_COMPLETED, BookDetails>;
type FetchBookDetailsRejected = ActionWithPayload<typeof FETCH_BOOK_DETAILS_REJECTED, AxiosError>;

export type BookDetailsActions = FetchBookDetailsPending | FetchBookDetailsCompleted | FetchBookDetailsRejected;

/**
 * Action to fetch book details.
 *
 * @param bookId
 * @param dispatch
 * @returns {void}
 */
export function getBookDetails(bookId: number, dispatch: Dispatch<BookDetailsActions>) {
  dispatch({ type: FETCH_BOOK_DETAILS_PENDING });

  fetchBookDetails(bookId)
    .then((data: BookDetails) => dispatch({ type: FETCH_BOOK_DETAILS_COMPLETED, payload: data }))
    .catch(e => dispatch({ type: FETCH_BOOK_DETAILS_REJECTED, payload: e }))
}
