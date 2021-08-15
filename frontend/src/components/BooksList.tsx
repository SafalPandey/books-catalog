import React from 'react';

import BookListItem from './BookListItem';
import { getBooksList } from '../actions/booksList';
import booksListReducer, { INITIAL_STATE } from '../reducers/booksList';

const BookList = () => {
  const [state, dispatch] = React.useReducer(booksListReducer, INITIAL_STATE);
  const { isLoading, books, error } = state;

  React.useEffect(() => {
    getBooksList(dispatch);
  }, [])

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error !== null) {
    return <div className="text-white">{error}</div>;
  }

  if (books === null) {
    return <div className="text-white">No data available!</div>;
  }

  return (
    <div className="flex justify-center items-center px-20">
      <div className="space-y-3">
        {books.map(book => <BookListItem key={book.id} book={book} />)}
      </div>
    </div>
  );
}

export default BookList;
