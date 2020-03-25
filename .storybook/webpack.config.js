const path = require('path');
const postCssUrl = require('postcss-url');
const postcssInlineBase64 = require('postcss-inline-base64');
const atImport = require('postcss-import');

module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: [
            postcssInlineBase64({
              baseDir: 'src/assets/',
            }),
            postCssUrl({ url: 'inline' }),
            atImport({
              path: path.resolve(__dirname, '../'),
            }),
          ],
        },
      },
      'sass-loader',
    ],
    include: path.resolve(__dirname, '../'),
  });

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [['react-app', { flow: false, typescript: true }]],
    },
  });
  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
