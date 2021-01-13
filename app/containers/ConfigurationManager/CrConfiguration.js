import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import ReadOnlyField from 'components/ReadOnlyField';
// import { reduceRight } from 'lodash-es';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';

const CrConfiguration = props => (
  <form>
    <Row className="p-4">
      <Col sm={4}>
        <React.Fragment>
          <Row>
            <Col sm={9}>
              <ReadOnlyField
                label="Time to Lockout"
                value={
                  props &&
                  props.crAppConfig &&
                  props.crAppConfig.timeToLockoutDays
                }
              />
            </Col>
          </Row>
          <Row>
            <Col sm={3}>
              <label>Days</label>
            </Col>
          </Row>
        </React.Fragment>
      </Col>
      <Col sm={4}>
        <ReadOnlyField
          label="Report Sent"
          value={props && props.crAppConfig && props.crAppConfig.reportSentDays}
        />{' '}
        <label>Days</label>
      </Col>
      <Col sm={4}>
        <ReadOnlyField
          label="CAF Response Time"
          value={
            props && props.crAppConfig && props.crAppConfig.cafResponseTimeDays
          }
        />{' '}
        <label>Days</label>
      </Col>
      <Col sm={4}>
        <ReadOnlyField
          label="Mileage"
          value={props && props.crAppConfig && props.crAppConfig.ratePerMile}
        />{' '}
        <label>Per Mile</label>
      </Col>
      <Col sm={4}>
        <ReadOnlyField
          label="Per Diem"
          value={props && props.crAppConfig && props.crAppConfig.ratePerDiem}
        />{' '}
        <label>Per full Day</label>
      </Col>
    </Row>
    <Row className="p-4">
      <Col sm={6}>
        <Grid
          style={{ maxHeight: 615 }}
          selectedField="selected"
          data={props && props.reviewTypes && props.reviewTypes.reviewTypes}
        >
          <Column
            field="name"
            title="Review Types"
            cell={({ dataItem }) => <td>{`${dataItem.name}`}</td>}
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
            cell={({ dataItem }) => <td>{`${dataItem.name}`}</td>}
          />
        </Grid>
      </Col>
    </Row>
  </form>
);

CrConfiguration.propTypes = {
  crAppConfig: PropTypes.object.isRequired,
  reviewTypes: PropTypes.array.isRequired,
  auditTypes: PropTypes.array.isRequired,
};

export default CrConfiguration;
