import React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import './styles.scss';

const NavTab = props => (
  <NavItem>
    <NavLink href={props.href}>{props.children}</NavLink>
  </NavItem>
);

NavTab.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.any,
};

export default NavTab;
