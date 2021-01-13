import React from 'react';
import PropTypes from 'prop-types';

import IconButton from 'components/IconButton';

import RequireUserPermission from 'containers/RequireUserPermission';
import {
  CR_CONFIGURATION_EDIT,
  PR_CONFIGURATION_EDIT,
  NG_CONFIGURATION_EDIT,
} from 'constants/permissionTokens';

import * as constants from './constants';

const ConfigurationHeader = props => {
  const renderHeader = () => {
    switch (props.productName) {
      case constants.CR_PRODUCT_NAME:
        return (
          <div>
            Compliance Review Configuration
            <RequireUserPermission token={CR_CONFIGURATION_EDIT}>
              {!props.isEditMode && (
                <IconButton
                  name="edit"
                  className="fslso-blue float-right"
                  onClick={props.onToggleEdit}
                />
              )}
            </RequireUserPermission>
          </div>
        );

      case constants.PR_PRODUCT_NAME:
        return (
          <div>
            Premium Reconciliation Configuration
            <RequireUserPermission token={PR_CONFIGURATION_EDIT}>
              {!props.isEditMode && (
                <IconButton
                  name="edit"
                  className="fslso-blue float-right"
                  onClick={props.onToggleEdit}
                />
              )}
            </RequireUserPermission>
          </div>
        );

      case constants.NG_PRODUCT_NAME:
        return (
          <div>
            Slas NextGen Configuration
            <RequireUserPermission token={NG_CONFIGURATION_EDIT}>
              {!props.isEditMode && (
                <IconButton
                  name="edit"
                  className="fslso-blue float-right"
                  onClick={props.onToggleEdit}
                />
              )}
            </RequireUserPermission>
          </div>
        );

      default:
        return <div />;
    }
  };

  return renderHeader();
};

ConfigurationHeader.propTypes = {
  crAppConfig: PropTypes.object.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
};

export default ConfigurationHeader;
