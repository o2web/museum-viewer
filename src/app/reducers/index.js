// libs
import { combineReducers } from 'redux';
import { i18nState } from 'redux-i18n';
import galleryReducer from './gallery';

const rootReducer = combineReducers({
  i18nState,
  gallery: galleryReducer,
});

export default rootReducer;
