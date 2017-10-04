import axios from 'axios';
import toastr from 'toastr';

import { API_URL, TIME_OUT } from './../../config/api';
import {
  CARDS_REQUEST, CARDS_SUCCESS, CARDS_FAILURE, CARDS_RESET,
  CARDS_NEW_REQUEST, CARDS_NEW_SUCCESS, CARDS_NEW_FAILURE,
  CARDS_DELETE_REQUEST, CARDS_DELETE_SUCCESS, CARDS_DELETE_FAILURE,
  CARDS_UPDATE_REQUEST, CARDS_UPDATE_SUCCESS, CARDS_UPDATE_FAILURE,
  CARDS_MOVE_SUCCESS, CARDS_MOVE_FAILURE,
  CARDS_ATACH
} from './actionTypes';

/* Lists Cards */
export const cardsRequest = () => (
  {
    type: CARDS_REQUEST,
  }
);
export const cardsSuccess = (data) => (
  {
    type: CARDS_SUCCESS,
    payload: data
  }
);
export const cardsFailure = (error) => (
  {
    type: CARDS_FAILURE,
    payload: error
  }
);
export const cardsReset = () => (
  {
    type: CARDS_RESET
  }
);

/* Lists Cards */
export const cardsNewRequest = () => (
  {
    type: CARDS_NEW_REQUEST,
  }
);
export const cardsNewSuccess = (data) => (
  {
    type: CARDS_NEW_SUCCESS,
    payload: data
  }
);
export const cardsNewFailure = (error) => (
  {
    type: CARDS_NEW_FAILURE,
    payload: error
  }
);

// Move Cards
export const cardsMoveSuccess = (data) => (
  {
    type: CARDS_MOVE_SUCCESS,
    payload: data
  }
);
export const cardsMoveFailure = (error) => (
  {
    type: CARDS_MOVE_FAILURE,
    payload: error
  }
);


// Atach Card to Empty Board
export const cardsAtachSuccess = (data) => (
  {
    type: CARDS_ATACH,
    payload: data
  }
);

// List Update by ID
export const cardsUpdateRequest = () => (
  {
    type: CARDS_UPDATE_REQUEST,
  }
);
export const cardsUpdateSuccess = (data) => (
  {
    type: CARDS_UPDATE_SUCCESS,
    payload: data
  }
);
export const cardsUpdateFailure = (error) => (
  {
    type: CARDS_UPDATE_FAILURE,
    payload: error
  }
);

/* Lists Cards */
export const cardsDelRequest = () => (
  {
    type: CARDS_DELETE_REQUEST,
  }
);
export const cardsDelSuccess = (id) => (
  {
    type: CARDS_DELETE_SUCCESS,
    payload: id
  }
);
export const cardsDelFailure = (error) => (
  {
    type: CARDS_DELETE_FAILURE,
    payload: error
  }
);

// CARDS list
export const loadCards = (boardId) =>
  dispatch => {
    dispatch(cardsRequest());
    axios({
      method: 'post',
      url: `${API_URL}/cards`,
      data: {
        _board: boardId
      },
      timeout: TIME_OUT
    })
    .then(response => {
      dispatch(cardsSuccess(response.data.cards));
    })
    .catch(error => {
      if (!error.response) {
        dispatch(cardsFailure('Network Error, try again later'));
      } else {
        if (error.response.status === 500) {
          dispatch(cardsFailure('Internal Server Error, try again later'));
        } else {
          dispatch(cardsFailure('Something went wrong !'));
        }
      }
    });
  };

export const cardsFromSocket = (data) =>
  dispatch => {
    dispatch(cardsSuccess(data));
  };

export const newCard = (data, socket) =>
  dispatch => {
    dispatch(cardsNewRequest());
    axios({
      method: 'post',
      url: `${API_URL}/card`,
      data: {
        description: 'New Card',
        _list: data.listId,
        _board: data.boardId
      },
      timeout: TIME_OUT
    })
    .then(response => {
      socket.emit('list', 'Card New');
      // socket.emit('card', response.data.card._board);
      dispatch(cardsNewSuccess(response.data.card));
    })
    .catch(error => {
      if (!error.response) {
        dispatch(cardsNewFailure('Network Error, try again later'));
      } else {
        if (error.response.status === 500) {
          dispatch(cardsNewFailure('Internal Server Error, try again later'));
        } else {
          dispatch(cardsNewFailure('Something went wrong !'));
        }
      }
    });
  };

export const cardsAtach = (data, socket) =>
  dispatch => {
    axios({
      method: 'post',
      url: `${API_URL}/card-atach`,
      data: {
        boardId: data.boardId,
        sourceId: data.sourceId,
        targetListId: data.targetListId
      },
      timeout: TIME_OUT
    })
    .then(response => {
      socket.emit('list', 'Card Atach');
      // socket.emit('card', data.boardId);
      dispatch(loadCards(data.boardId));
    })
    .catch(error => {
      if (!error.response) {
        dispatch(cardsMoveFailure('Network Error, try again later'));
      } else {
        if (error.response.status === 500) {
          dispatch(cardsMoveFailure('Internal Server Error, try again later'));
        } else {
          dispatch(cardsMoveFailure('Something went wrong !'));
        }
      }
    });
  };

export const cardsMove = (data, socket) =>
  dispatch => {
    axios({
      method: 'post',
      url: `${API_URL}/card-move`,
      data: {
        boardId: data.boardId,
        sourceId: data.sourceId,
        targetId: data.targetId,
        sourceListId: data.sourceListId,
        targetListId: data.targetListId
      },
      timeout: TIME_OUT
    })
    .then(response => {
      dispatch(loadCards(data.boardId));
      socket.emit('list', 'Card Move');
    })
    .catch(error => {
      if (!error.response) {
        dispatch(cardsMoveFailure('Network Error, try again later'));
      } else {
        if (error.response.status === 500) {
          dispatch(cardsMoveFailure('Internal Server Error, try again later'));
        } else {
          dispatch(cardsMoveFailure('Something went wrong !'));
        }
      }
    });
  };

export const cardsDelete = (id, socket) =>
  dispatch => {
    dispatch(cardsDelRequest());
    axios({
      method: 'delete',
      url: `${API_URL}/card/${id}`,
      timeout: TIME_OUT
    })
    .then(response => {
      dispatch(cardsDelSuccess(id));
      socket.emit('list', 'Card Deleted');
      toastr.warning('Card Deleted !');
    })
    .catch(error => {
      if (!error.response) {
        dispatch(cardsDelFailure('Network Error, try again later'));
        toastr.error('Network Error, try again later');
      } else {
        if (error.response.status === 500) {
          dispatch(cardsDelFailure('Internal Server Error, try again later'));
          toastr.error('Internal Server Error, try again later');
        } else {
          dispatch(cardsDelFailure('Something went wrong !'));
          toastr.error(error.response.data.error);
        }
      }
    });
  };

export const cardsUpdate = (data, socket) =>
  dispatch => {
    dispatch(cardsUpdateRequest());
    axios({
      method: 'put',
      url: `${API_URL}/card/${data.id}`,
      data: {
        description: data.value
      },
      timeout: TIME_OUT
    })
    .then(response => {      
      dispatch(cardsUpdateSuccess(response.data.card));
      socket.emit('list', 'Card Updated');
    })
    .catch(error => {
      if (!error.response) {
        dispatch(cardsUpdateFailure('Network Error, try again later'));
      } else {
        if (error.response.status === 500) {
          dispatch(cardsUpdateFailure('Internal Server Error, try again later'));
        } else {
          dispatch(cardsUpdateFailure('Something went wrong !'));
        }
      }
    });
  };
