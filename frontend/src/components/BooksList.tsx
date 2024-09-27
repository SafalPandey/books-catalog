import React from 'react';

import BookListItem from './BookListItem';
import { getBooksList } from '../actions/booksList';
import booksListReducer, { INITIAL_STATE } from '../reducers/booksList';

const BookList = () => {
  const [state, dispatch] = React.useReducer(booksListReducer, INITIAL_STATE);
  const { isLoading, books, error } = state;
  console.log({state})
  React.useEffect(() => {
    getBooksList(dispatch);
  }, []);

  if (books === null) {
    return <div className="text-white">No data available!</div>;
  }

  return (
    <div className="flex justify-center items-center px-20">
      <div className="space-y-3">
        {isLoading && <div className="text-white">{<span className="loader"></span>}</div>}
        {isLoading && books && books.map((book) => (
          <BookListItem key={book.id} book={book} />
        ))}
        {error && <div className="text-white">{error}</div>}
      </div>
    </div>
  );
};

export default BookList;
