// libs
import React from 'react';
import { GalleryToggle } from 'museum-viewer';

const Page = () => (
  <section>
    <h2 className="title title--section">
      Image seule
    </h2>
    <p>Hollywood - Alfred Pellan</p>
    <GalleryToggle artworkID="600043576">
      <span className="button">
        Ouvrir la visionneuse
      </span>
    </GalleryToggle>
  </section>
);


export default Page;
