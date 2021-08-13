import React from 'react';
import { generatePath, Link } from 'react-router-dom';

import Routes from '../enums/routes';
import { Book as BookEntity } from '../domain/BooksList';

const MAX_TEXT_LENGTH = 70;

const BookListItem = (props: { book: BookEntity }) => {
  const { book: { id, title, year } } = props;

  const truncate = (text: string) => text?.length > MAX_TEXT_LENGTH ? `${text.slice(0, MAX_TEXT_LENGTH)}...` : text;

  return (
    <Link
      to={generatePath(Routes.BOOK_DETAILS, { id })}
      className="flex items-center justify-between space-x-8 p-6 bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500"
    >
      <div className="py-3 px-4 text-xl text-white font-semibold">
        <span title={title}>{truncate(title)}</span>
      </div>
      <div className="bg-indigo-600 float-right p-1.5 text-white text-xs font-semibold rounded-lg">
        <span title="Year">{year}</span>
      </div>
    </Link>
  );
}

export default BookListItem;
