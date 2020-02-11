// libs
import React from 'react';
import { GalleryToggle } from 'museum-viewer';

const Single = () => (
  <section>
    <h2 className="title title--section">
      Oeuvre avec image unique
    </h2>
    <GalleryToggle artworkID="600043576">
      <span className="button">
        Ouvrir la visionneuse
      </span>
    </GalleryToggle>
  </section>
);


export default Single;
