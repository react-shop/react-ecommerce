import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import store from '../store';

import Home from '../../modules/views/home';

const Root = () => {
  return (
    <Provider store={store}>
      <Router>
        <>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </>
      </Router>
    </Provider>
  );
};

export default Root;
