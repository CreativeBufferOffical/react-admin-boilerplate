import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { selectDomainsWithPermissionTokens } from 'containers/App/selectors';

import LoadingSpinner from 'components/LoadingSpinner';
import StandardCard from 'components/StandardCard';

import DomainPermissionSection from './DomainPermissionSection';

import * as selectors from './selectors';

const UserPermissionCard = props => (
  <StandardCard title="User Permissions">
    <div className="p-4">
      {props.loadingUserPermissions ? (
        <div className="card-spinner-container">
          <LoadingSpinner />
        </div>
      ) : (
        props.domains.map(domain => (
          <DomainPermissionSection
            key={domain}
            domain={domain}
            user={props.user}
            setUserPermission={props.setUserPermission}
          />
        ))
      )}
    </div>
  </StandardCard>
);

UserPermissionCard.propTypes = {
  domains: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  loadingUserPermissions: PropTypes.bool.isRequired,
  setUserPermission: PropTypes.func.isRequired,
};

const withConnect = connect(state => ({
  domains: selectDomainsWithPermissionTokens(state),
  loadingUserPermissions: selectors.selectLoadingUserPermissions(state),
}));
const withLifecycle = lifecycle({
  componentDidMount() {
    this.props.loadUserPermissions(this.props.user.id);
  },
  componentDidUpdate(prevProps) {
    if (prevProps.user.id !== this.props.user.id)
      this.props.loadUserPermissions(this.props.user.id);
  },
});

export default compose(
  withConnect,
  withLifecycle,
)(UserPermissionCard);
