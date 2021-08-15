import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import Header from '../../components/Header';
import Routes from '../../enums/routes';

describe('Component: Header', () => {
  it('renders a link to books list', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const linkElement = screen.getByText(/books catalog/i);

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', Routes.BOOKS_LIST);
  });
});
