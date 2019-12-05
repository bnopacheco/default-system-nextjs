const { parsed: localEnv } = require('dotenv-flow').config();
const webpack = require('webpack');
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");

const nextConfig = {
    webpack: (config, { isServer }) => {
        config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
        config.plugins.push(
            new SWPrecacheWebpackPlugin({
                verbose: true,
                staticFileGlobsIgnorePatterns: [/\.next\//],
                runtimeCaching: [
                  {
                    handler: "networkFirst",
                    urlPattern: /^https?.*/
                  }
                ]
            })
        );
        return config;
    },
    devServer: {
        setup: function (app) {
            app.get('/service-worker.js', function (req, res) {
                res.set({ 'Content-Type': 'application/javascript; charset=utf-8' });
                res.send(fs.readFileSync('build/service-worker.js'));
            });
        }
    }
};

module.exports = nextConfig;