import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../../app/reducers/index';

const middlewares = [reduxThunk];

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(reducers);

export default store;
