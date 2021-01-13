import React from 'react';
import { Button } from 'reactstrap';
import { ModalSizes } from 'constants/modalConstants';
import ModalPopup from 'components/ModalPopup';
import Icon from 'components/Icon';
import PropTypes from 'prop-types';

const UnsavedChangesModalPopup = props => (
  <ModalPopup
    isOpen={props.isOpen}
    title="Unsaved changes"
    size={ModalSizes.MEDIUM}
    handleToggle={props.closeModal}
    footer={
      <div>
        <Button
          size="sm"
          color="success"
          className="mr-2"
          onClick={props.handleSave}
        >
          <Icon name="save" /> Save changes
        </Button>
        <Button
          size="sm"
          color="secondary"
          className="mr-2"
          onClick={props.handleDiscard}
        >
          <Icon name="reset" /> Discard changes
        </Button>
        <Button
          size="sm"
          color="secondary"
          className="mr-2"
          outline
          onClick={props.closeModal}
        >
          Cancel
        </Button>
      </div>
    }
  >
    <div className="text-center">
      Do you want to save or discard your unsaved changes before continuing?
    </div>
  </ModalPopup>
);

UnsavedChangesModalPopup.propTypes = {
  isOpen: PropTypes.bool,
  handleSave: PropTypes.func.isRequired,
  handleDiscard: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default UnsavedChangesModalPopup;
