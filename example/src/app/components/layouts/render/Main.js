// libs
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

// Styles
import './styles.scss';

const Main = (props) => {
  const { routes, location } = props;
  return (
    <main className="app__main">
      <SwitchTransition>
        <CSSTransition
          key={location.pathname}
          classNames="fade"
          timeout={300}
        >
          <Switch location={location}>
            {routes.map(({ title, url, params, component }) => (
              <Route
                exact={!params}
                key={title}
                path={`${url}${params ? `/:${params.join('/:')}` : ''}`}
                component={component}
              />
            ))}
          </Switch>
        </CSSTransition>
      </SwitchTransition>
    </main>
  );
};

Main.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(Main);
