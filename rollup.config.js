import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import url from '@rollup/plugin-url';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import { eslint } from 'rollup-plugin-eslint';
import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    // Output
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
      },
    ],
    // Plugins
    plugins: [
      eslint({
        exclude: [
          '**/*.scss',
          '**/*.woff',
        ],
      }),
      external(),
      postcss(),
      json(),
      url({
        include: ['**/*.woff', '**/*.woff2', '**/*.ttf'],
        limit: Infinity,
      }),
      babel({
        exclude: ['node_modules/**'],
        externalHelpers: true,
        runtimeHelpers: true,
      }),
      resolve(),
      commonjs(),
    ],
    // Exclude peer dependencies
    external: Object.keys(pkg.peerDependencies || {}),
  },
];
