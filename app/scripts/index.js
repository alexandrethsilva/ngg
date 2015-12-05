import 'babel/polyfill';

import React from 'react';
import Relay from 'react-relay';
import DOM from 'react-dom';

import {Provider} from 'react-redux';
import {ReduxRouter} from 'redux-router';
import {RelayRoutingContext} from 'react-router-relay';

import init from './init';
import createAppStore from 'utils/createAppStore';

import Logger from 'utils/logger';

async function initApp() {
  try {

    Relay.injectNetworkLayer(
      new Relay.DefaultNetworkLayer('/graphql', {
        credentials: 'same-origin',
      })
    );

    const store: Function = createAppStore();

    await store.dispatch(init());

    const component = (
      <Provider store={store}>
        <ReduxRouter RoutingContext={RelayRoutingContext} />
      </Provider>
    );

    const container = document.getElementById('root');

    DOM.render(component, container);

  } catch (error) {
    Logger.error('There\'s a problem with the application.', error);
  }
}

initApp();
