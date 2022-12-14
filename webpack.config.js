const postcssPresetEnv = require('postcss-preset-env');
const postcssSortMedia = require('postcss-sort-media-queries');
const postcssReporter = require('postcss-reporter');
const autoprefixer = require('autoprefixer');
const flexGapPolyfill = require('flex-gap-polyfill');
const postcssCustomMedia = require('postcss-custom-media');
const postcssNested = require('postcss-nested');

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
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
                                    postcssReporter,
                                    postcssCustomMedia({ importFrom: './styles/vars.css' }),
                                    postcssNested,
                                    postcssSortMedia,
                                    flexGapPolyfill,
                                    autoprefixer,
                                ],
                            },
                        },
                    },
                ],
            },
        ],
    },
};
