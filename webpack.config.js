const postcssPresetEnv = require('postcss-preset-env');
const postcssImport = require('postcss-const');
const postcssSortMedia = require('postcss-sort-media-queries');
const postcssReporter = require('postcss-reporter');
const autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                ident: 'postcss',
                                plugins: [
                                    postcssPresetEnv({ stage: 0 }),
                                    postcssImport,
                                    postcssReporter,
                                    autoprefixer,
                                    postcssSortMedia,
                                ],
                            },
                        },
                    },
                ],
            },
        ],
    },
};
