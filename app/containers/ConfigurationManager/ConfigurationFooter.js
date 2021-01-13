import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';
import LoadingButton from 'components/LoadingButton';
import { ButtonColors } from 'constants/buttonConstants';

const ConfigurationFooter = props =>
  props.isEditMode ? (
    <React.Fragment>
      <Button
        color="secondary"
        className="float-right"
        size="sm"
        outline
        onClick={props.onToggleEdit}
      >
        Cancel
      </Button>
      <LoadingButton
        className="float-right mr-2"
        text="Save"
        iconName="save"
        color={ButtonColors.SUCCESS}
        onClick={props.onSaveChanges}
      />
    </React.Fragment>
  ) : null;

ConfigurationFooter.propTypes = {
  isEditMode: PropTypes.bool.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  onSaveChanges: PropTypes.func.isRequired,
};

export default ConfigurationFooter;
