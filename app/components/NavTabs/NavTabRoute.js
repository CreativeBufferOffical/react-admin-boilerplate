import React from 'react';
import { NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles.scss';

const NavTabRoute = props => (
  <NavItem>
    <NavLink
      exact={props.exact}
      strict={props.strict}
      className="nav-link"
      to={props.to}
    >
      {props.children}
    </NavLink>
  </NavItem>
);

NavTabRoute.propTypes = {
  to: PropTypes.any.isRequired,
  children: PropTypes.any,
  exact: PropTypes.bool,
  strict: PropTypes.bool,
};

export default NavTabRoute;
