import React from 'react';
import { compose } from 'redux';
import { lifecycle } from 'recompose';
import { withRouter, Link } from 'react-router-dom';

const HomePage = () => (
  <p>
    Redirecting to <Link to="/users">user management</Link>
    ...
  </p>
);

const withLifecycle = lifecycle({
  componentDidMount() {
    this.props.history.push('/users');
  },
});

export default compose(
  withRouter,
  withLifecycle,
)(HomePage);
