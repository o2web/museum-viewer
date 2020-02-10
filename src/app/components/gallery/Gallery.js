// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { NavLink, withRouter } from 'react-router-dom';
import { translatePath } from 'o2web-react-core';

// Components
import Viewer from './render/Viewer';
import Loader from '../loader/Loader';

// Styles
import './render/styles.scss';

// actions
import actions from '../../actions/gallery/index';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.closeButton = this.closeButton.bind(this);
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
        history.push(`${history.location.pathname}#${t('pages.gallery.slug')}`);

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
  closeButton() {
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
      artworkMedia: {
        name,
        artists = [],
        uploads = [{}],
        materials,
        prettyInfo,
        imageRights,
        productionDate,
      },
    } = this.props;
    const { t } = this.context;
    const { showInfo, currentMedia } = this.state;
    const { prevMedia, nextMedia, closeButton } = this;

    const media = uploads[currentMedia];

    return (
      <div className="gallery">
        {active &&
          <div>
            <Loader loading={loading} fullscreen animated dark />
            {media && media.mediaUrl &&
              <Viewer key={currentMedia} title={name} media={media} />
            }
            <button onClick={closeButton} className="gallery__button gallery__button--close" />

            <div className="gallery__toolbar">
              <div className={classNames('gallery__info', { 'gallery__info--extended': showInfo })}>
                <div
                  role="button"
                  className="gallery__info-toggle"
                  onClick={this.toggleInfo}
                  onKeyPress={this.toggleInfo}
                  tabIndex="0"
                >
                  <h2>{artists.map(artist => artist.name).join('; ')}</h2>
                  <h3>{name}</h3>
                  <span className="gallery__info-icon" />
                </div>
                <div className="gallery__info-content">
                  {materials && <p className="gallery__info-content__material">{materials}</p>}
                  {productionDate && <p className="gallery__info-content__date">{productionDate}</p>}
                  {prettyInfo && <p className="gallery__info-content__description">{prettyInfo}</p>}
                  {imageRights && <small className="gallery__info-content__image-rights">{imageRights}</small>}
                  <div className="gallery__info-content__link">
                    <NavLink to={`${translatePath('artwork', t)}/${artworkID}`}>
                      {t('pages.gallery.viewArtwork')}
                    </NavLink>
                  </div>
                </div>
              </div>

              {uploads.length > 1 &&
                <div className="gallery__playlist">
                  <button onClick={prevMedia} className="gallery__button gallery__button--prev" />
                  <div className="gallery__counter">
                    <span className="gallery__counter__index">{currentMedia + 1}</span>
                    <span className="gallery__counter__count">{uploads.length}</span>
                  </div>
                  <button onClick={nextMedia} className="gallery__button gallery__button--next" />
                </div>
              }

              <div className="gallery__controls">
                <button id="gallery-zoom-out" className="gallery__button gallery__button--zoom-out" />
                <button id="gallery-zoom-in" className="gallery__button gallery__button--zoom-in" />
              </div>

              <div className="gallery__navigator">
                <div id="gallery-navigator" />
              </div>
            </div>

          </div>
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

export default withRouter(connect(mapStateToProps, actions)(Gallery));
