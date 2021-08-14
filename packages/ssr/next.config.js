const path = require('path');

module.exports = {
  webpack: (config, options) => {
    const configExternals = ['styled-components', 'react', 'react-dom'];
    if (options.isServer) {
      config.externals = [...configExternals, ...config.externals];
    }

    configExternals.forEach((configExternal) => {
      config.resolve.alias[configExternal] = path.resolve(
        __dirname,
        '.',
        'node_modules',
        configExternal,
      );
    });

    return config;
  },
};