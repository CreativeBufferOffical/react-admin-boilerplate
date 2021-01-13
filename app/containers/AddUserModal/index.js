import React from 'react';
import PropTypes from 'prop-types';

import { compose } from 'recompose';
import { connect } from 'react-redux';
import { ModalSizes } from 'constants/modalConstants';
import { Button } from 'reactstrap';
import { submit, isInvalid } from 'redux-form/immutable';
import { ButtonColors } from 'constants/buttonConstants';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import formNames from 'constants/formNames';
import ModalPopup from 'components/ModalPopup';
import BasicUserForm from 'components/BasicUserForm';
import ErrorModal from 'components/ErrorModal';
import LoadingButton from 'components/LoadingButton';

import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';

const AddUserModal = props => {
  const submitAddUserForm = () =>
    props.dispatch(submit(formNames.ADDING_USER_FORM));

  return (
    <ModalPopup
      title="Add User"
      size={ModalSizes.LARGE}
      isOpen={props.isOpen}
      handleToggle={props.handleToggle}
      footer={
        <div>
          <LoadingButton
            className="mr-3"
            text="Add User"
            iconName="add"
            color={ButtonColors.SUCCESS}
            onClick={submitAddUserForm}
            disabled={props.addUserFormIsInvalid}
            loading={props.loading}
          />
          <Button
            color="secondary"
            size="sm"
            outline
            onClick={props.handleToggle}
          >
            Cancel
          </Button>
        </div>
      }
    >
      <ErrorModal
        isOpen={!!props.error}
        onClose={() => props.dispatch(actions.clearError())}
        title="Add User Error"
        message={props.error}
      />
      <BasicUserForm
        onSubmitAction={actions.createUser}
        form={formNames.ADDING_USER_FORM}
      />
    </ModalPopup>
  );
};

AddUserModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  addUserFormIsInvalid: PropTypes.bool.isRequired,
};

const withReducer = injectReducer({ key: 'addUserModal', reducer });
const withSaga = injectSaga({ key: 'addUserModal', saga });
const withConnect = connect(state => ({
  error: selectors.selectError(state),
  loading: selectors.selectLoading(state),
  addUserFormIsInvalid: isInvalid(formNames.ADDING_USER_FORM)(state),
}));

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AddUserModal);
