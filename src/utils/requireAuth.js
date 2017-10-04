import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import axios from 'axios';
import { API_URL, TIME_OUT } from './../config/api';
import setAuthorizationToken from './setAuthorizationToken';
import { tokenFailure, refreshToken } from './../modules/auth/actionCreators';

export default (ComposedComponent, role) => {
  class Authenticate extends Component {
    componentWillMount() {
      if (!localStorage.id_token || !this.props.isAuthenticated) {
        this.props.tokenFailure('Autentication Error !');
      } else {
        setAuthorizationToken(localStorage.id_token);
        this.props.refreshToken();
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        browserHistory.push('/login');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    role: PropTypes.string,
    tokenFailure: PropTypes.func.isRequired,
    refreshToken: PropTypes.func.isRequired
  };

/*
  Authenticate.contextTypes = {
    router: PropTypes.object.isRequired
  };
  this.context.router.push('/login');
*/
  const mapStateToProps = (state) => (
    {
      isAuthenticated: state.authReducer.isAuthenticated,
      role: state.authReducer.user.role
    }
  );

  return connect(mapStateToProps, { tokenFailure, refreshToken })(Authenticate);
};
