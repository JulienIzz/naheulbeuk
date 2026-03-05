export const getLocales = jest
  .fn()
  .mockReturnValue([
    { languageCode: "fr", languageTag: "fr-FR", isRTL: false },
  ]);
