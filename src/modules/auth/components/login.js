/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { API_URL, TIME_OUT } from './../../../config/api';
import { login, loginRequest, loginSuccess, loginFailure, logout } from './../actionCreators';
import setAuthorizationToken from './../../../utils/setAuthorizationToken';

import renderField from './../../common/utils/render-field';
import AlertDismiss from './../../common/utils/alert-dismiss';
import Loading from './../../common/utils/loading';

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Please enter an email.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Please enter a password';
  }
  if (!values.passconf) {
    errors.passconf = 'Please enter a password confirmation';
  }
  return errors;
};

class Login extends Component {

  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss(e) {
    e.preventDefault();
    this.props.actions.logout();
  }

  formSubmit(e) {
    const cred = {
      email: e.email,
      password: e.password
    };
    this.props.actions.login(cred);
  }

  render() {
    const {
      handleSubmit, error, pristine, submitting, reset, valid,
      actions, isLoading, errors
    } = this.props;

    const AlertErrors = (props) => {
      if (!props.errors) {
        return null;
      }
      return (
        <AlertDismiss
          style="alert-danger"
          title="Login"
          text={props.errors}
          onDismiss={this.onDismiss}
        />
      );
    };

    const form = (
      <div>
        <form onSubmit={handleSubmit(this.formSubmit)}>
          <Field name="email" type="text" component={renderField} label="Email" />
          <Field name="password" type="password" component={renderField} label="Password" />
          <button
            action="submit"
            className="btn btn-primary"
            disabled={!valid}
          >Submit
          </button>
        </form>
      </div>
    );

    const _render = (
      <div className="col-sm-12 col-md-6 col-md-offset-3">
        {isLoading && <Loading />}
        <AlertErrors errors={errors} />
        <div className="panel panel-default">
          <div className="panel-heading">Login</div>
          <div className="panel-body">
            {form}
            <br />
            <p>
              <Link to="/password-request">Lost your Password?</Link>
            </p>
          </div>
        </div>
      </div>
    );

    return (
      _render
    );
  }
}

const mapStateToProps = (state) => (
  {
    isAuthenticated: state.authReducer.isAuthenticated,
    isLoading: state.authReducer.isLoading,
    message: state.authReducer.message,
    errors: state.authReducer.errors
  }
);

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    login, logout
  }, dispatch)
});

const form = reduxForm({
  form: 'signup',
  fields: ['email', 'password'],
  validate
});

export default connect(mapStateToProps, mapDispatchToProps)(form(Login));
