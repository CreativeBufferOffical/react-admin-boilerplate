/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { branch, renderNothing } from 'recompose';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import Navigation from 'components/Navigation';
import HomePage from 'containers/HomePage';
import UserManagementPage from 'containers/UserManagementPage';
import ConfigurationManager from 'containers/ConfigurationManager';
import NotFoundPage from 'containers/NotFoundPage';
import ConfirmationModal from 'containers/ConfirmationModal';

import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';

export class App extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch(actions.appInitLoad());
  }

  render() {
    return (
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/users" component={UserManagementPage} />
          <Route exact path="/configuration" component={ConfigurationManager} />
          <Route component={NotFoundPage} />
        </Switch>
        <ConfirmationModal />
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'app', saga });
const withConnect = connect();
const withBranch = branch(() => !window.getLoggedInUser(), renderNothing);

export default compose(
  withBranch,
  withReducer,
  withSaga,
  withRouter,
  withConnect,
)(App);
