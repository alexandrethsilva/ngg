import {createHistory} from 'history';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';

import thunkMiddleware from 'redux-thunk';
// import {batchedUpdatesMiddleware} from 'redux-batched-updates';
import {reduxReactRouter} from 'redux-react-router';

import appRoutes from '../modules/common/routes/AppRoutes';
import appReducers from '../modules/common/reducers/AppReducers';

export default function createAppStore(initialState) {
  let finalCreateStore = createStore;

  if (process.env.NODE_ENV !== 'production') {
    let {devTools, persistState} = require('redux-devtools'); // eslint-disable-line prefer-const

    finalCreateStore = compose(
      devTools(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(finalCreateStore);
  }

  // const composedMiddlewares = compose(thunkMiddleware, batchedUpdatesMiddleware);

  finalCreateStore = compose(
    applyMiddleware(thunkMiddleware),
    reduxReactRouter({ routes: appRoutes, createHistory })
  )(finalCreateStore);

  return finalCreateStore(combineReducers(appReducers), initialState);
}
