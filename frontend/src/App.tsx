import React, { lazy, Suspense } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import Routes from './enums/routes';
import Header from './components/Header';
import SusComponent from './components/SusComponent';
import Search from './components/Search';

const BooksList = lazy(() => import('./components/BooksList'));
const BookDetails = lazy(() => import('./components/BookDetails'));

function App() {
  return (
    <div className="container mx-auto max-w-screen-lg">
      <BrowserRouter>
        <Header />
        <Suspense fallback={<span className="loader"></span>}>
          <Switch>
            <Route exact path={"/sus"} component={SusComponent} />
            <Route exact path={"/search"} component={Search} />
            <Route path={Routes.BOOKS_LIST} component={BooksList} />
            <Route exact path={Routes.BOOK_DETAILS} component={BookDetails} />
            <Route path={"/404"} component={() => <div>404</div>} />
            <Route component={()=><Redirect to="/404" />} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
