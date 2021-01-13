import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';

import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Container, Row, Col, Button } from 'reactstrap';

import injectReducer from 'utils/injectReducer';
import RequireUserPermission from 'containers/RequireUserPermission';
import ErrorModal from 'components/ErrorModal';
import StandardCard from 'components/StandardCard';
import {
  CR_CONFIGURATION,
  PR_CONFIGURATION,
  NG_CONFIGURATION,
} from 'constants/permissionTokens';

import PrConfiguration from './PrConfiguration';
import CrConfiguration from './CrConfiguration';
import NgConfiguration from './NgConfiguration';
import ConfigurationHeader from './ConfigurationHeader';
import ConfigurationFooter from './ConfigurationFooter';
import * as constants from './constants';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';

import './styles.scss';
import injectSaga from 'utils/injectSaga';
import saga from './saga';
import CrConfigurationForm from './CrConfigurationForm';
import CrAppConfigForm from '../../constants/CrAppConfigForm';
import { updateCrAppConfig } from './actions';
import { submit } from 'redux-form/immutable';

const ConfigurationManager = props => {
  const onToggleEdit = useCallback(
    () => {
      props.dispatch(actions.toggleEditMode());
    },
    [props.dispatch],
  );

  const submitAppConfigForm = () => {
    props.dispatch(
      submit(
        CrAppConfigForm.EDITING_CR_APPCONFIG__FORM(props.crAppConfig.officeId),
      ),
    );
  };
  // const submitAppConfigForm = useCallback ( () => {
  //   props.dispatch(submit(CrAppConfigForm.EDITING_CR_APPCONFIG__FORM(props.crAppConfig.officeId)));
  //   alert(`Save changes for cr`);
  //   onToggleEdit();
  //   onCrClick();
  // },
  // );

  // const onSaveChanges = useCallback(
  //   () => {
  //     props.dispatch(actions.updateCrAppConfig(constants.UPDATE_CR_APPCONFIG,props),);
  //     //alert(`Save changes for cr`);
  //     onToggleEdit();
  //   },
  //   [props.crAppConfig],
  // );

  // const onSaveChanges = useCallback(
  //   () => {
  //     props.dispatch(
  //       actions.updateCrAppConfig(constants.UPDATE_CR_APPCONFIG),
  //     );
  //     onToggleEdit();
  //   },
  //   [props.crAppConfig],
  // );

  const onNgClick = useCallback(
    () => {
      props.dispatch(
        actions.selectProductConfiguraton(constants.NG_PRODUCT_NAME),
      );
    },
    [props.dispatch],
  );

  // const onSaveChanges = useCallback(
  //   () => {
  //     alert('ss');
  //     // props.dispatch(
  //     //   actions.updateCrAppConfig(constants.UPDATE_CR_APPCONFIG),
  //     // );
  //     // onToggleEdit();
  //   },
  //   [props.crAppConfig],
  // );

  const onCrClick = useCallback(
    () => {
      props.dispatch(actions.crAppConfig(constants.CR_APPCONFIG_LOAD));
      props.dispatch(
        actions.selectProductConfiguraton(constants.CR_PRODUCT_NAME),
      );
      props.dispatch(actions.reviewTypes(constants.REVIEW_TYPES_LOAD));
      props.dispatch(actions.auditTypes(constants.AUDIT_TYPES_LOAD));
    },
    [props.dispatch],
  );

  const onDefaultClick = useCallback(() => {
    props.dispatch(actions.setDefaultReviewType(2));
  });

  const onPrClick = useCallback(
    () => {
      props.dispatch(
        actions.selectProductConfiguraton(constants.PR_PRODUCT_NAME),
      );
    },
    [props.dispatch],
  );

  const handleCloseErrorModal = useCallback(
    () => {
      props.dispatch(actions.clearError());
    },
    [props.dispatch],
  );

  const prConfigButton = (
    <Button className="mt-2" color="primary" size="sm" disabled>
      Premium Reconciliation
    </Button>
  );

  const crConfigButton = (
    <Button className="mt-2" color="primary" size="sm" disabled>
      Compliance Review
    </Button>
  );

  const ngConfigButton = (
    <Button className="mt-2" color="primary" size="sm" disabled>
      Slas NextGen
    </Button>
  );

  const renderChosenConfig = props => {
    switch (props.productName) {
      case constants.CR_PRODUCT_NAME:
        if (props.isEditMode == false)
          return (
            <CrConfiguration
              crAppConfig={props.crAppConfig}
              reviewTypes={props.reviewTypes}
              auditTypes={props.auditTypes}
            />
          );
        return (
          <CrConfigurationForm
            crAppConfig={props.crAppConfig}
            reviewTypes={props.reviewTypes}
            auditTypes={props.auditTypes}
            initialValues={props.crAppConfig}
            onSubmitAction={updateCrAppConfig}
            form={CrAppConfigForm.EDITING_CR_APPCONFIG__FORM(
              props.crAppConfig.officeId,
            )}
          />
        );

      case constants.PR_PRODUCT_NAME:
        return <PrConfiguration isEditMode={props.isEditMode} />;

      case constants.NG_PRODUCT_NAME:
        return <NgConfiguration isEditMode={props.isEditMode} />;

      default:
        return '';
    }
  };

  return (
    <Container fluid>
      <ErrorModal
        isOpen={!!props.error}
        onClose={handleCloseErrorModal}
        title="Configuration Error"
        message={props.error}
      />
      <Row className="mt-4">
        <Col sm={{ size: 2, offset: 1 }}>
          <Row>Select a product to configure.</Row>
          <Row>
            <RequireUserPermission
              token={NG_CONFIGURATION}
              altComponent={ngConfigButton}
            >
              <Button
                className="mt-2"
                color="primary"
                size="sm"
                onClick={onNgClick}
              >
                Slas NextGen
              </Button>
            </RequireUserPermission>
          </Row>
          <Row>
            <RequireUserPermission
              token={PR_CONFIGURATION}
              altComponent={prConfigButton}
            >
              <Button
                className="mt-2"
                color="primary"
                size="sm"
                onClick={onPrClick}
              >
                Premium Reconciliation
              </Button>
            </RequireUserPermission>
          </Row>
          <Row>
            <RequireUserPermission
              token={CR_CONFIGURATION}
              altComponent={crConfigButton}
            >
              <Button
                className="mt-2"
                color="primary"
                size="sm"
                onClick={onCrClick}
              >
                Compliance Review
              </Button>
            </RequireUserPermission>
          </Row>
        </Col>
        <Col sm={8}>
          {props.crAppConfig && (
            <StandardCard
              title={
                <ConfigurationHeader
                  crAppConfig={props.crAppConfig}
                  productName="CR"
                  isEditMode={props.isEditMode}
                  onToggleEdit={onToggleEdit}
                />
              }
              footer={
                <ConfigurationFooter
                  crAppConfig={props.crAppConfig}
                  isEditMode={props.isEditMode}
                  onToggleEdit={onToggleEdit}
                  submitAppConfigForm={submitAppConfigForm}
                  // onSaveChanges={onSaveChanges}
                />
              }
            >
              {renderChosenConfig(props)}
            </StandardCard>
          )}
        </Col>
      </Row>
    </Container>
  );
};

ConfigurationManager.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string,
  productName: PropTypes.string,
  isEditMode: PropTypes.bool,
  crAppConfig: PropTypes.object.isRequired,
  reviewTypes: PropTypes.array.isRequired,
  auditTypes: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  productName: selectors.productNameSelector,
  isEditMode: selectors.isEditModeSelector,
  crAppConfig: selectors.selectCrAppConfig,
  reviewTypes: selectors.getReviewTypes,
  auditTypes: selectors.getAuditTypes,
});

const withConnect = connect(mapStateToProps);
const withReducer = injectReducer({ key: 'configurationManager', reducer });
const withSaga = injectSaga({ key: 'configurationManager', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ConfigurationManager);
