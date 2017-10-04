import {
USER_PASSCHANGE_REQUEST, USER_PASSCHANGE_SUCCESS, USER_PASSCHANGE_FAILURE,
USER_DATA_REQUEST, USER_DATA_SUCCESS, USER_DATA_FAILURE,
USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAILURE,
USER_UPLOAD_REQUEST, USER_UPLOAD_SUCCESS, USER_UPLOAD_FAILURE,
USER_DATA_RESET, USER_INFO_RESET
} from './actionTypes';

const initialState = {
  isLoading: false,
  user: '',
  message: '',
  errors: ''
};
const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    // USER CHANGE PASSWORD
    case USER_PASSCHANGE_REQUEST:
      return {
        ...state,
        isLoading: true, message: '', errors: ''
      };
    case USER_PASSCHANGE_SUCCESS:
      return {
        ...state,
        isLoading: false, message: action.payload || '', errors: ''
      };
    case USER_PASSCHANGE_FAILURE:
      return {
        ...state,
        isLoading: false, message: '', errors: action.payload
      };

    // USER DATA LOAD
    case USER_DATA_REQUEST:
      return {
        ...state,
        isLoading: true, message: '', errors: '', user: { ...state.user }
      };
    case USER_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false, message: '', user: action.payload, errors: ''
      };
    case USER_DATA_FAILURE:
      return {
        ...state,
        isLoading: false, message: '', errors: action.payload, user: { ...state.user }
      };

    // USER UPDATE
    case USER_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true, message: '', errors: ''
      };
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false, message: '', user: action.payload, errors: ''
      };
    case USER_UPDATE_FAILURE:
      return {
        ...state,
        isLoading: false, message: '', errors: action.payload
      };

    // USER UPLOAD AVATAR
    case USER_UPLOAD_REQUEST:
      return {
        ...state,
        isLoading: true, message: '', errors: ''
      };
    case USER_UPLOAD_SUCCESS:
      return {
        ...state,
        isLoading: false, message: '', errors: '', user: { ...state.user }
      };
    case USER_UPLOAD_FAILURE:
      return {
        ...state,
        isLoading: false, message: '', errors: action.payload
      };

    // DATA RESET
    case USER_DATA_RESET:
      return {
        ...state,
        isLoading: false, message: '', errors: '', user: ''
      };

    // INFO RESET
    case USER_INFO_RESET:
      return {
        ...state,
        isLoading: false, message: '', errors: ''
      };

    // DEFAULT
    default:
      return { ...state };
  }
};

export default settingsReducer;
