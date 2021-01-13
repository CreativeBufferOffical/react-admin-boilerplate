import React from 'react';
import PropTypes from 'prop-types';
import injectReducer from 'utils/injectReducer';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import reducer from './reducer';
import UnsavedChangesModalPopup from './UnsavedChangesModalPopup';
import * as selectors from './selectors';
import * as actions from './actions';

const UnsavedChangesModal = props => {
  const handleSave = () => {
    props.dispatch(actions.acceptUnsavedChangesModal());
  };
  const handleDiscard = () => {
    props.dispatch(actions.discardUnsavedChangesModal());
  };
  const handleClose = () => {
    props.dispatch(actions.cancelUnsavedChangesModal());
  };

  return (
    <UnsavedChangesModalPopup
      isOpen={props.unsavedChangesModalOpen}
      handleSave={handleSave}
      handleDiscard={handleDiscard}
      closeModal={handleClose}
    />
  );
};

UnsavedChangesModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  unsavedChangesModalOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  unsavedChangesModalOpen: selectors.unsavedChangesModalOpen(state),
});

const withReducer = injectReducer({ key: 'unsavedChangesModal', reducer });
const withConnect = connect(mapStateToProps);

export default compose(
  withReducer,
  withRouter,
  withConnect,
)(UnsavedChangesModal);
