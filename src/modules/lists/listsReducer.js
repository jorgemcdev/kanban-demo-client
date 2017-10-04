import {
  LISTS_REQUEST, LISTS_SUCCESS, LISTS_FAILURE,
  LISTS_CHANGE_REQUEST, LISTS_CHANGE_SUCCESS, LISTS_CHANGE_FAILURE,
  LISTS_NEW_REQUEST, LISTS_NEW_SUCCESS, LISTS_NEW_FAILURE, LISTS_RESET,
  LISTS_UPDATE_REQUEST, LISTS_UPDATE_SUCCESS, LISTS_UPDATE_FAILURE,
  LISTS_DELETE_REQUEST, LISTS_DELETE_SUCCESS, LISTS_DELETE_FAILURE
} from './actionTypes';

import { update, remove } from './selectors';

const initialState = {
  lists: [],
  cards: '',
  isLoading: false,
  errors: ''
};
const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Lists
    case LISTS_REQUEST:
      return {
        ...state, isLoading: true, errors: ''
      };
    case LISTS_SUCCESS:
      return {
        ...state, isLoading: false, lists: action.payload, errors: ''
      };
    case LISTS_FAILURE:
      return {
        ...state, isLoading: false, errors: action.payload
      };
    case LISTS_RESET:
      return {
        ...state, isLoading: false, lists: [], errors: ''
      };
    // Change Card List
    case LISTS_CHANGE_REQUEST:
      return {
        ...state, isLoading: true, errors: ''
      };
    case LISTS_CHANGE_SUCCESS:
      return {
        ...state, isLoading: false, errors: ''
      };
    case LISTS_CHANGE_FAILURE:
      return {
        ...state, isLoading: false, errors: action.payload
      };
    // Change Card List
    case LISTS_NEW_REQUEST:
      return {
        ...state, isLoading: true, errors: ''
      };
    case LISTS_NEW_SUCCESS:
      return {
        ...state, isLoading: false, lists: [...state.lists, action.payload], errors: ''
      };
    case LISTS_NEW_FAILURE:
      return {
        ...state, isLoading: false, errors: action.payload
      };
    // UPDATE BY ID
    case LISTS_UPDATE_REQUEST:
      return {
        ...state, isLoading: true, errors: ''
      };
    case LISTS_UPDATE_SUCCESS:
      return {
        ...state, isLoading: false, lists: update(state.lists, action.payload), errors: ''
      };
    case LISTS_UPDATE_FAILURE:
      return {
        ...state, isLoading: false, errors: action.payload
      };

    // DELETE LIST BY ID

    case LISTS_DELETE_REQUEST:
      return {
        ...state, isLoading: true, errors: ''
      };
    case LISTS_DELETE_SUCCESS:
      return {
        ...state, isLoading: false,
        lists: state.lists.filter(list => list._id !== action.payload)
      };
    case LISTS_DELETE_FAILURE:
      return {
        ...state, isLoading: false, errors: action.payload
      };

    // default
    default:
      return { ...state };
  }
};

export default listsReducer;
