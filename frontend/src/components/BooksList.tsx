import React from 'react';

import BookListItem from './BookListItem';
import { getBooksList } from '../actions/booksList';
import booksListReducer, { INITIAL_STATE } from '../reducers/booksList';

const BookList = () => {
  const [state, dispatch] = React.useReducer(booksListReducer, INITIAL_STATE);

  React.useEffect(() => {
    getBooksList(dispatch);
  }, [])

  return (
    <div className="flex justify-center items-center px-20">
      <div className="space-y-3">
        {state.books.map(book => <BookListItem key={book.id} book={book} />)}
      </div>
    </div>
  );
}

export default BookList;
