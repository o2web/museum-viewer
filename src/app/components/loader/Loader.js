// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Styles
import './styles.scss';

class Loader extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    animated: PropTypes.bool,
    fullscreen: PropTypes.bool,
    minimalist: PropTypes.bool,
    dark: PropTypes.bool,
  };
  static defaultProps = {
    loading: false,
    animated: false,
    fullscreen: false,
    dark: false,
    minimalist: undefined,
  };

  componentDidMount() {
    const { loading, fullscreen } = this.props;
    if (fullscreen && loading) {
      window.scrollTo(0, 0);
    }
  }
  componentDidUpdate() {
    const { loading, fullscreen } = this.props;
    if (fullscreen && loading) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { loading, dark, animated, fullscreen, minimalist } = this.props;
    const mini = minimalist || (minimalist === undefined && !fullscreen);
    return (
      <div className={classNames('loader', {
        'loader--dark': dark,
        'loader--is-loading': loading,
        'loader--animated': animated,
        'loader--fullscreen': fullscreen,
      })}
      >
        <div className={classNames('loader__animation', {
          'loader__animation--minimalist': mini,
        })}
        >
          {animated && !mini &&
            <div>
              <div className="loader__stroke" />
              <div className="loader__stroke" />
              <div className="loader__stroke" />
              <div className="loader__stroke" />
              <div className="loader__stroke" />
            </div>
          }
          {animated && mini &&
            <div className="loader__stroke" />
          }
        </div>
      </div>
    );
  }
}

export default Loader;
