/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';

import * as userActions from './../actionCreators';
import * as Api from './../api';

import renderField from './../../common/utils/render-field';
import AlertDismiss from './../../common/utils/alert-dismiss';
import Alert from './../../common/utils/alert';
import LoadingIcon from './../../common/utils/loading-icon';

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
  if (!values.newpassword) {
    errors.newpassword = 'Please enter the New password';
  }
  if (!values.confpassword) {
    errors.confpassword = 'Please password confirmation';
  }
  if (values.newpassword !== values.confpassword) {
    errors.confpassword = 'Passwords dont match';
  }
  return errors;
};

class UserChangePass extends Component {

  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  componentWillMount() {
    this.props.userDataRequest();
    Api.apiUserData(this.props.userId)
    .then(response => {
      this.props.userDataSuccess(response.data.user);
    })
    .catch(error => {
      if (!error.response) {
        this.props.userDataFailure('Network Error, try again later');
      } else {
        if (error.response.status === 500) {
          this.props.userDataFailure('Internal Server Error, try again later');
        } else {
          this.props.userDataFailure('Something went wrong !');
        }
      }
    });
  }

  componentWillUnmount() {
    // this.props.userDataReset();
  }

  onDismiss(e) {
    e.preventDefault();
    this.props.userInfoReset();
  }

  formSubmit(e) {
    const data = {
      email: this.props.email,
      password: e.password,
      newpassword: e.newpassword
    };
    this.props.userPassChangeRequest();
    Api.apiUserChangePass(data)
    .then(result => {
      this.props.userPassChangeSuccess('Password changed !');
    })
    .catch(error => {
      if (!error.response) {
        this.props.userPassChangeFailure('Network Error, try again later');
      } else {
        if (error.response.status === 500) {
          this.props.userPassChangeFailure('Internal Server Error, try again later');
        } else {
          this.props.userPassChangeFailure('Something went wrong !');
        }
      }
    });
    // Reset Form
    this.props.reset();
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
          title="Change Password"
          text={errors}
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
            label="Your Current Password"
          />
          <Field
            name="newpassword"
            type="password"
            component={renderField}
            label="Type the New"
          />
          <Field
            name="confpassword"
            type="password"
            component={renderField}
            label="Please confirm you password again"
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
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">
            Change Password&nbsp;
            <LoadingIcon color="black" isLoading={isLoading} />
          </div>
          <div className="panel-body">
            <div className="col-xs-12 col-md-8">
              <AlertErrors errors={errors} />
              <AlertMessage message={message} />
              {form}
            </div>
            <div className="col-md-4 hidden-xs">
              <div className="well">
                <h2>
                  <span className="glyphicon glyphicon-lock" aria-hidden="true"></span>
                  &nbsp;Password
                </h2>
                <h3>Change</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      _render
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.authReducer.user.id,
  email: state.settingsReducer.user.email,
  isLoading: state.settingsReducer.isLoading,
  message: state.settingsReducer.message,
  errors: state.settingsReducer.errors
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(userActions, dispatch)
);

const form = reduxForm({
  form: 'user-change-password',
  fields: ['email', 'password', 'newpassword', 'confpassword'],
  validate
});

export default connect(mapStateToProps, mapDispatchToProps)(form(UserChangePass));
