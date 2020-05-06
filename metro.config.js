/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const MetroConfig = require('@ui-kitten/metro-config');

/**
 * @see https://akveo.github.io/react-native-ui-kitten/docs/guides/improving-performance
 */
const evaConfig = {
  evaPackage: '@eva-design/eva',
};
const path = require('path');

const extraNodeModules = {
  components: path.join(__dirname, '/components'),
  features: path.join(__dirname, '/features'),
  store: path.join(__dirname, '/store'),
  state: path.join(__dirname, '/state'),
  types: path.join(__dirname, '/types'),
  hooks: path.join(__dirname, '/hooks'),
};
const watchFolders = [
  path.join(__dirname, '/components'),
  path.join(__dirname, '/features'),
  path.join(__dirname, '/store'),
  path.join(__dirname, '/state'),
  path.join(__dirname, '/types'),
  path.join(__dirname, '/hooks'),
];

module.exports = MetroConfig.create(evaConfig, {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    extraNodeModules,
  },
  watchFolders,
});
