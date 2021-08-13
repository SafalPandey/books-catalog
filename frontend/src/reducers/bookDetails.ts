import { BookDetailsActions, FETCH_BOOK_DETAILS_COMPLETED, FETCH_BOOK_DETAILS_PENDING, FETCH_BOOK_DETAILS_REJECTED } from "../actions/bookDetails";
import BookDetails from "../domain/BookDetails";

export interface BookDetailsState {
  isLoading: boolean;
  error: string | null;
  bookInfo: BookDetails | null;
}

export const INITIAL_STATE: BookDetailsState = {
  bookInfo: null,
  error: null,
  isLoading: false
};

/**
 * Reducer for book details.
 *
 * @param {BookDetailsState} state
 * @param {BookDetailsActions} action
 * @returns {BookDetailsState}
 */
function reducer(state = INITIAL_STATE, action: BookDetailsActions) {
  console.log(action, state);
  switch (action.type) {
    case FETCH_BOOK_DETAILS_PENDING:
      return {
        ...state,
        isLoading: true
      }

    case FETCH_BOOK_DETAILS_COMPLETED:
      return {
        error: null,
        isLoading: false,
        bookInfo: action.payload,
      }

    case FETCH_BOOK_DETAILS_REJECTED:
      return {
        ...state,
        isLoading: false,
        bookInfo: null,
        error: action.payload?.message
      }

    default:
      return state;
  }

}

export default reducer;
