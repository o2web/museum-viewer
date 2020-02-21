// libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OpenSeadragon from 'openseadragon';

// Styles
import './render/styles.scss';


class OpenSeaDragon extends Component {
  constructor(props) {
    super(props);
    this.initOSD = this.initOSD.bind(this);
  }

  componentDidMount() {
    if (document) {
      this.initOSD();
    }
  }

  componentDidUpdate(prevProps) {
    const { media: prevMedia } = prevProps;
    const { media: currentMedia } = this.props;
    if ((prevMedia !== currentMedia) && document) {
      this.initOSD();
    }
  }

  componentWillUnmount() {
    this.destroyOSD();
  }

  destroyOSD() {
    const zoomIn = document.getElementById('gallery-zoom-in');
    const zoomOut = document.getElementById('gallery-zoom-out');
    if (this.viewer) {
      this.viewer.destroy();
      this.viewer = null;
      document.getElementById('gallery-navigator').innerHTML = '';
      zoomIn.parentNode.replaceChild(zoomIn.cloneNode(true), zoomIn);
      zoomOut.parentNode.replaceChild(zoomOut.cloneNode(true), zoomOut);
    }
  }

  initOSD() {
    const { media: { openseadragonConfig, mediaUrl } } = this.props;
    if (!mediaUrl) {
      return;
    }
    const mediaFiles = JSON.parse(mediaUrl);
    let config = this.defaultConfig;
    if (openseadragonConfig) {
      // with tiles
      const mediaConfig = JSON.parse(openseadragonConfig);
      config = {
        ...OpenSeaDragon.defaultConfig,
        tileSources: {
          Image: {
            ...mediaConfig.Image,
            Url: `${mediaFiles.openseadragon}/tiles/`,
          },
        },
      };
    } else {
      // without tiles
      config = {
        ...OpenSeaDragon.defaultConfig,
        tileSources: {
          type: 'image',
          url: mediaFiles.original,
        },
      };
    }

    // destroy previous viewer
    this.destroyOSD();
    // Init with configs
    this.viewer = OpenSeadragon(config);
  }


  render() {
    return (
      <div className="openseadragon" id="osd-viewer" />
    );
  }
}

OpenSeaDragon.defaultConfig = {
  id: 'osd-viewer',
  // Centering the image
  visibilityRatio: 1,
  viewportMargins: {
    top: 30,
    bottom: 120,
    left: 30,
    right: 30,
  },
  // Zoom
  defaultZoomLevel: 0,
  minZoomLevel: 0,
  maxZoomPixelRatio: 1,
  // Navigator
  showNavigator: true,
  navigatorId: 'gallery-navigator',
  navigatorDisplayRegionColor: '#fff',
  // Controls
  zoomInButton: 'gallery-zoom-in',
  zoomOutButton: 'gallery-zoom-out',
  // Source
  tileSources: {
    Image: {
      xmlns: 'http://schemas.microsoft.com/deepzoom/2008',
      Format: 'jpg',
      Overlap: '1',
      TileSize: '254',
      Size: {
        Height: '10200',
        Width: '13920',
      },
    },
  },
};

OpenSeaDragon.propTypes = {
  media: PropTypes.object,
};

OpenSeaDragon.defaultProps = {
  media: {},
};

export default OpenSeaDragon;
