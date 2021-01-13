import React from 'react';
import PropTypes from 'prop-types';

import { compose, setPropTypes } from 'recompose';
import { Field, reduxForm } from 'redux-form/immutable';
import { Col, Row } from 'reactstrap';
import { formatDateMMDDYYYY } from 'utils/dateUtils';
import { required, validEmail } from 'utils/fieldValidators';

import ValueField from 'components/ValueField';
import ReadOnlyField from 'components/ReadOnlyField';
import FieldWithErrors from 'components/FieldWithErrors';

const BasicUserForm = props => (
  <form onSubmit={props.handleSubmit}>
    <Row>
      <Col sm={4}>
        <ValueField
          required
          label="First Name"
          value={
            <Field
              name="firstName"
              component={FieldWithErrors}
              type="text"
              validate={[required]}
            />
          }
        />
      </Col>
      <Col sm={4}>
        <ValueField
          required
          label="Last Name"
          value={
            <Field
              name="lastName"
              component={FieldWithErrors}
              type="text"
              validate={[required]}
            />
          }
        />
      </Col>
      <Col sm={4}>
        <ValueField
          required
          label="Email Address"
          value={
            <Field
              name="email"
              component={FieldWithErrors}
              type="text"
              validate={[required, validEmail]}
            />
          }
        />
      </Col>
    </Row>
    <Row>
      <Col sm={4}>
        <ValueField
          required
          label="Phone Number"
          value={
            <Field
              name="phone"
              component={FieldWithErrors}
              type="text"
              validate={[required]}
            />
          }
        />
      </Col>
      <Col sm={4}>
        <ValueField
          label="Phone Ext"
          value={
            <Field
              name="phoneExtension"
              component={FieldWithErrors}
              type="text"
            />
          }
        />
      </Col>
      <Col sm={4}>
        {props.user && (
          <ReadOnlyField
            label="Last Updated"
            value={formatDateMMDDYYYY(props.user.updated)}
          />
        )}
      </Col>
    </Row>
  </form>
);

BasicUserForm.propTypes = {
  user: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
};

const withPropTypes = setPropTypes({
  onSubmitAction: PropTypes.func.isRequired,
});

const withForm = reduxForm({
  onSubmit(values, dispatch, props) {
    const editedUserValues = values.toJS();
    let newUser = editedUserValues;
    if (props.user) {
      newUser = props.user;
      Object.keys(editedUserValues).forEach(key => {
        newUser[key] = editedUserValues[key];
      });
    }
    dispatch(props.onSubmitAction(newUser));
  },
});

export default compose(
  withForm,
  withPropTypes,
)(BasicUserForm);
