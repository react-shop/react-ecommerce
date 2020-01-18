import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { GlobalStyles } from '@react-shop/design-system';

import store from '../store';

import Home from '../modules/views/home';

const Root = () => (
  <Provider store={store}>
    <GlobalStyles />
    <Router>
      <>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </>
    </Router>
  </Provider>
);

export default Root;
