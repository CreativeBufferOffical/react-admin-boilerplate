import React from 'react';
import PropTypes from 'prop-types';
import { ModalSizes } from 'constants/modalConstants';
import ModalPopup from 'components/ModalPopup';
import { Button } from 'reactstrap';

function ErrorModal(props) {
  const { isOpen, title, message, onClose } = props;
  return (
    <ModalPopup
      isOpen={isOpen}
      isError
      title={title}
      size={ModalSizes.LARGE}
      handleToggle={onClose}
      footer={
        <Button size="sm" color="secondary" outline onClick={onClose}>
          CLOSE
        </Button>
      }
    >
      <div className="text-center">{message}</div>
    </ModalPopup>
  );
}

ErrorModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
};

export default ErrorModal;
