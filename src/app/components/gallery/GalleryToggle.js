// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import galleryStore from '../../../config/redux/store';
import connectWithStore from '../../helpers/connectWithStore';

// Styles
import './render/styles.scss';

// actions
import galleryActions from '../../actions/gallery';

class GalleryToggle extends Component {
  constructor() {
    super();
    this.toggleGallery = this.toggleGallery.bind(this);
  }

  toggleGallery() {
    const { openGallery, artworkID, startAt } = this.props;
    openGallery(artworkID, startAt);
  }

  render() {
    const { className, content, children } = this.props;
    return (
      <span className="gallery-toggle">
        <button className={`gallery-toggle__button ${className}`} onClick={this.toggleGallery}>
          {children || content}
        </button>
      </span>
    );
  }
}

GalleryToggle.propTypes = {
  artworkID: PropTypes.string,
  className: PropTypes.string,
  content: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  openGallery: PropTypes.func.isRequired,
  startAt: PropTypes.number,
};

GalleryToggle.defaultProps = {
  artworkID: '',
  className: '',
  content: 'Zoom',
  children: undefined,
  startAt: undefined,
};


function mapStateToProps() {
  return {};
}

export default connectWithStore(galleryStore, GalleryToggle, mapStateToProps, galleryActions);
