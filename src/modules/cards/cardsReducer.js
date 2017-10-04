import {
  CARDS_REQUEST, CARDS_SUCCESS, CARDS_FAILURE, CARDS_RESET,
  CARDS_NEW_REQUEST, CARDS_NEW_SUCCESS, CARDS_NEW_FAILURE,
  CARDS_DELETE_REQUEST, CARDS_DELETE_SUCCESS, CARDS_DELETE_FAILURE,
  CARDS_UPDATE_REQUEST, CARDS_UPDATE_SUCCESS, CARDS_UPDATE_FAILURE,
  CARDS_MOVE_SUCCESS, CARDS_MOVE_FAILURE,
  CARDS_ATACH
} from './actionTypes';

import { update, remove } from './selectors';

const initialState = {
  cards: [],
  isLoading: false,
  errors: ''
};
const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    // LIST CARDS
    case CARDS_REQUEST:
      return {
        ...state, isLoading: true, errors: ''
      };
    case CARDS_SUCCESS:
      return {
        ...state, isLoading: false, cards: action.payload, errors: ''
      };
    case CARDS_FAILURE:
      return {
        ...state, isLoading: false, errors: action.payload
      };
    case CARDS_RESET:
      return {
        ...state, isLoading: false, cards: [], errors: ''
      };

    // NEW CARD
    case CARDS_NEW_REQUEST:
      return {
        ...state, isLoading: true, errors: ''
      };
    case CARDS_NEW_SUCCESS:
      return {
        ...state, isLoading: false, cards: [...state.cards, action.payload], errors: ''
      };
    case CARDS_NEW_FAILURE:
      return {
        ...state, isLoading: false, errors: action.payload
      };

    // UPDATE BY ID
    case CARDS_UPDATE_REQUEST:
      return {
        ...state, isLoading: true, errors: ''
      };
    case CARDS_UPDATE_SUCCESS:
      return {
        ...state, isLoading: false, cards: update(state.cards, action.payload), errors: ''
      };
    case CARDS_UPDATE_FAILURE:
      return {
        ...state, isLoading: false, errors: action.payload
      };

    // DELETE LIST BY ID
    case CARDS_DELETE_REQUEST:
      return {
        ...state, isLoading: true, errors: ''
      };
    case CARDS_DELETE_SUCCESS:
      return {
        ...state, isLoading: false,
        cards: state.cards.filter(card => card._id !== action.payload)
      };
    case CARDS_DELETE_FAILURE:
      return {
        ...state, isLoading: false, errors: action.payload
      };

      // Move Cards
    case CARDS_MOVE_SUCCESS:
      return {
        ...state, isLoading: true, cards: [...state.cards, action.payload], errors: ''
      };
    case CARDS_MOVE_FAILURE:
      return {
        ...state, isLoading: false, errors: action.payload
      };
      // Atach Card to list
    case CARDS_ATACH:
      return {
        ...state, isLoading: true, cards: [...state.cards, action.payload], errors: ''
      };
    // default
    default:
      return { ...state };
  }
};

export default cardsReducer;
