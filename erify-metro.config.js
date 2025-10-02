/**
 * 👑 ERIFY Metro Config
 * Custom bundler settings for ERIFYBOT and future ERIFY apps.
 * No limits. Just legacy. ⚡🔥
 */
const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();

  return {
    transformer: {
      babelTransformerPath: require.resolve("react-native-svg-transformer"), // Example: handle SVGs
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== "svg"),
      sourceExts: [...sourceExts, "svg", "cjs"], // Add custom extensions
    },
    server: {
      enhanceMiddleware: (middleware) => {
        return (req, res, next) => {
          console.log(`🚇 ERIFY Metro → ${req.url}`);
          return middleware(req, res, next);
        };
      },
    },
  };
})();
