const { parsed: localEnv } = require('dotenv-flow').config();
const webpack = require('webpack');
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const path = require('path')

const nextConfig = {
    webpack: (config, { isServer }) => {
        config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
        config.plugins.push(
            new SWPrecacheWebpackPlugin({
                cacheId: 'test-lighthouse',
                filepath: path.resolve('./service-worker.js'),
                staticFileGlobs: [
                'static/**/*'
                ],
                minify: true,
                staticFileGlobsIgnorePatterns: [/\.next\//],
                runtimeCaching: [{
                handler: 'fastest',
                urlPattern: /[.](png|jpg|css)/
                },{
                handler: 'networkFirst',
                urlPattern: /^http.*/
                }]
            })
        );
        return config;
    },
    devServer: {
        setup: function (app) {
            app.get('/service-worker.js', function (req, res) {
                res.set({ 'Content-Type': 'application/javascript; charset=utf-8' });
                res.send(fs.readFileSync('./service-worker.js'));
            });
        }
    }
};

module.exports = nextConfig;