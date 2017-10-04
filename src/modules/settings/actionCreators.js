import axios from 'axios';

import { API_URL, TIME_OUT } from './../../config/api';

import {
USER_PASSCHANGE_REQUEST, USER_PASSCHANGE_SUCCESS, USER_PASSCHANGE_FAILURE,
USER_DATA_REQUEST, USER_DATA_SUCCESS, USER_DATA_FAILURE,
USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAILURE,
USER_UPLOAD_REQUEST, USER_UPLOAD_SUCCESS, USER_UPLOAD_FAILURE,
USER_DATA_RESET, USER_INFO_RESET
} from './actionTypes';

/**
 * @desc USER CHANGE PASSWORD
 */
export const userPassChangeRequest = () => (
  {
    type: USER_PASSCHANGE_REQUEST,
  }
);
export const userPassChangeSuccess = (msg) => (
  {
    type: USER_PASSCHANGE_SUCCESS,
    payload: msg
  }
);
export const userPassChangeFailure = (error) => (
  {
    type: USER_PASSCHANGE_FAILURE,
    payload: error
  }
);

/**
 * @desc USER UPDATE DATA
 */

export const userUpdateRequest = () => (
  {
    type: USER_UPDATE_REQUEST,
  }
);
export const userUpdateSuccess = (data) => (
  {
    type: USER_UPDATE_SUCCESS,
    payload: data
  }
);
export const userUpdateFailure = (error) => (
  {
    type: USER_UPDATE_FAILURE,
    payload: error
  }
);

/**
 * @desc USER LOAD DATA
 */
export const userDataRequest = () => (
  {
    type: USER_DATA_REQUEST,
  }
);
export const userDataSuccess = (data) => (
  {
    type: USER_DATA_SUCCESS,
    payload: data
  }
);
export const userDataFailure = (error) => (
  {
    type: USER_DATA_FAILURE,
    payload: error
  }
);

/**
 * @desc USER LOAD DATA
 */
export const userUploadRequest = () => (
  {
    type: USER_UPLOAD_REQUEST,
  }
);
export const userUploadSuccess = (data) => (
  {
    type: USER_UPLOAD_SUCCESS,
    payload: data
  }
);
export const userUploadFailure = (error) => (
  {
    type: USER_UPLOAD_FAILURE,
    payload: error
  }
);

/**
 * @desc USER INFO RESET
 */
export const userInfoReset = () => (
  {
    type: USER_INFO_RESET
  }
);

/**
 * @desc USER DATA RESET
 */
export const userDataReset = () => (
  {
    type: USER_DATA_RESET
  }
);
