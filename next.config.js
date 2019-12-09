const { parsed: localEnv } = require('dotenv-flow').config();
const webpack = require('webpack');
const withOffline = require('next-offline')
const withFonts = require('next-fonts');
const withCSS = require('@zeit/next-css')

const nextConfig = {
    webpack: (config, { isServer }) => {
        config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
        config.module.rules.push({
            test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000,
                    name: '[name].[ext]'
                }
            }
        })
        return config;
    },
    // workboxOpts: {
    //     generateInDevMode: true
    // }
};

module.exports = withOffline(withFonts(withCSS(nextConfig)))