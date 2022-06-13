import { getDefaultConfig } from 'expo/metro-config';

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig(__dirname);
  return {
    resolver: {
      sourceExts: [...sourceExts, 'jsx', 'js', 'ts', 'tsx', 'cjs'],
      assetExts: [assetExts, 'png', 'jpg', 'jpeg', 'gif', 'svg'],
    },
  };
})();
