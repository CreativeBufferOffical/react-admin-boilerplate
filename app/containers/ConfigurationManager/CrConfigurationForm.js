import React from 'react';
import { compose, setPropTypes } from 'recompose';
import { Col, Row, Button } from 'reactstrap';
import { Field, reduxForm } from 'redux-form/immutable';
import ValueField from 'components/ValueField';
import { required } from 'utils/fieldValidators';
import FieldWithErrors from 'components/FieldWithErrors';
import {
  Grid,
  GridToolbar,
  GridColumn as Column,
} from '@progress/kendo-react-grid';
import PropTypes from 'prop-types';
import IconButton from 'components/IconButton';
import Icon from 'components/Icon';
import star from 'images/36star.png';
import yellowStar from 'images/36staryellow.png';
import collapse from 'images/36collapse.png';
import styled from 'styled-components';
import { NavbarBrand } from 'reactstrap';
import * as actions from './actions';
import * as selectors from './selectors';
import { CR_APPCONFIG_LOAD } from './constants';

const NavBarBrandStyled = styled(props => <NavbarBrand {...props} />)`
  color: #00263e;
  cursor: pointer;
  float: left;
  padding: 0 !important;
  margin: 0;
  height: 100%;
  display: flex !important;
  align-items: center;
`;

const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined;

const imageClick = (props, dataItem) => {
  props.dispatch(actions.updateReviewTypes(dataItem));
  // alert(dataItem);
};

const CrConfigurationInfo = props => (
  <form onSubmit={props.handleSubmit}>
    <Row className="p-4">
      <Col sm={4}>
        <ValueField
          required
          label="Time to Lockout"
          value={
            <div style={{ width: 100 }}>
              <React.Fragment>
                <Row>
                  <Col sm={9}>
                    <Field
                      name="timeToLockoutDays"
                      component={FieldWithErrors}
                      type="text"
                      validate={[required, number]}
                    />
                  </Col>
                  <Col sm={3}>
                    <label>Days</label>
                  </Col>
                </Row>
              </React.Fragment>
            </div>
          }
        />
      </Col>
      <Col sm={4}>
        <ValueField
          required
          label="Report Sent"
          value={
            <div style={{ width: 100 }}>
              <React.Fragment>
                <Row>
                  <Col sm={9}>
                    <Field
                      name="reportSentDays"
                      component={FieldWithErrors}
                      type="text"
                      validate={[required, number]}
                    />
                  </Col>
                  <Col sm={3}>
                    <label>Days</label>
                  </Col>
                </Row>
              </React.Fragment>
            </div>
          }
        />
      </Col>
      <Col sm={4}>
        <ValueField
          required
          label="CAF Response Time"
          value={
            <div style={{ width: 100 }}>
              <React.Fragment>
                <Row>
                  <Col sm={9}>
                    <Field
                      name="cafResponseTimeDays"
                      component={FieldWithErrors}
                      type="text"
                      validate={[required, number]}
                    />
                  </Col>
                  <Col sm={3}>
                    <label>Days</label>
                  </Col>
                </Row>
              </React.Fragment>
            </div>
          }
        />
      </Col>
      <Col sm={4}>
        <ValueField
          required
          label="Mileage"
          value={
            <div style={{ width: 170 }}>
              <React.Fragment>
                <Row>
                  <Col sm={6}>
                    <Field
                      name="ratePerMile"
                      component={FieldWithErrors}
                      type="number"
                      validate={[required]}
                    />
                  </Col>
                  <Col sm={6}>
                    <label>Per Mile</label>
                  </Col>
                </Row>
              </React.Fragment>
            </div>
          }
        />
      </Col>
      <Col sm={4}>
        <ValueField
          required
          label="Per Diem"
          value={
            <div style={{ width: 270 }}>
              <React.Fragment>
                <Row>
                  <Col sm={4}>
                    <Field
                      name="ratePerDiem"
                      component={FieldWithErrors}
                      type="number"
                      validate={[required]}
                    />
                  </Col>
                  <Col sm={8}>
                    <label>Per full Day</label>
                  </Col>
                </Row>
              </React.Fragment>
            </div>
          }
        />
      </Col>
    </Row>
    <Row className="p-4">
      <Col sm={6}>
        <Grid
          style={{ maxHeight: 615 }}
          editField="inEdit"
          selectedField="selected"
          data={props && props.reviewTypes && props.reviewTypes.reviewTypes}
        >
          <GridToolbar>
            <div>
              <button size="sm" color="blue">
                Add New Item
              </button>
            </div>
          </GridToolbar>
          <Column
            field="name"
            title="Review Types"
            cell={({ dataItem }) => (
              <tr>
                <td>
                  <NavBarBrandStyled>
                    <img
                      src={dataItem.defaultType === true ? yellowStar : star}
                      width={25}
                      alt="SLAS NextGen Admin"
                      onClick={() => imageClick(props, dataItem)}
                    />
                  </NavBarBrandStyled>
                </td>
                <td style={{ width: 270 }}>{`${dataItem.name}`}</td>
                <td>
                  <NavBarBrandStyled>
                    <img
                      src={collapse}
                      width={18}
                      alt="SLAS NextGen Admin"
                      onClick={() =>
                        props.dispatch(actions.updateReviewTypes(dataItem))
                      }
                    />
                  </NavBarBrandStyled>
                </td>
              </tr>
            )}
          />
        </Grid>
      </Col>
      <Col sm={6}>
        <Grid
          style={{ maxHeight: 615 }}
          selectedField="selected"
          data={props && props.auditTypes && props.auditTypes.auditTypes}
        >
          <Column
            field="name"
            title="Audit Types"
            cell={({ dataItem }) => (
              <tr>
                <td>
                  <NavBarBrandStyled>
                    <img
                      src={dataItem.defaultType === true ? yellowStar : star}
                      width={25}
                      alt="SLAS NextGen Admin"
                      onClick={() => imageClick(dataItem)}
                    />
                  </NavBarBrandStyled>
                </td>
                <td style={{ width: 270 }}>{`${dataItem.name}`}</td>
                <td>
                  <NavBarBrandStyled>
                    <img
                      src={collapse}
                      width={18}
                      alt="SLAS NextGen Admin"
                      onClick={() =>
                        props.dispatch(actions.updateReviewTypes(dataItem))
                      }
                    />
                  </NavBarBrandStyled>
                </td>
              </tr>
            )}
          />
        </Grid>
      </Col>
    </Row>
  </form>
);

CrConfigurationInfo.propTypes = {
  crAppConfig: PropTypes.object,
  reviewTypes: PropTypes.object,
  auditTypes: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  updateReviewTypeById: PropTypes.object.isRequired,
};

const withPropTypes = setPropTypes({
  onSubmitAction: PropTypes.func.isRequired,
});

const withForm = reduxForm({
  onSubmit(values, dispatch, props) {
    const editedUserValues = values.toJS();
    let newUser = editedUserValues;
    if (props.crAppConfig) {
      newUser = props.crAppConfig;
      Object.keys(editedUserValues).forEach(key => {
        if (key == 'ratePerMile' || key == 'ratePerDiem')
          newUser[key] = parseFloat(editedUserValues[key]);
        else newUser[key] = parseInt(editedUserValues[key]);
      });
    }
    dispatch(props.onSubmitAction(newUser));
  },
});

export default compose(
  withForm,
  withPropTypes,
)(CrConfigurationInfo);
