/**
 *
 * Header
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { NavbarBrand } from 'reactstrap';
import { NavLink, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { compose } from 'redux';
import logo from 'images/logo-mainnav.png';
import Icon from '../Icon';

const NavBarBrandStyled = styled(props => <NavbarBrand {...props} />)`
  color: #00263e;
  cursor: pointer;
  float: left;
  padding: 0 !important;
  margin: 0;
  height: 100%;

  display: flex !important;
  align-items: center;
`;

const NavLinkStyled = styled(props => <NavLink {...props} />)`
  cursor: pointer;
  color: #0075c9 !important;
  width: auto;
  padding: 20px;
  height: 68px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 3px solid transparent;

  &:hover {
    text-decoration: none;
    border-top: 3px solid #0075c9;
    background-color: whitesmoke;

    span {
      font-weight: bold;
    }
  }
`;

const SpanStyled = styled.span`
  height: 15px;
  vertical-align: middle;
  margin-left: 8px;
  width: auto;
  color: #00263e;
  font-family: 'Lato', serif;
  font-size: 13px;
  letter-spacing: 0.5px;
  line-height: 15px;
  display: block;
`;

const NavGrid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const activeNavStyle = {
  backgroundColor: '#F4F4F4',
  boxShadow: '0px 5px 0px #F4F4F4',
  fontWeight: 'bold',
  borderTop: '3px solid #0075c9',
  height: '63px',
};

const Navigation = () =>
  ReactDOM.createPortal(
    <React.Fragment>
      <NavBarBrandStyled>
        <img src={logo} width={65} alt="SLAS NextGen Admin" />
      </NavBarBrandStyled>
      <NavGrid>
        <NavLinkStyled to="/users" exact activeStyle={activeNavStyle}>
          <Icon name="mainnav-users" />
          <SpanStyled>User Management</SpanStyled>
        </NavLinkStyled>
        <NavLinkStyled to="/configuration" exact activeStyle={activeNavStyle}>
          <Icon name="mainnav-settings" />
          <SpanStyled>Configuration</SpanStyled>
        </NavLinkStyled>
      </NavGrid>
    </React.Fragment>,
    document.getElementById('app-specific-navigation'),
  );

export default compose(withRouter)(Navigation);
