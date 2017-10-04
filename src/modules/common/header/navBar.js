import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { logout } from './../../auth/actionCreators';
import NavBarPublic from './navBarPublic';
import NavBarMember from './navBarMember';

const NavBar = (props) => {
  const _render = (
    <div>
      {props.isAuthenticated
      ?
        <NavBarMember
          logout={props.logout}
          name={props.name}
          avatar={props.avatar}
        />
      :
        <NavBarPublic />
      }
    </div>
  );
  return (
    _render
  );
};

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  name: PropTypes.string,
  avatar: PropTypes.string
};

const mapStateToProps = (state) => (
  {
    isAuthenticated: state.authReducer.isAuthenticated,
    token: state.authReducer.token,
    name: state.authReducer.user.name,
    avatar: state.authReducer.user.avatar
  }
);

export default connect(mapStateToProps, { logout })(NavBar);
