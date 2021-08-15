import { Dispatch } from 'react';
import { AxiosError } from 'axios';

import BooksList from '../domain/BooksList';
import { Action, ActionWithPayload } from '../domain/Action';

import { fetchBooksList } from '../services/booksList';

export const FETCH_BOOKS_LIST_PENDING = 'FETCH_BOOKS_LIST_PENDING';
export const FETCH_BOOKS_LIST_REJECTED = 'FETCH_BOOKS_LIST_REJECTED';
export const FETCH_BOOKS_LIST_COMPLETED = 'FETCH_BOOKS_LIST_COMPLETED';

type FetchBooksListPending = Action<typeof FETCH_BOOKS_LIST_PENDING>;
type FetchBooksListCompleted = ActionWithPayload<typeof FETCH_BOOKS_LIST_COMPLETED, BooksList>;
type FetchBooksListRejected = ActionWithPayload<typeof FETCH_BOOKS_LIST_REJECTED, AxiosError>;

export type BooksListActions = FetchBooksListPending | FetchBooksListCompleted | FetchBooksListRejected;

/**
 * Action to fetch list of books.
 *
 * @param bookId
 * @param dispatch
 * @returns {void}
 */
export function getBooksList(dispatch: Dispatch<BooksListActions>) {
  dispatch({ type: FETCH_BOOKS_LIST_PENDING });

  return fetchBooksList()
    .then((data: BooksList) => dispatch({ type: FETCH_BOOKS_LIST_COMPLETED, payload: data }))
    .catch((e) => dispatch({ type: FETCH_BOOKS_LIST_REJECTED, payload: e }));
}
