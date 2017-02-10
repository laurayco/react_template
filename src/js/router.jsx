import React from 'react';
import {Router, browserHistory, Route} from 'react-router';

import AppRoot from './app-root.js';
import Home from './home.js';
import injectTapEventPlugin from 'react-tap-event-plugin';

const AppRouter = () => {
  injectTapEventPlugin();
  return (
    <Router history={browserHistory}>
      <Route path="/" component={AppRoot}>
        <Route path="/home" component={Home}/>
      </Route>
    </Router>
  );
};

export default AppRouter;
