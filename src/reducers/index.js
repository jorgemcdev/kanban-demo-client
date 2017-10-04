import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';

/**
 * @desc Import Reducers
 */
import authReducer from './../modules/auth/authReducer';
import boardsReducer from './../modules/boards/boardsReducer';
import listsReducer from './../modules/lists/listsReducer';
import cardsReducer from './../modules/cards/cardsReducer';
import modalReducer from './../modules/modal/modalReducer';
import settingsReducer from './../modules/settings/settingsReducer';

/**
 * @desc Combine Reducers
 */
const reducers = combineReducers({
  form,
  routing,
  authReducer,
  boardsReducer,
  listsReducer,
  cardsReducer,
  modalReducer,
  settingsReducer
});

export default reducers;
