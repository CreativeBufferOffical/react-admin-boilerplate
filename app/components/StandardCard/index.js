import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardTitle, CardText, CardFooter } from 'reactstrap';

const StandardCard = ({ title, footer, children, centerTitle }) => (
  <Card>
    <CardBody>
      {title && (
        <CardTitle className={`blue-border ${centerTitle && 'centered'}`}>
          <h1>{title}</h1>
        </CardTitle>
      )}
      <CardText tag="div" className="p-0">
        {children}
      </CardText>
      {footer && <CardFooter>{footer}</CardFooter>}
    </CardBody>
  </Card>
);

StandardCard.propTypes = {
  title: PropTypes.any,
  centerTitle: PropTypes.bool,
  footer: PropTypes.any,
  children: PropTypes.any.isRequired,
};

export default StandardCard;
