import React from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from 'reactstrap';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { selectDomainsWithRoles } from 'containers/App/selectors';

import LoadingSpinner from 'components/LoadingSpinner';
import StandardCard from 'components/StandardCard';
import * as selectors from './selectors';

import DomainRoleSection from './DomainRoleSection';

const UserRoleCard = props => (
  <StandardCard title="User Roles">
    <Row className="p-4">
      {props.loadingUserRoles ? (
        <div className="card-spinner-container">
          <LoadingSpinner />
        </div>
      ) : (
        props.domains.map(domain => (
          <Col key={domain} className="role-section-col">
            <DomainRoleSection
              domain={domain}
              userId={props.user.id}
              form={`User${props.user.id}-domainRoleSection-${domain}`}
            />
          </Col>
        ))
      )}
    </Row>
  </StandardCard>
);

UserRoleCard.propTypes = {
  user: PropTypes.object,
  domains: PropTypes.array.isRequired,
  loadingUserRoles: PropTypes.bool.isRequired,
};

const makeMapStateToProps = state => ({
  domains: selectDomainsWithRoles(state),
  loadingUserRoles: selectors.selectLoadingUserRoles(state),
});

const withConnect = connect(makeMapStateToProps);
const withLifecycle = lifecycle({
  componentDidMount() {
    this.props.loadUserRoles(this.props.user.id);
  },
  componentDidUpdate(prevProps) {
    if (prevProps.user.id !== this.props.user.id)
      this.props.loadUserRoles(this.props.user.id);
  },
});

export default compose(
  withConnect,
  withLifecycle,
)(UserRoleCard);
