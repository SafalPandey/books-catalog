import reducer, { INITIAL_STATE } from '../../reducers/booksList';
import {
  FETCH_BOOKS_LIST_PENDING,
  FETCH_BOOKS_LIST_REJECTED,
  FETCH_BOOKS_LIST_COMPLETED
} from '../../actions/booksList';

jest.mock('../../services/booksList', () => ({
  fetchBooksList: jest.fn()
}));

describe('Reducer: booksList', () => {
  it('should set isLoading state as true for pending action', () => {
    const newState = reducer(INITIAL_STATE, { type: FETCH_BOOKS_LIST_PENDING });

    expect(newState.isLoading).toEqual(true);
  });

  it('should set books property with payload for completed action', () => {
    const data = [
      {
        id: 1,
        title: "Harry Potter and the Philosopher's Stone",
        year: 2000
      }
    ];

    const newState = reducer(INITIAL_STATE, { type: FETCH_BOOKS_LIST_COMPLETED, payload: data });

    expect(newState.books).toEqual(data);
    expect(newState.isLoading).toEqual(false);
  });

  it('should set error property with payload.message for rejected action', () => {
    const error = new Error('Test message');

    const newState = reducer(INITIAL_STATE, { type: FETCH_BOOKS_LIST_REJECTED, payload: error as any });

    expect(newState.error).toEqual(error.message);
    expect(newState.books).toEqual([]);
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
