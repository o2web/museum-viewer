// libs
import React from 'react';
import { Gallery } from 'museum-viewer';

// Components
import Header from './render/Header';
import Main from './render/Main';

// Data
import routes from '../../../config/routes/routes';

const AppWrapper = () => (
  <div className="app__wrapper">
    <Header appTitle="Visionneuse Muséale" routes={routes} />
    <Main routes={routes} />
    <Gallery />
  </div>
);

export default AppWrapper;
