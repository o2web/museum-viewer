// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// Components
import GalleryUi from './render/GalleryUi';

// Store
import galleryStore from '../../../config/redux/store';
import connectWithStore from '../../helpers/connectWithStore';

// Styles
import iconFontWOFF from '../../../assets/fonts/icons/gallery-icons.woff';

// actions
import galleryActions from '../../actions/gallery/index';

class Gallery extends Component {
  constructor(props) {
    super(props);
    if (typeof document !== 'undefined' && document.createElement && document.head) {
      const iconFontFamily = `
        @font-face {
          font-family: "gallery-icons";
          src: url(${iconFontWOFF}) format('woff');
        }
      `;
      const styleTag = document.createElement('style');
      styleTag.setAttribute('type', 'text/css');
      styleTag.appendChild(document.createTextNode(iconFontFamily));
      document.head.appendChild(styleTag);
    }

    this.toggleInfo = this.toggleInfo.bind(this);
    this.closeMedia = this.closeMedia.bind(this);
    this.resetMedia = this.resetMedia.bind(this);
    this.prevMedia = this.prevMedia.bind(this);
    this.nextMedia = this.nextMedia.bind(this);
    this.gotoMedia = this.gotoMedia.bind(this);
    this.state = {
      showInfo: false,
      currentMedia: 0,
    };
  }

  componentDidUpdate(prevProps) {
    const { artworkID: prevId } = prevProps;
    const {
      active,
      history,
      closeGallery,
      fetchArtworkMedia,
      artworkID: nextId,
      startAt,
    } = this.props;
    const { showInfo } = this.state;
    const { t } = this.context;

    // changed artwork
    if (prevId !== nextId) {
      fetchArtworkMedia({ id: nextId });
    }

    if (active) {
      // gallery is visible
      if (!this.unlistenHistory) {
        history.push(`${history.location.pathname}#${t('gallery.slug')}`);

        this.unlistenHistory = history.listen(() => {
          closeGallery();
        }).bind(this);

        if (startAt) {
          this.gotoMedia(startAt);
        }
      }
    } else {
      // gallery is hidden
      // reset things after closing gallery
      if (this.unlistenHistory) {
        this.unlistenHistory();
        this.unlistenHistory = null;
        this.resetMedia();
      }
      // close infos panel if it's open
      if (showInfo) {
        this.toggleInfo();
      }
    }
  }

  // Close Gallery
  closeMedia() {
    const { history } = this.props;
    history.goBack();
  }

  // Multiple Medias
  resetMedia() {
    this.setState(() => ({
      currentMedia: 0,
      // startAt: undefined,
    }));
  }

  gotoMedia(i) {
    if (i) {
      this.setState(() => ({
        currentMedia: i,
      }));
    }
  }

  nextMedia() {
    const { artworkMedia: { uploads = [] } } = this.props;
    this.setState(({ currentMedia }) => ({
      currentMedia: (currentMedia + 1) % uploads.length,
    }));
  }

  prevMedia() {
    const { artworkMedia: { uploads = [] } } = this.props;
    this.setState(({ currentMedia }) => ({
      currentMedia: ((currentMedia + uploads.length) - 1) % uploads.length,
    }));
  }

  // Info Panel
  toggleInfo() {
    this.setState(({ showInfo }) => ({
      showInfo: !showInfo,
    }));
  }

  render() {
    const {
      active,
      loading,
      artworkID,
      artworkMedia,
    } = this.props;
    const { t } = this.context;
    const { showInfo, currentMedia } = this.state;
    const { prevMedia, nextMedia, closeMedia, toggleInfo } = this;
    return (
      <div className="gallery">
        {active &&
          <GalleryUi
            t={t}
            active={active}
            loading={loading}
            artworkID={artworkID}
            artworkMedia={artworkMedia}
            showInfo={showInfo}
            toggleInfo={toggleInfo}
            currentMedia={currentMedia}
            prevMedia={prevMedia}
            nextMedia={nextMedia}
            closeMedia={closeMedia}
          />
        }
      </div>
    );
  }
}

Gallery.propTypes = {
  active: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  artworkID: PropTypes.string,
  artworkMedia: PropTypes.object.isRequired,
  closeGallery: PropTypes.func.isRequired,
  fetchArtworkMedia: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  startAt: PropTypes.number,
};

Gallery.defaultProps = {
  artworkID: '',
  startAt: undefined,
};

Gallery.contextTypes = {
  t: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    loading: state.gallery.loading,
    artworkMedia: state.gallery.result,
    artworkID: state.gallery.artworkID,
    startAt: state.gallery.startAt,
    active: state.gallery.active,
  };
}

export default withRouter(
  connectWithStore(galleryStore, Gallery, mapStateToProps, galleryActions),
);
