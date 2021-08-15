import {
  BooksListActions,
  FETCH_BOOKS_LIST_PENDING,
  FETCH_BOOKS_LIST_REJECTED,
  FETCH_BOOKS_LIST_COMPLETED
} from "../actions/booksList";
import BooksList from "../domain/BooksList";

export interface BooksListState {
  isLoading: boolean;
  error: string | null;
  books: BooksList;
}

export const INITIAL_STATE: BooksListState = {
  books: [],
  error: null,
  isLoading: false
};

/**
 * Reducer for book details.
 *
 * @param {BooksListState} state
 * @param {BookDetailsActions} action
 * @returns {BooksListState}
 */
function reducer(state = INITIAL_STATE, action: BooksListActions): BooksListState {
  switch (action.type) {
    case FETCH_BOOKS_LIST_PENDING:
      return {
        ...state,
        isLoading: true
      }

    case FETCH_BOOKS_LIST_COMPLETED:
      return {
        error: null,
        isLoading: false,
        books: action.payload,
      }

    case FETCH_BOOKS_LIST_REJECTED:
      return {
        books: [],
        isLoading: false,
        error: action.payload?.message
      }

    default:
      return state;
  }

}

export default reducer;
