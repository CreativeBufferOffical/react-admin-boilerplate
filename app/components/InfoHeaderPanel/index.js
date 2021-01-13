import React from 'react';
import { Card } from 'reactstrap';
import PropTypes from 'prop-types';

import './styles.scss';

const InfoHeaderPanel = ({ children }) => (
  <Card className="page-header info-header-panel"> {children} </Card>
);

InfoHeaderPanel.propTypes = {
  children: PropTypes.any,
};

export default InfoHeaderPanel;
