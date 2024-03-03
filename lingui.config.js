/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  // Hindi and English
  locales: ["en", "cs", "fr"],
  sourceLocale: "en",
  catalogs: [
    {
      path: "src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
  format: "po",
};
