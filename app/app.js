/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import history from 'utils/history';
import LoadingPage from 'components/LoadingPage';
import 'sanitize.css/sanitize.css';

// Import slas-styles
import 'slas-style/scss/style.scss';

// Import root app
import App from 'containers/App';

// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import '!file-loader?name=[name].[ext]!./images/logo-mainnav.png';
import 'file-loader?name=.htaccess!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from './configureStore';

const MOUNT_NODE = document.getElementById('app');

const configureHotReloadAndRender = () => {
  const initialState = {};
  const store = configureStore(initialState, history);

  const render = () => {
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>,
      MOUNT_NODE,
    );
  };

  if (module.hot) {
    // Hot reloadable React components and translation json files
    // modules.hot.accept does not accept dynamic dependencies,
    // have to be constants at compile-time
    module.hot.accept(['containers/App'], () => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      render();
    });
  }

  render();
};

const slasCoreHeaderId = 'slas-core-header-container';
// check to see if header has already rendered
if (document.getElementById(slasCoreHeaderId)) {
  configureHotReloadAndRender();
} else {
  // render the loading page until the header is rendered
  ReactDOM.render(<LoadingPage />, MOUNT_NODE);

  // watch for the header node to be added to the dom
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes) {
        mutation.addedNodes.forEach(addedNode => {
          if (addedNode.id === slasCoreHeaderId) {
            observer.disconnect();
            configureHotReloadAndRender();
          }
        });
      }
    });
  });
  observer.observe(document, {
    childList: true,
    subtree: true,
  });
}
