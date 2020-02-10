// libs
import { combineReducers } from 'redux';
import { i18nState } from 'redux-i18n';
import galleryReducer from './gallery';
import promisesReducer from './promises';

const rootReducer = combineReducers({
  i18nState,
  gallery: galleryReducer,
  promises: promisesReducer,
});

export default rootReducer;
