import React from 'react';
import { Link } from 'react-router-dom';

import Routes from '../enums/routes';

function Header() {
  return (
    <h1 className="text-center text-4xl text-gray-50 font-bold my-10">
      <Link to={Routes.BOOKS_LIST}>Books Catalog</Link>
    </h1>
  );
}

export default Header;
