// libs
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

// Styles
import './styles.scss';

const Header = (props) => {
  const { appTitle, routes } = props;
  return (
    <header className="app__header">
      <h1 className="title title--main">
        {appTitle}
      </h1>
      <nav className="app__nav" >
        <ul>
          {routes.map(route => (
            <li key={route.title}>
              <NavLink to={route.url} exact >
                {route.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

Header.propTypes = {
  appTitle: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Header;
