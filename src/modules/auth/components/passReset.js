/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { API_URL, TIME_OUT } from './../../../config/api';
import { passwordReset, passResetReset } from './../actionCreators';
import setAuthorizationToken from './../../../utils/setAuthorizationToken';

import renderField from './../../common/utils/render-field';
import AlertDismiss from './../../common/utils/alert-dismiss';
import Alert from './../../common/utils/alert';
import Loading from './../../common/utils/loading';
// http://www.the-art-of-web.com/javascript/validate-password/
const validate = values => {
  const errors = {};
  if (!values.password) {
    errors.password = 'Please enter a password';
  }
  if (values.password.lenght < 6) {
    errors.password = 'Password must contain at least 6 characters!';
  }
  if (!values.passconf) {
    errors.passconf = 'Please enter a password confirmation';
  }
  if (values.password !== values.passwordconf) {
    errors.passconf = 'Passwords dont match';
  }
  return errors;
};

class PassReset extends Component {

  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  componentWillMount() {
    this.props.passResetReset();
  }

  componentWillUnmount() {
    this.props.passResetReset();
  }

  onDismiss(e) {
    e.preventDefault();
    this.props.passResetReset();
  }

  formSubmit(e) {
    const data = {
      token: this.props.token,
      password: e.password,
      passwordConf: e.passwordConf
    };
    this.props.passwordReset(data);
  }

  render() {
    const {
      handleSubmit, error, pristine, submitting, reset, valid,
      isLoading, errors, message
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
    const AlertMessage = (props) => {
      if (!props.message) {
        return null;
      }
      return (
        <Alert
          style="alert-info"
          title="Password Request"
          text={props.message}
        />
      );
    };
    const form = (
      <div>
        <form onSubmit={handleSubmit(this.formSubmit)}>
          <Field
            name="password"
            type="password"
            component={renderField}
            label="New Password"
          />
          <Field
            name="passwordConf"
            type="password"
            component={renderField}
            label="Password Confirmation"
          />
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
          <div className="panel-heading">Password Reset</div>
          <div className="panel-body">
            {message ? <AlertMessage message={message} /> : form}
          </div>
        </div>
      </div>
    );

    return (
      _render
    );
  }
}

const mapStateToProps = (state, ownProps) => (
  {
    token: ownProps.params.token,
    isAuthenticated: state.authReducer.isAuthenticated,
    isLoading: state.authReducer.isLoading,
    message: state.authReducer.message,
    errors: state.authReducer.errors
  }
);

const form = reduxForm({
  form: 'request-password',
  fields: ['password', 'passwordConf'],
  validate
});

export default connect(mapStateToProps, { passwordReset, passResetReset })(form(PassReset));
