import path from 'path';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';
import postcssUrl from 'postcss-url';
import postcssInlineBase64 from 'postcss-inline-base64';
import atImport from 'postcss-import';

import packageJson from './package.json';

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true,
    }),
    typescript({ objectHashIgnoreUnknownHack: true }),
    commonjs({
      include: ['node_modules/**'],
      exclude: ['**/*.stories.js'],
      namedExports: {
        'node_modules/react/react.js': ['Children', 'Component', 'PropTypes', 'createElement'],
        'node_modules/react-dom/index.js': ['render'],
      },
    }),
    postcss({
      inject: true,
      plugins: [
        postcssInlineBase64({
          baseDir: 'src/assets/',
        }),
        postcssUrl({
          url: 'inline',
        }),
        atImport({
          path: path.resolve(__dirname, '../'),
        }),
      ],
    }),
    copy({
      targets: [
        {
          src: 'src/variables.scss',
          dest: 'build',
          rename: 'variables.scss',
        },
      ],
    }),
  ],
};
