// libs
import React from 'react';
import PropTypes from 'prop-types';

// Required Components
import YouTube from 'react-youtube';
import Soundplayer from '../../soundplayer/Soundplayer';
import OpenSeaDragon from '../OpenSeaDragon';
import { getYoutubeId } from '../../../helpers/youtube-helper';

const propTypes = {
  // data: PropTypes.object,
};

const defaultProps = {
  // data: {},
};
const contextTypes = {
  t: PropTypes.func,
};

// Index Component
function Viewer(props) {
  const {
    title,
    media = {
      mediaUrl: '',
    },
  } = props;

  const videoOpts = {
    height: '390',
    width: '640',
    playerVars: {
      modestbranding: 1,
      rel: 0,
    },
  };

  const player = {
    image: (
      <OpenSeaDragon media={media} />
    ),
    video: (
      <div className="card__youtube-player youtube-player">
        <div className="card__youtube-player__iframe-wrapper youtube-player__iframe-wrapper">
          <YouTube
            videoId={media && media.mediaUrl && getYoutubeId(media.mediaUrl)}
            opts={videoOpts}
          />
        </div>
      </div>
    ),
    audio: (
      <Soundplayer
        audioUrl={media ? media.mediaUrl : ''}
        trackTitle={title}
      />
    ),
  };

  return player[media.mediaType];
}

Viewer.contextTypes = contextTypes;
Viewer.propTypes = propTypes;
Viewer.defaultProps = defaultProps;

export default Viewer;
