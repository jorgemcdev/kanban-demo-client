import axios from 'axios';
import toastr from 'toastr';

import { API_URL, TIME_OUT, SOCKET_IO_URL } from './../../config/api';
import {
  BOARD_REQUEST, BOARD_SUCCESS, BOARD_FAILURE, BOARD_RESET,
  BOARD_NEW_REQUEST, BOARD_NEW_SUCCESS, BOARD_NEW_FAILURE,
  BOARD_UPDATE_REQUEST, BOARD_UPDATE_SUCCESS, BOARD_UPDATE_FAILURE,
  BOARD_DEL_REQUEST, BOARD_DEL_SUCCESS, BOARD_DEL_FAILURE
} from './actionTypes';

/* Lists Cards */
export const boardsRequest = () => (
  {
    type: BOARD_REQUEST,
  }
);
export const boardsSuccess = (data) => (
  {
    type: BOARD_SUCCESS,
    payload: data
  }
);
export const boardsFailure = (error) => (
  {
    type: BOARD_FAILURE,
    payload: error
  }
);
export const boardsReset = () => (
  {
    type: BOARD_RESET
  }
);

/* New Board */
export const boardsNewRequest = () => (
  {
    type: BOARD_NEW_REQUEST,
  }
);
export const boardsNewSuccess = (data) => (
  {
    type: BOARD_NEW_SUCCESS,
    payload: data
  }
);
export const boardsNewFailure = (error) => (
  {
    type: BOARD_NEW_FAILURE,
    payload: error
  }
);

// Update Board
export const boardsUpdateRequest = () => (
  {
    type: BOARD_UPDATE_REQUEST,
  }
);
export const boardsUpdateSuccess = (data) => (
  {
    type: BOARD_UPDATE_SUCCESS,
    payload: data
  }
);
export const boardsUpdateFailure = (error) => (
  {
    type: BOARD_UPDATE_FAILURE,
    payload: error
  }
);

// DELETE Board
export const boardsDelRequest = () => (
  {
    type: BOARD_DEL_REQUEST,
  }
);
export const boardsDelSuccess = (id) => (
  {
    type: BOARD_DEL_SUCCESS,
    payload: id
  }
);
export const boardsDelFailure = (error) => (
  {
    type: BOARD_DEL_FAILURE,
    payload: error
  }
);


export const boardsFomSocket = (data) =>
  dispatch => {
    dispatch(boardsSuccess(data));
  };

// List Boards
export const boardsList = () =>
  dispatch => {
    dispatch(boardsRequest());
    axios({
      method: 'get',
      url: `${API_URL}/boards`,
      timeout: TIME_OUT
    })
    .then(response => {
      dispatch(boardsSuccess(response.data.boards));
    })
    .catch(error => {
      if (!error.response) {
        dispatch(boardsFailure('Network Error, try again later'));
      } else {
        if (error.response.status === 500) {
          dispatch(boardsFailure('Internal Server Error, try again later'));
        } else {
          dispatch(boardsFailure('Something went wrong !'));
        }
      }
    });
  };

// New
export const boardsNew = (socket) =>
  dispatch => {
    dispatch(boardsNewRequest());
    axios({
      method: 'post',
      url: `${API_URL}/board`,
      data: {
        name: 'New Board'
      },
      timeout: TIME_OUT
    })
    .then(response => {
      dispatch(boardsNewSuccess(response.data.board));
      socket.emit('board', 'Board New');
    })
    .catch(error => {
      if (!error.response) {
        dispatch(boardsNewFailure('Network Error, try again later'));
      } else {
        if (error.response.status === 500) {
          dispatch(boardsNewFailure('Internal Server Error, try again later'));
        } else {
          dispatch(boardsNewFailure('Something went wrong !'));
        }
      }
    });
  };

export const boardsUpdate = (data, socket) =>
  dispatch => {
    dispatch(boardsUpdateRequest());
    axios({
      method: 'put',
      url: `${API_URL}/board/${data.id}`,
      data: {
        name: data.name
      },
      timeout: TIME_OUT
    })
    .then(response => {
      dispatch(boardsUpdateSuccess(response.data.board));
      socket.emit('board', 'Board Update');
    })
    .catch(error => {
      if (!error.response) {
        dispatch(boardsUpdateFailure('Network Error, try again later'));
      } else {
        if (error.response.status === 500) {
          dispatch(boardsUpdateFailure('Internal Server Error, try again later'));
        } else {
          dispatch(boardsUpdateFailure('Something went wrong !'));
        }
      }
    });
  };

export const boardsDelete = (id, socket) =>
  dispatch => {
    dispatch(boardsDelRequest());
    axios({
      method: 'delete',
      url: `${API_URL}/board/${id}`,
      timeout: TIME_OUT
    })
    .then(response => {
      dispatch(boardsDelSuccess(id));
      socket.emit('board', 'Board Delete');
      toastr.warning('Board Deleted !');
    })
    .catch(error => {
      if (!error.response) {
        dispatch(boardsDelFailure('Network Error, try again later'));
        toastr.error('Network Error, try again later');
      } else {
        if (error.response.status === 500) {
          dispatch(boardsDelFailure('Internal Server Error, try again later'));
          toastr.error('Internal Server Error, try again later');
        } else {
          dispatch(boardsDelFailure(error.response.data.error));
          toastr.error(error.response.data.error);
        }
      }
    });
  };

