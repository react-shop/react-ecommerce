import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { GlobalStyles, ThemeProvider } from '@react-shop/design-system';

import store from '../store';

import Home from '../modules/views/home';

const Root = () => (
  <Provider store={store}>
    <GlobalStyles />
    <ThemeProvider>
      <Router>
        <>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </>
      </Router>
    </ThemeProvider>
  </Provider>
);

export default Root;
