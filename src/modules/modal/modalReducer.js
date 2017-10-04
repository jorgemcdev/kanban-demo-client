import { MODAL_OPEN, MODAL_CLOSE } from './actionTypes';

const initialState = {
  show: false,
  id: ''
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_OPEN:
      return {
        ...state, show: true, id: action.payload
      };
    case MODAL_CLOSE:
      return {
        ...state, show: false, id: ''
      };
    default:
      return { ...state };
  }
};

export default modalReducer;
