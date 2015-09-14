import React from 'react';
import DOM from 'react-dom';

import {Router, Route} from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import ReactRouterRelay from 'react-router-relay';

// Components
import App from './components/App';
import User from './components/User';

//Queries
import AppQueries from './queries/AppQueries';
import UserQueries from './queries/UserQueries';

DOM.render(
  <Router
    history={new BrowserHistory()}
    createElement={ReactRouterRelay.createElement}>
    <Route
      path="/"
      component={App}
      queries={AppQueries}
    />
    <Route
      path="/user/:uuid"
      component={User}
      queries={UserQueries}
    />
  </Router>,
  document.getElementById('root')
);
