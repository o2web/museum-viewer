import { async, createTypes } from 'redux-action-creator';

export default createTypes([
  'OPEN_GALLERY',
  'CLOSE_GALLERY',
  ...async('FETCH_ARTWORK_MEDIA'),
], 'GALLERY');
