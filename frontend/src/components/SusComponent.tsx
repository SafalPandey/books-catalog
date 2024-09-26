import React from 'react';

import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import Routes from '../enums/routes';
import { getBookDetails } from '../actions/bookDetails';
import { extractDiffTime } from '../utils/time';

const SusComp = () => {
  const { title = 'Harry Potter', year = '1998', description = 'Beautiful story bruh' } = {}
  return (
    <div className="bg-gray-800 shadow-lg mx-auto rounded-xl overflow-hidden">
      {title}
      {description}
      <span className="bg-indigo-600 float-right p-1.5 text-white text-xs font-semibold rounded-lg m-2" title="Year">
        Years since published: {extractDiffTime(year)}
      </span>

    </div>
  );
};

export default withRouter(SusComp);
