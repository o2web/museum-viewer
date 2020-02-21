// libs
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { translatePath } from 'o2web-react-core';

// Components
import Viewer from './Viewer';
import Loader from '../../loader/Loader';

// Styles
import './styles.scss';

function GalleryUi(props) {
  const {
    t,
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
    showInfo,
    currentMedia,
    prevMedia,
    nextMedia,
    toggleInfo,
    closeMedia,
  } = props;
  const media = uploads[currentMedia];

  return (
    <Fragment>
      <Loader loading={loading} fullscreen animated dark />
      {media && media.mediaUrl && document &&
        <Viewer key={currentMedia} title={name} media={media} />
      }
      <button onClick={closeMedia} className="gallery__button gallery__button--close" />

      <div className="gallery__toolbar">
        <div className={classNames('gallery__info', { 'gallery__info--extended': showInfo })} >
          <div
            role="button"
            className="gallery__info-toggle"
            onClick={toggleInfo}
            onKeyPress={toggleInfo}
            tabIndex="0"
          >
            <h2>
              {artists.map(artist => artist.name).join('; ')}
            </h2>
            <h3>{name}</h3>
            <span className="gallery__info-icon" />
          </div>
          <div className="gallery__info-content">
            {materials && <p className="gallery__info-content__material">{materials}</p>}
            {productionDate && <p className="gallery__info-content__date">{productionDate}</p>}
            {prettyInfo && <p className="gallery__info-content__description">{prettyInfo}</p>}
            {imageRights &&
            <small className="gallery__info-content__image-rights">{imageRights}</small>}
            <div className="gallery__info-content__link">
              <NavLink to={`${translatePath('artwork', t)}/${artworkID}`}>
                {t('gallery.viewArtwork')}
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
    </Fragment>
  );
}

GalleryUi.propTypes = {
  t: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  showInfo: PropTypes.bool.isRequired,
  toggleInfo: PropTypes.func.isRequired,
  artworkID: PropTypes.string.isRequired,
  artworkMedia: PropTypes.object.isRequired,
  currentMedia: PropTypes.number.isRequired,
  prevMedia: PropTypes.func.isRequired,
  nextMedia: PropTypes.func.isRequired,
  closeMedia: PropTypes.func.isRequired,
};

export default GalleryUi;
