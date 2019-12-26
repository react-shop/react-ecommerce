import React from 'react';
// import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from '../../modules/views/home';

const Root = () => {
  return (
    <Router>
      <>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </>
    </Router>
  );
};

export default Root;
