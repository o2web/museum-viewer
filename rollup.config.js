import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';
import { eslint } from 'rollup-plugin-eslint';
import del from 'rollup-plugin-delete';
import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
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
    plugins: [
      del({ targets: ['dist/*'] }),
      eslint({
        exclude: [
          '**/*.scss',
        ],
      }),
      external(),
      postcss({
        modules: true,
      }),
      url(),
      json(),
      babel({
        exclude: [
          'node_modules/**',
        ],
        externalHelpers: true,
        runtimeHelpers: true,
      }),
      resolve(),
      commonjs(),
    ],
    external: Object.keys(pkg.peerDependencies || {}),
  },
];
