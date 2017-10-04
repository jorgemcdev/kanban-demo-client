import axios from 'axios';
import toastr from 'toastr';

import { API_URL, TIME_OUT } from './../../config/api';
import {
  LISTS_REQUEST, LISTS_SUCCESS, LISTS_FAILURE,
  LISTS_CHANGE_REQUEST, LISTS_CHANGE_SUCCESS, LISTS_CHANGE_FAILURE, LISTS_RESET,
  LISTS_NEW_REQUEST, LISTS_NEW_SUCCESS, LISTS_NEW_FAILURE,
  LISTS_UPDATE_REQUEST, LISTS_UPDATE_SUCCESS, LISTS_UPDATE_FAILURE,
  LISTS_DELETE_REQUEST, LISTS_DELETE_SUCCESS, LISTS_DELETE_FAILURE
} from './actionTypes';

import { loadCards } from './../cards/actionCreators';

/* Card Change List */
const listsChangeRequest = () => (
  {
    type: LISTS_CHANGE_REQUEST,
  }
);
const listsChangeSuccess = () => (
  {
    type: LISTS_CHANGE_SUCCESS
  }
);
const listsChangeFailure = (error) => (
  {
    type: LISTS_CHANGE_FAILURE,
    payload: error
  }
);

/* Lists */
const listsRequest = () => (
  {
    type: LISTS_REQUEST,
  }
);
const listsSuccess = (data) => (
  {
    type: LISTS_SUCCESS,
    payload: data
  }
);
const listsFailure = (error) => (
  {
    type: LISTS_FAILURE,
    payload: error
  }
);

export const listsReset = () => (
  {
    type: LISTS_RESET
  }
);

/* Lists */
export const listsNewRequest = () => (
  {
    type: LISTS_NEW_REQUEST,
  }
);
export const listsNewSuccess = (data) => (
  {
    type: LISTS_NEW_SUCCESS,
    payload: data
  }
);
export const listsNewFailure = (error) => (
  {
    type: LISTS_NEW_FAILURE,
    payload: error
  }
);

// List Update by ID
export const listsUpdateRequest = () => (
  {
    type: LISTS_UPDATE_REQUEST,
  }
);
export const listsUpdateSuccess = (data) => (
  {
    type: LISTS_UPDATE_SUCCESS,
    payload: data
  }
);
export const listsUpdateFailure = (error) => (
  {
    type: LISTS_UPDATE_FAILURE,
    payload: error
  }
);

// List Delete by ID
export const listsDeleteRequest = () => (
  {
    type: LISTS_DELETE_REQUEST,
  }
);
export const listsDeleteSuccess = (id) => (
  {
    type: LISTS_DELETE_SUCCESS,
    payload: id
  }
);
export const listsDeleteFailure = (error) => (
  {
    type: LISTS_DELETE_FAILURE,
    payload: error
  }
);

export const listsFomSocket = (data) =>
  dispatch => {
    dispatch(listsSuccess(data));
  };

export const loadLists = (boardId) =>
  dispatch => {
    dispatch(listsRequest());
    axios({
      method: 'post',
      url: `${API_URL}/lists`,
      data: {
        _board: boardId
      },
      timeout: TIME_OUT
    })
    .then(response => {
      dispatch(listsSuccess(response.data.lists));
      dispatch(loadCards(boardId));
    })
    .catch(error => {
      if (!error.response) {
        dispatch(listsFailure('Network Error, try again later'));
      } else {
        if (error.response.status === 500) {
          dispatch(listsFailure('Internal Server Error, try again later'));
        } else {
          dispatch(listsFailure('Something went wrong !'));
        }
      }
    });
  };

export const newList = (boardId, socket) =>
  dispatch => {
    dispatch(listsNewRequest());
    axios({
      method: 'post',
      url: `${API_URL}/list`,
      data: {
        name: 'New List',
        _board: boardId
      },
      timeout: TIME_OUT
    })
    .then(response => {
      dispatch(listsNewSuccess(response.data.list));
      socket.emit('list', 'List New');
    })
    .catch(error => {
      if (!error.response) {
        dispatch(listsNewFailure('Network Error, try again later'));
      } else {
        if (error.response.status === 500) {
          dispatch(listsNewFailure('Internal Server Error, try again later'));
        } else {
          dispatch(listsNewFailure('Something went wrong !'));
        }
      }
    });
  };

export const listsUpdate = (data, socket) =>
  dispatch => {
    dispatch(listsUpdateRequest());
    axios({
      method: 'put',
      url: `${API_URL}/list/${data.id}`,
      data: {
        name: data.name
      },
      timeout: TIME_OUT
    })
    .then(response => {
      dispatch(listsUpdateSuccess(response.data.list));
      socket.emit('list', 'List Update');
    })
    .catch(error => {
      if (!error.response) {
        dispatch(listsUpdateFailure('Network Error, try again later'));
      } else {
        if (error.response.status === 500) {
          dispatch(listsUpdateFailure('Internal Server Error, try again later'));
        } else {
          dispatch(listsUpdateFailure('Something went wrong !'));
        }
      }
    });
  };

export const listsDelete = (id, socket) =>
  dispatch => {
    dispatch(listsDeleteRequest());
    axios({
      method: 'delete',
      url: `${API_URL}/list/${id}`,
      timeout: TIME_OUT
    })
    .then(response => {
      dispatch(listsDeleteSuccess(id));
      toastr.warning('List Deleted !');
      socket.emit('list', 'List Delete');
    })
    .catch(error => {
      if (!error.response) {
        dispatch(listsDeleteFailure('Network Error, try again later'));
      } else {
        if (error.response.status === 500) {
          dispatch(listsDeleteFailure('Internal Server Error, try again later'));
        } else {
          dispatch(listsDeleteFailure('Something went wrong !'));
        }
      }
    });
  };
