// eslint-disable-next-line @typescript-eslint/no-var-requires
const rootPath = require('path');
const getPath = (path) => rootPath.resolve(__dirname, path);

module.exports = {
  webpack: {
    alias: {
      '@components': getPath('./src/components'),
      '@hooks': getPath('./src/hooks'),
      '@store': getPath('./src/store'),
      '@views': getPath('./src/views'),
      '@utils': getPath('./src/utils'),
      '@interfaces': getPath('./src/utils/interfaces'),
    },
  },
};
