import React from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from 'reactstrap';
import { formatDateMMDDYYYY } from 'utils/dateUtils';

import ReadOnlyField from 'components/ReadOnlyField';

const BasicUserInfo = props => (
  <form>
    <Row>
      <Col sm={4}>
        <ReadOnlyField label="First Name" value={props.user.firstName} />
        <ReadOnlyField label="Phone Number" value={props.user.phone} />
      </Col>
      <Col sm={4}>
        <ReadOnlyField label="Last Name" value={props.user.lastName} />
        <ReadOnlyField label="Phone Ext" value={props.user.phoneExtension} />
      </Col>
      <Col sm={4}>
        <ReadOnlyField label="Email Address" value={props.user.email} />
        <ReadOnlyField
          label="Last Updated"
          value={formatDateMMDDYYYY(props.user.updated)}
        />
      </Col>
    </Row>
  </form>
);

BasicUserInfo.propTypes = {
  user: PropTypes.object.isRequired,
};

export default BasicUserInfo;
