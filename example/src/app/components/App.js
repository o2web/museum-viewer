import React, { Component } from 'react';
import PropTypes from 'prop-types';
import I18n from 'redux-i18n';
import { CookiesProvider } from 'react-cookie';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Route } from 'react-router-dom';
import { GAListener } from 'o2web-react-core';

import translations, {
  availableLanguages,
  defaultLanguage,
} from '../../config/locales/translations';

// Components
import AppWrapper from './layouts/AppWrapper';

// styles
import './../../assets/styles/app.scss';


class App extends Component {
  getChildContext() {
    return {
      translations,
      availableLanguages,
      defaultLanguage,
    };
  }

  render() {
    return (
      <I18n translations={translations} initialLang={defaultLanguage}>
        <CookiesProvider>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Visionneuse Muséale</title>
            <link rel="canonical" href="" />
            <meta name="description" content="" />
            <meta name="keywords" content="" />

            {/* Opengraph */}
            <meta property="og:title" content="" />
            <meta property="og:type" content="" />
            <meta property="og:url" content={window.location.href} />
            <meta property="og:description" content="" />
            <meta property="og:image" content="" />

            {/* Twitter */}
            <meta name="twitter:site" content="" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content="" />
            <meta name="twitter:description" content="" />
            <meta name="twitter:image" content="" />
          </Helmet>
          <BrowserRouter>
            <GAListener>
              <Route
                path="/"
                component={AppWrapper}
              />
            </GAListener>
          </BrowserRouter>
        </CookiesProvider>
      </I18n>
    );
  }
}

App.childContextTypes = {
  translations: PropTypes.object.isRequired,
  availableLanguages: PropTypes.array.isRequired,
  defaultLanguage: PropTypes.string.isRequired,
};

export default App;
