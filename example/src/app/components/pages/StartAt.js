// libs
import React from 'react';
import { GalleryToggle } from 'museum-viewer';

const Page = () => (
  <section>
    <h2 className="title title--section">
      Multiple
    </h2>
    <p>Coq Licorne - Jean Dallaire</p>
    <GalleryToggle artworkID="600006432" startAt={0}>
      <span className="button">
        {'Ouvrir l\'image #1'}
      </span>
    </GalleryToggle>
    <GalleryToggle artworkID="600006432" startAt={1}>
      <span className="button">
        {'Ouvrir l\'image #2'}
      </span>
    </GalleryToggle>
  </section>
);


export default Page;
