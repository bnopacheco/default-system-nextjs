const { parsed: localEnv } = require('dotenv-flow').config();
const webpack = require('webpack');

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
    }
};

module.exports = nextConfig;