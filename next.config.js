/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

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
    images: {
        domains: ['app.entangle.fi', 'dev.entangle.fi'],
    },
    pwa: {
        dest: 'public',
        disable: true,
    },
});
