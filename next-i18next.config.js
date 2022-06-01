const locales = require('./locales');

module.exports = {
    i18n: {
        defaultLocale: 'en',
        locales,
        localeDetection: false,
        localeExtension: 'yaml',
    },
};
