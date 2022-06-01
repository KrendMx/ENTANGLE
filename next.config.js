/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});
const { i18n } = require('./next-i18next.config');

module.exports = withBundleAnalyzer({
    async headers() {
        return [
            {
                source: '/:all*(woff2|woff|ttf|eof)',
                locale: false,
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=9999999999, must-revalidate',
                    },
                ],
            },
        ];
    },
    i18n,
    images: {
        domains: ['app.entangle.fi', 'dev.entangle.fi'],
    },
});
