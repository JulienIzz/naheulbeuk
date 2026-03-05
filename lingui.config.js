/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: ["fr", "en"],
  catalogs: [
    {
      path: "src/shared/i18n/locales/{locale}/messages",
      include: ["src"],
    },
  ],
  format: "po",
  sourceLocale: "fr",
  formatOptions: {
    lineNumbers: false,
  },
};
