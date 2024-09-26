import React, { lazy, Suspense } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Routes from './enums/routes';
import Header from './components/Header';
import SusComponent from './components/SusComponent';

const BooksList = lazy(() => import('./components/BooksList'));
const BookDetails = lazy(() => import('./components/BookDetails'));

function App() {
  return (
    <div className="container mx-auto max-w-screen-lg">
      <BrowserRouter>
        <Header />
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route exact path={Routes.BOOKS_LIST} component={BooksList} />
            <Route exact path={Routes.BOOK_DETAILS} component={BookDetails} />
            <Route exact path={"/sus"} component={SusComponent} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
