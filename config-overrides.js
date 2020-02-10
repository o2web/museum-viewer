const rewireSass = require('react-app-rewire-scss');
const rewireEslint = require('react-app-rewire-eslint');
const IconfontPlugin = require('iconfont-plugin-webpack');
const cssTemplate = require('./src/assets/fonts/icons/template');

module.exports = function override(config, env) {
  let newConfig = config;

  // iconFontPlugin
  newConfig.plugins = [
    ...newConfig.plugins,
    new IconfontPlugin({
      cssTemplate,
      src: './src/assets/icons',
      family: 'iconfont',
      dest: {
        font: './src/assets/fonts/icons/[family].[type]',
        css: './src/assets/fonts/icons/icons.scss',
      },
      watch: {
        pattern: './src/assets/icons/**/*.svg',
      },
    }),
  ];

  // rewire Sass
  newConfig = rewireSass(config, env);

  // rewireEslint
  newConfig = rewireEslint(newConfig, env);

  return newConfig;
};
