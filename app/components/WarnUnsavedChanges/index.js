import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Prompt, withRouter } from 'react-router-dom';
import UnsavedChangesModalPopup from 'containers/UnsavedChangesModal/UnsavedChangesModalPopup';

export class WarnUnsavedChanges extends React.PureComponent {
  handleWindowClose(ev) {
    const message = 'You have unsaved changes, are you sure you want to leave?';
    ev.returnValue = message; // eslint-disable-line no-param-reassign
    return message;
  }

  addCloseListener = () =>
    window.addEventListener('beforeunload', this.handleWindowClose, true);

  removeCloseListener = () =>
    window.removeEventListener('beforeunload', this.handleWindowClose, true);

  componentDidMount() {
    if (this.props.blockOn) this.addCloseListener();
  }

  componentWillUpdate(nextProps) {
    if (!this.props.blockOn && nextProps.blockOn) this.addCloseListener();
    if (this.props.blockOn && !nextProps.blockOn) this.removeCloseListener();
  }

  componentWillUnmount() {
    this.removeCloseListener();
  }

  state = {
    modalOpen: false,
    confirmed: false,
    location: null,
  };

  showModal = location => this.setState({ modalOpen: true, location });

  closeModal = callback => this.setState({ modalOpen: false }, callback);

  handleBlock = location => {
    if (!this.state.confirmed) {
      this.showModal(location);
      return false;
    }
    return true;
  };

  handleSave = () => {
    this.props.handleSave();
    this.closeModal(() => {
      this.setState({ confirmed: true }, () =>
        this.props.history.push(this.state.location),
      );
    });
  };

  handleDiscard = () =>
    this.closeModal(() => {
      this.setState({ confirmed: true }, () =>
        this.props.history.push(this.state.location),
      );
    });

  render() {
    return (
      <React.Fragment>
        <Prompt when={this.props.blockOn} message={this.handleBlock} />
        <UnsavedChangesModalPopup
          handleSave={this.handleSave}
          handleDiscard={this.handleDiscard}
          closeModal={() => this.closeModal(null)}
          isOpen={this.state.modalOpen}
        />
      </React.Fragment>
    );
  }
}

WarnUnsavedChanges.propTypes = {
  blockOn: PropTypes.any.isRequired,
  history: PropTypes.object.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default compose(withRouter)(WarnUnsavedChanges);
