// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig} = require('expo/metro-config');
const {mergeConfig} = require('@react-native/metro-config');

const {
  createSentryMetroSerializer
} = require("@sentry/react-native/dist/js/tools/sentryMetroSerializer");

/** @type {import('metro-config').MetroConfig} */
const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

const config = {
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer")
  },

  resolver: {
    assetExts: assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...sourceExts, "svg"]
  },

  serializer: {
    customSerializer: createSentryMetroSerializer()
  }
};

module.exports = mergeConfig(defaultConfig, config);