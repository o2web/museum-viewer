import types from '../actions/gallery/types';
import SSR_RESET_TYPE from '../../config/redux/reset';

const initialState = {
  active: false,
  loading: false,
  result: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.OPEN_GALLERY:
      console.log('open gallery');
      return { ...state, active: true, artworkID: action.artworkID, startAt: action.startAt };
    case types.CLOSE_GALLERY:
      return { ...state, active: false };
    case types.FETCH_ARTWORK_MEDIA:
      console.log('fetching');
      return { ...state, loading: true, result: {} };
    case types.FETCH_ARTWORK_MEDIA_SUCCESS:
      return { ...state, loading: false, result: action.payload.artwork };
    case types.FETCH_ARTWORK_MEDIAS_FAIL:
      return { ...state, loading: false };
    case SSR_RESET_TYPE:
      return { ...initialState };
    default:
  }

  return state;
}
