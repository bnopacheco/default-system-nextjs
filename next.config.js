const { parsed: localEnv } = require('dotenv-flow').config();
const webpack = require('webpack');
const withOffline = require('next-offline')
const withFonts = require('next-fonts');
const withCSS = require('@zeit/next-css')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const PreloadWebpackPlugin = require('preload-webpack-plugin');

const nextConfig = {
    webpack: (config, { isServer }) => {
        config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
        // config.plugins.push(new HtmlWebpackPlugin());
        // config.plugins.push(new PreloadWebpackPlugin({
        //     rel: 'preload',
        //     include: 'allAssets'
        // }));
        config.module.rules.push({
            test: /\.(ico|gif|png|jpg|jpeg|svg|webp|woff|woff2)$/,
            use: [
              {
                loader: 'emit-file-loader',
                options: {
                  name: '_next/static/chunks/fonts/[name].[ext]',
                },
              },
              {
                loader: 'file-loader',
                options: {},
              },
            ],
          });

        return config;
    },
    // workboxOpts: {
    //     generateInDevMode: true
    // }
};

module.exports = withOffline(withFonts(withCSS(nextConfig)))