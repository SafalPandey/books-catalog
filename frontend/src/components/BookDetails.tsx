import React, { } from 'react';

import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import { getBookDetails } from '../actions/bookDetails';
import Routes from '../enums/routes';
import bookDetailsReducer, { INITIAL_STATE } from '../reducers/bookDetails';

const BookDetails = (props: RouteComponentProps<{ id: string }>) => {
  const bookId = parseInt(props.match.params.id);

  const [state, dispatch] = React.useReducer(bookDetailsReducer, INITIAL_STATE);

  const { isLoading, bookInfo, error } = state;

  React.useEffect(() => {
    getBookDetails(bookId, dispatch);
  }, [bookId]);

  if (isLoading || bookInfo === null) {
    return <div>Loading...</div>;
  }

  const { id, title, year, description } = bookInfo;

  return (
    <div className="bg-gray-800 shadow-lg mx-auto rounded-xl overflow-hidden" >
      <div className="flex items-center justify-between space-x-8 p-6 bg-gray-700 shadow-lg">
        <div className="flex items-center">
          <Link
            to={Routes.BOOKS_LIST}
            title="Books list"
            className="inline text-white ml-0 border-2 py-2 px-4 rounded-full hover:shadow-2xl transition duration-500 transform hover:scale-105"
          >
            Back
          </Link>
          <h1 className="inline ml-4 text-xl text-white font-semibold" title="Title">{title}</h1>
        </div>
        <span className="bg-indigo-600 float-right p-1.5 text-white text-xs font-semibold rounded-lg m-2" title="Year">
          {year}
        </span>
      </div>
      <p className="py-6 px-6 text-lg text-white" title="Description">{description}</p>
    </div>
  );
}

export default withRouter(BookDetails);
