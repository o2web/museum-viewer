// libs
import React from 'react';
import PropTypes from 'prop-types';

// Required Components
import { PlayButton, Timer, Progress } from 'react-soundplayer/components';
import { withCustomAudio } from 'react-soundplayer/addons';

// Styles
import './styles.scss';

const propTypes = {
  audioUrl: PropTypes.string.isRequired,
  trackTitle: PropTypes.string,
};

const defaultProps = {
  trackTitle: '',
};

const AWSSoundPlayer = withCustomAudio(props => {
  const { trackTitle } = props;
  return (
    <div className="soundplayer">
      <div className="soundplayer__display">
        <span className="soundplayer__title">{trackTitle}</span>
        <span className="soundplayer__icon" />
      </div>
      <div className="soundplayer__controls">
        <PlayButton {...props} />
        <Progress {...props} />
        <Timer {...props} />
      </div>
    </div>
  );
});

// Index Component
function Soundplayer(props) {
  const {
    audioUrl,
    trackTitle,
  } = props;

  return (
    <AWSSoundPlayer
      streamUrl={audioUrl}
      trackTitle={trackTitle}
      preloadType="auto"
    />
  );
}

Soundplayer.propTypes = propTypes;
Soundplayer.defaultProps = defaultProps;

export default Soundplayer;
