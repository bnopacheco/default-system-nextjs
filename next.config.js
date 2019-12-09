const { parsed: localEnv } = require('dotenv-flow').config();
const webpack = require('webpack');
const withOffline = require('next-offline')
const withFonts = require('next-fonts');
const withCSS = require('@zeit/next-css')

const nextConfig = {
    webpack: (config, { isServer }) => {
        config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
        return config;
    },
    // workboxOpts: {
    //     generateInDevMode: true
    // }
};

module.exports = withOffline(withFonts(withCSS(nextConfig)))