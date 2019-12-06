const { parsed: localEnv } = require('dotenv-flow').config();
const webpack = require('webpack');
const withOffline = require('next-offline')

const nextConfig = {
    webpack: (config, { isServer }) => {
        config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
        return config;
    },
    // workboxOpts: {
    //     generateInDevMode: true
    // }
};

module.exports = withOffline(nextConfig)