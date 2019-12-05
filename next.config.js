const { parsed: localEnv } = require('dotenv-flow').config();
const webpack = require('webpack');
const withOffline = require('next-offline')

const nextConfig = {
    generateSw: true,
    workboxOpts: {
        swDest: "./service-worker.js",
        // swSrc: path.join(__dirname, "./service-worker/index.js"),
        globPatterns: ['static/**/*'],
        globDirectory: '.'
    },

    webpack: (config, { isServer }) => {
        config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
        return config;
    }
};

module.exports = withOffline(nextConfig);