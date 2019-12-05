const { parsed: localEnv } = require('dotenv-flow').config();
const webpack = require('webpack');
const withOffline = require('next-offline')

const nextConfig = {
    workboxOpts: {
        generateSw: true,
        generateInDevMode: true,
        runtimeCaching: [
            {
                urlPattern: /^https?.*/,
                handler: 'NetworkFirst',
                options: {
                  cacheName: 'offlineCache',
                  expiration: {
                    maxEntries: 200
                  }
                }
            },
            {
              urlPattern: /.png$/,
              handler: 'CacheFirst'
            },
            {
              urlPattern: /api/,
              handler: 'NetworkFirst',
              options: {
                cacheableResponse: {
                  statuses: [0, 200],
                  headers: {
                    'x-test': 'true'
                  }
                }
              }
            }
          ]
    },
    webpack: (config, { isServer }) => {
        config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
        return config;
    }
};

module.exports = withOffline(nextConfig);