import axios from 'axios';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import { API_URL, TIME_OUT } from './../../config/api';
import {
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE, SIGNUP_RESET,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT,
  TOKEN_REQUEST, TOKEN_SUCCESS, TOKEN_FAILURE,
  PASSREQ_REQUEST, PASSREQ_SUCCESS, PASSREQ_FAILURE, PASSREQ_RESET,
  PASS_RESET_REQUEST, PASS_RESET_SUCCESS, PASS_RESET_FAILURE, PASS_RESET_RESET,
  UPDATE_DETAILS
} from './actionTypes';

import setAuthorizationToken from './../../utils/setAuthorizationToken';
/**
 * @desc LOGIN
 */
export const loginRequest = (data) => (
  {
    type: LOGIN_REQUEST,
    payload: data
  }
);
export const loginSuccess = (data) => (
  {
    type: LOGIN_SUCCESS,
    payload: data
  }
);
export const loginFailure = (error) => (
  {
    type: LOGIN_FAILURE,
    payload: error
  }
);
export const requestLogout = () => (
  {
    type: LOGOUT
  }
);

/**
 * @desc TOKEN
 */
export const tokenRequest = () => (
  {
    type: TOKEN_REQUEST,
  }
);
export const tokenSuccess = () => (
  {
    type: TOKEN_SUCCESS
  }
);
export const tokenError = (error) => (
  {
    type: TOKEN_FAILURE,
    payload: error
  }
);

/**
 * @desc SIGNUP
 */
export const signupRequest = () => (
  {
    type: SIGNUP_REQUEST,
  }
);
export const signupSuccess = (msg) => (
  {
    type: SIGNUP_SUCCESS,
    payload: msg
  }
);
export const signupFailure = (error) => (
  {
    type: SIGNUP_FAILURE,
    payload: error
  }
);
export const signupReset = () => (
  {
    type: SIGNUP_RESET
  }
);

/**
 * @desc PASSWORD REQUEST
 */
export const passReqRequest = () => (
  {
    type: PASSREQ_REQUEST
  }
);
export const passReqSuccess = (msg) => (
  {
    type: PASSREQ_SUCCESS,
    payload: msg
  }
);
export const passReqFailure = (error) => (
  {
    type: PASSREQ_FAILURE,
    payload: error
  }
);
export const passReqReset = (error) => (
  {
    type: PASS_RESET_RESET
  }
);

/**
 * @desc PASSWORD RESET
 */
export const passResetRequest = () => (
  {
    type: PASS_RESET_REQUEST
  }
);
export const passResetSuccess = (msg) => (
  {
    type: PASS_RESET_SUCCESS,
    payload: msg
  }
);
export const passResetFailure = (error) => (
  {
    type: PASS_RESET_FAILURE,
    payload: error
  }
);

export const passResetReset = (error) => (
  {
    type: PASS_RESET_RESET
  }
);

export const updateDetails = (data) => (
  {
    type: UPDATE_DETAILS,
    payload: {
      avatar: data.avatar,
      name: data.name
    }
  }
);

/**
 * @desc API CALLS
 */

export const tokenFailure = (error) =>
  dispatch => {
    localStorage.removeItem('id_token');
    setAuthorizationToken(false);
    dispatch(tokenError(error));
    browserHistory.push('/login');
  };

export const refreshToken = (creds) =>
  dispatch => {
    dispatch(tokenRequest());
    axios({
      method: 'post',
      url: `${API_URL}/refresh-token`,
      timeout: TIME_OUT
    }).then(response => {
      const token = response.data;
      localStorage.setItem('id_token', token);
      setAuthorizationToken(token);
      dispatch(tokenSuccess());
    })
    .catch((error) => {
      if (!error.response) {
        dispatch(tokenFailure('Network Error, try again later !'));
      } else {
        dispatch(tokenFailure(error.response.data.error));
      }
    });
  };

export const login = (cred) =>
  dispatch => {
    dispatch(signupRequest());
    axios({
      method: 'post',
      url: `${API_URL}/login`,
      data: {
        email: cred.email,
        password: cred.password
      },
      timeout: TIME_OUT
    })
    .then(response => {
      const token = response.data.token;
      localStorage.setItem('id_token', token);
      setAuthorizationToken(token);
      dispatch(loginSuccess(jwtDecode(token)));
      browserHistory.push('/');
    })
    .catch(error => {
      if (!error.response) {
        dispatch(loginFailure('Network Error, try again later'));
      } else {
        if (error.response.status === 500) {
          dispatch(loginFailure('Internal Server Error, try again later'));
        } else {
          dispatch(loginFailure('Validation Error, check your email / password !'));
        }
      }
    });
  };

export const logout = () =>
  dispatch => {
    localStorage.removeItem('id_token');
    setAuthorizationToken(false);
    dispatch(requestLogout());
    browserHistory.push('/login');
  };

export const passwordRequest = (data) =>
  dispatch => {
    axios({
      method: 'post',
      url: `${API_URL}/password-request`,
      data: {
        email: data.email
      },
      timeout: TIME_OUT
    })
    .then(response => {
      dispatch(passReqSuccess('Check you email for instruction to reset Password'));
    })
    .catch(error => {
      if (!error.response) {
        dispatch(passReqFailure('Network Error, try again later'));
      } else {
        if (error.response.status === 500) {
          dispatch(passReqFailure('Internal Server Error, try again later'));
        } else {
          dispatch(passReqFailure('Something went wrong !'));
        }
      }
    });
  };

export const passwordReset = (data) =>
  dispatch => {
    dispatch(passResetRequest());
    axios({
      method: 'post',
      url: `${API_URL}/password-reset/`,
      data: {
        token: data.token,
        password: data.password
      },
      timeout: TIME_OUT
    })
    .then(response => {
      dispatch(passResetSuccess('Your password was changed'));
    })
    .catch(error => {
      if (!error.response) {
        dispatch(passResetFailure('Network Error, try again later'));
      } else {
        if (error.response.status === 500) {
          dispatch(passResetFailure('Internal Server Error, try again later'));
        } else {
          dispatch(passResetFailure('Your Token as expire, Please request a new password again !'));
        }
      }
    });
  };
