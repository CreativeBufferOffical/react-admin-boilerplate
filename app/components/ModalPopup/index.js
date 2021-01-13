import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';

const ModalPopup = props => (
  <Modal
    isOpen={props.isOpen}
    toggle={props.handleToggle}
    centered={props.centered}
    className={`${props.isError ? 'modal-error' : ''} modal-${props.size}`}
  >
    <ModalHeader toggle={props.handleToggle}>
      {props.isError && <Icon name="alert" />}
      {props.title}
    </ModalHeader>
    <ModalBody>{props.children}</ModalBody>
    <ModalFooter>{props.footer}</ModalFooter>
  </Modal>
);

ModalPopup.propTypes = {
  isError: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func,
  title: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  footer: PropTypes.any,
  children: PropTypes.any,
  centered: PropTypes.bool,
};

export default ModalPopup;
