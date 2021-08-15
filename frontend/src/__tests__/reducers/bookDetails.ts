import reducer, { INITIAL_STATE } from '../../reducers/bookDetails';
import {
  FETCH_BOOK_DETAILS_PENDING,
  FETCH_BOOK_DETAILS_REJECTED,
  FETCH_BOOK_DETAILS_COMPLETED
} from '../../actions/bookDetails';

jest.mock('../../services/bookDetails', () => ({
  fetchBookDetails: jest.fn()
}));

describe('Reducer: bookDetails', () => {
  it('should set isLoading state as true for pending action', () => {
    const newState = reducer(INITIAL_STATE, { type: FETCH_BOOK_DETAILS_PENDING });

    expect(newState.isLoading).toEqual(true);
  });

  it('should set bookInfo property with payload for completed action', () => {
    const data = {
      id: 1,
      title: "Harry Potter and the Philosopher's Stone",
      year: 2000,
      description: 'Test description'
    };

    const newState = reducer(INITIAL_STATE, { type: FETCH_BOOK_DETAILS_COMPLETED, payload: data });

    expect(newState.bookInfo).toEqual(data);
    expect(newState.isLoading).toEqual(false);
  });

  it('should set error property with payload.message for rejected action', () => {
    const error = new Error('Test message');

    const newState = reducer(INITIAL_STATE, { type: FETCH_BOOK_DETAILS_REJECTED, payload: error as any });

    expect(newState.error).toEqual(error.message);
    expect(newState.bookInfo).toEqual(null);
    expect(newState.isLoading).toEqual(false);
  });

  it('should return same state for unknown action type', () => {
    const newState = reducer(INITIAL_STATE, { type: 'TEST' as any, payload: {} as any });

    expect(newState).toEqual(INITIAL_STATE);
  });

  it('should use initial state by default for undefined states', () => {
    const newState = reducer(undefined, { type: 'TEST' as any, payload: {} as any });

    expect(newState).toEqual(INITIAL_STATE);
  });
});
