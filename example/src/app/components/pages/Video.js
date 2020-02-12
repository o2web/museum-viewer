// libs
import React from 'react';
import { GalleryToggle } from 'museum-viewer';

const Page = () => (
  <section>
    <h2 className="title title--section">
      Image et Video
    </h2>
    <p>Coq Licorne - Jean Dallaire</p>
    <GalleryToggle artworkID="600006432">
      <span className="button">
        Ouvrir la visionneuse
      </span>
    </GalleryToggle>
  </section>
);


export default Page;
