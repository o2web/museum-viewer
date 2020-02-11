import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../../app/reducers/index';

const middlewares = [reduxThunk];
const preloadedState = (typeof window !== 'undefined' && window.PRELOADED_STATE) ? window.PRELOADED_STATE : {};

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(reducers, preloadedState);

export default store;
