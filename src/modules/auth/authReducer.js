import {
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE, SIGNUP_RESET,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT,
  TOKEN_REQUEST, TOKEN_SUCCESS, TOKEN_FAILURE,
  PASSREQ_REQUEST, PASSREQ_SUCCESS, PASSREQ_FAILURE, PASSREQ_RESET,
  PASS_RESET_REQUEST, PASS_RESET_SUCCESS, PASS_RESET_FAILURE, PASS_RESET_RESET,
  UPDATE_DETAILS
} from './actionTypes';

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: '',
  message: '',
  errors: ''
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // SIGNUP
    case SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true, message: '', user: '', errors: ''
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false, user: '', message: action.payload || '', errors: ''
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false, message: '', errors: action.payload
      };
    case SIGNUP_RESET:
      return {
        ...state,
        isLoading: false, isAuthenticated: false, user: '', message: '', errors: ''
      };

    // TOKEN
    case TOKEN_REQUEST:
      return {
        ...state, isLoading: true, errors: '', message: ''
      };
    case TOKEN_SUCCESS:
      return {
        ...state,
        isLoading: false, isAuthenticated: true, user: state.user, errors: '', message: ''
      };
    case TOKEN_FAILURE:
      return {
        ...state,
        isLoading: false, isAuthenticated: false, user: '', errors: action.payload, message: ''
      };

    // LOGIN
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true, isAuthenticated: false, user: '', message: '', errors: ''
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false, isAuthenticated: true, user: action.payload, message: '', errors: ''
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false, isAuthenticated: false, user: '', message: '', errors: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        isLoading: false, isAuthenticated: false, user: '', message: '', errors: ''
      };

    // PASSWORD RECOVER
    case PASSREQ_REQUEST:
      return {
        ...state,
        isLoading: true, isAuthenticated: false, user: '', message: '', errors: ''
      };
    case PASSREQ_SUCCESS:
      return {
        ...state,
        isLoading: false, isAuthenticated: true, user: '', message: action.payload, errors: ''
      };
    case PASSREQ_FAILURE:
      return {
        ...state,
        isLoading: false, isAuthenticated: false, user: '', message: '', errors: action.payload
      };
    case PASSREQ_RESET:
      return {
        ...state,
        isLoading: false, isAuthenticated: false, user: '', message: '', errors: ''
      };

    // PASSWORD RECOVER
    case PASS_RESET_REQUEST:
      return {
        ...state,
        isLoading: true, isAuthenticated: false, user: '', message: '', errors: ''
      };
    case PASS_RESET_SUCCESS:
      return {
        ...state,
        isLoading: false, isAuthenticated: true, user: '', message: action.payload, errors: ''
      };
    case PASS_RESET_FAILURE:
      return {
        ...state,
        isLoading: false, isAuthenticated: false, user: '', message: '', errors: action.payload
      };
    case PASS_RESET_RESET:
      return {
        ...state,
        isLoading: false, isAuthenticated: false, user: '', message: '', errors: ''
      };

    case UPDATE_DETAILS:
      return {
        ...state,
        user: {
          ...state.user,
          avatar: action.payload.avatar || state.user.avatar,
          name: action.payload.name
        },
        message: '', errors: ''
      };

    // default
    default:
      return { ...state };
  }
};

export default authReducer;
