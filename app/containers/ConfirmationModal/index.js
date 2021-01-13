import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import ModalPopup from 'components/ModalPopup';
import injectReducer from 'utils/injectReducer';
import { ModalSizes } from 'constants/modalConstants';
import { Button } from 'reactstrap';

import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';

export class ConfirmationModal extends React.Component {
  handleConfirm = () => this.props.dispatch(actions.acceptConfirmationModal());

  handleCancel = () => this.props.dispatch(actions.declineConfirmationModal());

  render = () => (
    <ModalPopup
      title={this.props.confirmationModalTitle || ''}
      isOpen={this.props.confirmationModalOpen}
      isError={false}
      size={ModalSizes.LARGE}
      footer={
        <React.Fragment>
          <Button
            size="sm"
            color="primary"
            className="mt-2"
            onClick={this.handleConfirm}
          >
            {this.props.confirmationModalAffirmativeText}
          </Button>
          <Button
            size="sm"
            color="secondary"
            className="mt-2"
            onClick={this.handleCancel}
          >
            {this.props.confirmationModalNegativeText}
          </Button>
        </React.Fragment>
      }
    >
      {this.props.confirmationModalText}
      <br />
      <b>
        {!this.props.confirmationActionCanBeUndone &&
          'This operation cannot be undone.'}
      </b>
    </ModalPopup>
  );
}

ConfirmationModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  confirmationModalOpen: PropTypes.bool.isRequired,
  confirmationModalTitle: PropTypes.string,
  confirmationModalText: PropTypes.string,
  confirmationModalAffirmativeText: PropTypes.string,
  confirmationModalNegativeText: PropTypes.string,
  confirmationActionCanBeUndone: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  confirmationModalOpen: selectors.confirmationModalOpen(state),
  confirmationModalTitle: selectors.confirmationModalTitle(state),
  confirmationModalText: selectors.confirmationModalText(state),
  confirmationModalAffirmativeText: selectors.confirmationModalAffirmativeText(
    state,
  ),
  confirmationModalNegativeText: selectors.confirmationModalNegativeText(state),
  confirmationActionCanBeUndone: selectors.confirmationActionCanBeUndone(state),
});

const withReducer = injectReducer({ key: 'confirmationModal', reducer });
const withConnect = connect(mapStateToProps);

export default compose(
  withReducer,
  withRouter,
  withConnect,
)(ConfirmationModal);
