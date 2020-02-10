import types from '../actions/promises/types';

const initialState = {
  all: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.ADD_PROMISE:
      return { ...state, all: [...state.all, action.promise] };
    default:
  }

  return state;
}
