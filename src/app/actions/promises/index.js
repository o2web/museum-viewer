import types from './types';

export default {
  addPromise: (promise) => ({
    promise,
    type: types.ADD_PROMISE,
  }),
};
