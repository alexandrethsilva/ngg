/* @flow */
import 'babel/polyfill';

import React from 'react';
import Relay from 'react-relay';
import DOM from 'react-dom';

import {Provider} from 'react-redux';
import {ReduxRouter} from 'redux-react-router';
import ReactRouterRelay from 'react-router-relay';

import init from './init';
import createAppStore from './utils/createAppStore';

import Logger from './utils/logger';

async function initApp(): any {
  try {

    Relay.injectNetworkLayer(
      new Relay.DefaultNetworkLayer('/graphql', {
        credentials: 'same-origin'
      })
    );

    const store: Function = createAppStore();

    await store.dispatch(init());

    const component = (
      <Provider store={store}>
        <ReduxRouter createElement={ReactRouterRelay.createElement} />
      </Provider>
    );

    const container = document.getElementById('root');

    if (process.env.NODE_ENV !== 'production') {
      let {
        DevTools, // eslint-disable-line prefer-const
        DebugPanel, // eslint-disable-line prefer-const
        LogMonitor // eslint-disable-line prefer-const
      } = require('redux-devtools/lib/react');

      DOM.render(
        <div>
          {component}
          <DebugPanel top right bottom>
            <DevTools
              store={store}
              monitor={LogMonitor}
              visibleOnLoad={false}
              keyboardEnabled
            />
          </DebugPanel>
        </div>,
        container
      );

    } else {

      DOM.render(component, container);
      
    }

  } catch (error) {
    Logger.error('There\' an error with the application.', error);
  }
}

initApp();
