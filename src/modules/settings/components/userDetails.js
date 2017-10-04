/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone';

import * as userActions from './../actionCreators';
import { updateDetails } from './../../auth/actionCreators';
import * as Api from './../api';

import { UPLOADS_URL } from './../../../config/api';

import renderField from './../../common/utils/render-field';
import AlertDismiss from './../../common/utils/alert-dismiss';
import Loading from './../../common/utils/loading';
import ModalConfirm from './../../common/utils/modal-confirm';
import UserFileAvatar from './userFileAvatar';

import LoadingIcon from './../../common/utils/loading-icon';

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Please enter your First Name';
  }
  if (!values.lastname) {
    errors.lastname = 'Please enter your Last Name';
  }
  return errors;
};

class UserDetails extends Component {

  constructor(props) {
    super(props);
    this.state = { uploadedAvatar: '', file: '', upload: '', isOpenLogout: false };
    this.formSubmit = this.formSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onImageDrop = this.onImageDrop.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  componentWillMount() {
    this.props.actions.user.userDataRequest();
    Api.apiUserData(this.props.userId)
    .then(response => {
      this.props.actions.user.userDataSuccess(response.data.user);
    })
    .catch(error => {
      if (!error.response) {
        this.props.actions.user.userDataFailure('Network Error, try again later');
      } else {
        if (error.response.status === 500) {
          this.props.actions.user.userDataFailure('Internal Server Error, try again later');
        } else {
          this.props.actions.user.userDataFailure('Something went wrong !');
        }
      }
    });
  }

  onDismiss(e) {
    e.preventDefault();
    this.props.actions.user.userInfoReset();
  }

  onImageDrop(files) {
    this.setState(prevState => ({
      uploadedAvatar: files[0].preview,
      file: files[0],
    }));
  }

  toggleModal() {
    this.setState(prevState => (
      { isOpenLogout: !prevState.isOpenLogout }
    ));
  }

  handleConfirm(e) {
    this.toggleModal();
  }

  formSubmit(e) {
    this.toggleModal();
    const name = this.name.value;
    const lastname = this.lastname.value;
    // UPLOAD if we a Avatar
    if (this.state.file) {
      this.props.actions.user.userUploadRequest();
      Api.apiUserImageUpload(this.state.file)
      .then(response => {
        const newAvatar = response.data.avatar;
        this.props.actions.user.userUploadSuccess(newAvatar);
        this.setState(prevState => ({
          upload: newAvatar
        }));
      })
      .then(() => {
        const data = {
          id: this.props.userId, name, lastname, avatar: this.state.upload
        };
        this.props.actions.user.userUpdateRequest();
        Api.apiUserUpdate(data)
        .then(response => {
          this.props.actions.user.userUpdateSuccess(response.data.user);
          this.props.actions.auth.updateDetails({ name, avatar: this.state.upload });
        })
        .catch(error => {
          this.props.actions.user.userUpdateFailure('Upload Error !');
        });
      })
      .catch(error => {
        this.props.actions.user.userUploadFailure('Upload Error !');
      });
    } else {
      // No Image Save only Details
      const data = {
        id: this.props.userId, name, lastname
      };
      this.props.actions.user.userUpdateRequest();
      Api.apiUserUpdate(data)
      .then(response => {
        this.props.actions.user.userUpdateSuccess(response.data.user);
        this.props.actions.auth.updateDetails({ name, avatar: response.data.user.avatar });
      })
      .catch(error => {
        this.props.actions.user.userUpdateFailure('Upload Error !');
      });
    }
  }

  render() {
    const {
      handleSubmit, error, pristine, submitting, reset, valid,
      actions, isLoading, message, errors
    } = this.props;

    const AlertErrors = (props) => {
      if (!props.errors) {
        return null;
      }
      return (
        <AlertDismiss
          style="alert-danger"
          title="Change Details"
          text={props.errors}
          onDismiss={this.onDismiss}
        />
      );
    };
    const form = (
      <div>
        <form onSubmit={handleSubmit(this.handleConfirm)}>
          <Field
            name="name" type="text"
            component={renderField} label="First Name"
            ref={(input) => { this.name = input; }}
          />
          <Field
            name="lastname" type="text"
            component={renderField} label="Last Name"
            ref={(input) => { this.lastname = input; }}
          />
          <div>
            <label className="control-label">Avatar</label>
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <img
                    src={
                      this.state.uploadedAvatar ||
                      `${this.props.initialValues.avatar}`
                    }
                    role="presentation"
                    width="200px"
                    height="200px"
                  />
                </div>
                <div className="col-md-6">
                  <UserFileAvatar onImageDrop={this.onImageDrop} />
                </div>
              </div>
            </div>
          </div>

          <div>
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
          </div>
        </form>
      </div>
    );

    const _render = (
      <div>

        <div className="panel panel-default">
          <div className="panel-heading">
            Edit profile&nbsp;
            <LoadingIcon color="black" isLoading={isLoading} />
          </div>
          <div className="panel-body">
            <div className="col-sx-12 col-md-8">
              <AlertErrors errors={errors} />
              {form}
            </div>
            <div className="col-md-4 hidden-xs">
              <div className="well">
                <h2>
                  <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
                  &nbsp;User&nbsp;
                </h2>
                <h3>Details</h3>
              </div>
            </div>
          </div>
        </div>
        <ModalConfirm
          show={this.state.isOpenLogout}
          onClose={this.toggleModal}
          onConfirm={this.formSubmit}
          title="Confirm"
          text="Save details ?"
        />
      </div>
    );

    return (
      _render
    );
  }
}

const mapStateToProps = (state) => (
  {
    userId: state.authReducer.user.id,
    isLoading: state.settingsReducer.isLoading,
    message: state.settingsReducer.message,
    errors: state.settingsReducer.errors,
    initialValues: {
      name: state.settingsReducer.user.name,
      lastname: state.settingsReducer.user.lastname,
      avatar: state.settingsReducer.user.avatar || `${UPLOADS_URL}/uploads/avatar.jpg`
    }
  }
);

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      user: bindActionCreators(userActions, dispatch),
      auth: bindActionCreators({ updateDetails }, dispatch)
    }
  };
}

const form = reduxForm({
  form: 'user-details',
  fields: ['name', 'lastname'],
  validate,
  enableReinitialize: true
});

export default connect(mapStateToProps, mapDispatchToProps)(form(UserDetails));
