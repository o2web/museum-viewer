import React from 'react';
import { connect, Provider } from 'react-redux';
import I18n from 'redux-i18n';
import translations, {
  defaultLanguage,
} from '../../config/locales/translations';

function connectWithStore(store, WrappedComponent, ...args) {
  const ConnectedComponent = connect(...args)(WrappedComponent);
  return function (props) {
    return (
      <Provider store={store}>
        <I18n translations={translations} initialLang={defaultLanguage}>
          <ConnectedComponent {...props} />
        </I18n>
      </Provider>
    );
  };
}

export default connectWithStore;
