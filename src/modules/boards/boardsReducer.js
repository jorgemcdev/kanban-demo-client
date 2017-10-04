import {
  BOARD_REQUEST, BOARD_SUCCESS, BOARD_FAILURE, BOARD_RESET,
  BOARD_NEW_REQUEST, BOARD_NEW_SUCCESS, BOARD_NEW_FAILURE,
  BOARD_UPDATE_REQUEST, BOARD_UPDATE_SUCCESS, BOARD_UPDATE_FAILURE,
  BOARD_DEL_REQUEST, BOARD_DEL_SUCCESS, BOARD_DEL_FAILURE
} from './actionTypes';

import { update } from './selectors';

const initialState = {
  boards: [],
  isLoading: false,
  errors: ''
};
const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    // LIST
    case BOARD_REQUEST:
      return {
        ...state, isLoading: true, errors: ''
      };
    case BOARD_SUCCESS:
      return {
        ...state, isLoading: false, boards: action.payload, errors: ''
      };
    case BOARD_FAILURE:
      return {
        ...state, isLoading: false, errors: action.payload
      };
    case BOARD_RESET:
      return {
        ...state, isLoading: false, boards: [], errors: ''
      };
    // NEW
    case BOARD_NEW_REQUEST:
      return {
        ...state, isLoading: true, errors: ''
      };
    case BOARD_NEW_SUCCESS:
      return {
        ...state, isLoading: false, boards: [...state.boards, action.payload], errors: ''
      };
    case BOARD_NEW_FAILURE:
      return {
        ...state, isLoading: false, errors: action.payload
      };
    // UPDATE
    case BOARD_UPDATE_REQUEST:
      return {
        ...state, isLoading: true, errors: ''
      };
    case BOARD_UPDATE_SUCCESS:
      return {
        ...state, isLoading: false, boards: update(state.boards, action.payload), errors: ''
      };
    case BOARD_UPDATE_FAILURE:
      return {
        ...state, isLoading: false, errors: action.payload
      };
    // DELETE
    case BOARD_DEL_REQUEST:
      return {
        ...state, isLoading: true, errors: ''
      };
    case BOARD_DEL_SUCCESS:
      return {
        ...state, isLoading: false,
        boards: state.boards.filter(board => board._id !== action.payload),
        errors: ''
      };
    case BOARD_DEL_FAILURE:
      return {
        ...state, isLoading: false, errors: action.payload
      };
    // default
    default:
      return { ...state };
  }
};

export default boardsReducer;
