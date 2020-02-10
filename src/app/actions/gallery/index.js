import queries from './queries';
import types from './types';
import { asyncQuery } from '../../../config/graphql/async-action-creator';

export default {
  openGallery: (artworkID, startAt) => ({
    artworkID,
    startAt,
    type: types.OPEN_GALLERY,
  }),
  closeGallery: () => ({
    type: types.CLOSE_GALLERY,
  }),
  fetchArtworkMedia: (variables) => asyncQuery(
    types.FETCH_ARTWORK_MEDIA,
    queries.fetchArtworkMedia,
    variables,
  ),
};
