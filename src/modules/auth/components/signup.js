/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';

import { API_URL, TIME_OUT } from './../../../config/api';
import {
  signupRequest, signupSuccess, signupFailure, signupReset, login
} from './../actionCreators';

import renderField from './../../common/utils/render-field';
import AlertDismiss from './../../common/utils/alert-dismiss';
import Loading from './../../common/utils/loading';

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Please enter your Name';
  }
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
  if (values.password !== values.passconf) {
    errors.passconf = 'Passwords do not match';
  }
  return errors;
};

const asyncValidate = (values, dispatch) => (
  new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${API_URL}/user-exists`,
      data: {
        email: values.email
      },
      timeout: TIME_OUT,
      responseType: 'json'
    })
    .then(response => {
      if (response.data.success === true) {
        reject({ email: 'That username is taken' });
      } else {
        resolve();
      }
    })
    .catch((error) => {
      if (!error.response) {
        resolve({ email: 'network error, try again later' });
      } else {
        resolve({ email: 'server error' });
      }
    });
  })
);

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  componentWillMount() {
    this.props.actions.signupReset();
  }

  onDismiss(e) {
    e.preventDefault();
    this.props.actions.signupReset();
  }

  formSubmit(e) {
    const data = {
      name: e.name,
      lastname: e.lastname,
      email: e.email,
      password: e.password,
      passconf: e.passconf
    };
    this.props.actions.signupRequest();
    axios({
      method: 'post',
      url: `${API_URL}/signup`,
      data,
      timeout: 5000,
      responseType: 'json'
    })
    .then(response => {
      this.props.actions.signupSuccess('Signup Success');
      this.props.actions.login({ email: data.email, password: data.password });
    })
    .catch(error => {
      if (!error.response) {
        this.props.actions.signupFailure('Network Error, try again later');
      } else {
        if (error.response.status === 500) {
          this.props.actions.signupFailure('Internal Server Error, try again later');
        } else {
          this.props.actions.signupFailure('Something went wrong !');
        }
      }
    });
  }

  render() {
    const {
      handleSubmit, asyncValidating, error, pristine, submitting, reset, valid,
      actions, isLoading, message, errors
    } = this.props;

    const AlertErrors = (props) => {
      if (!props.errors) {
        return null;
      }
      return (
        <AlertDismiss
          style="alert-danger"
          title="SignUp"
          text={errors}
          onDismiss={this.onDismiss}
        />
      );
    };

    const form = (
      <div>
        <form onSubmit={handleSubmit(this.formSubmit)}>
          <Field name="name" type="text" component={renderField} label="First Name" />
          <Field name="lastname" type="text" component={renderField} label="Last Name" />
          <Field name="email" type="text" component={renderField} label="Email" />
          {asyncValidating === 'email' &&
            <span className="glyphicon glyphicon-refresh glyphicon-spin"></span>
          }
          <Field name="password" type="password" component={renderField} label="Password" />
          <Field
            name="passconf"
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
          <button
            className="btn btn-default pull-right"
            disabled={pristine || submitting}
            onClick={reset}
          >Reset
          </button>
        </form>
      </div>
    );

    const _render = (
      <div className="col-sm-12 col-md-6 col-md-offset-3">
        {isLoading && <Loading />}
        <AlertErrors errors={errors} />
        <div className="panel panel-default">
          <div className="panel-heading">SignUp</div>
          <div className="panel-body">
            {form}
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
    signupRequest, signupSuccess, signupFailure, signupReset, login
  }, dispatch)
});

const form = reduxForm({
  form: 'signup',
  fields: ['name', 'lastname', 'email', 'password', 'passconf'],
  asyncValidate,
  asyncBlurFields: ['email'],
  validate
});

export default connect(mapStateToProps, mapDispatchToProps)(form(SignUpForm));
