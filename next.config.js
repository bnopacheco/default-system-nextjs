const { parsed: localEnv } = require('dotenv-flow').config();
const webpack = require('webpack');

module.exports = {
    webpack: (config, { isServer }) => {
        config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
        return config;
    },
};