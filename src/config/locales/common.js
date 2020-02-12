let parsesTranslations = {};

function recursiveParse(translations, key = '') {
  Object.keys(translations).forEach((prop) => {
    const nextTranslations = translations[prop];
    const nextKey = (key ? `${key}.${prop}` : prop);
    if (nextTranslations instanceof Object) {
      recursiveParse(nextTranslations, nextKey);
    } else {
      parsesTranslations[nextKey] = nextTranslations;
    }
  });
}

export default function parseTranslations(translations) {
  parsesTranslations = {};
  recursiveParse(translations);
  return parsesTranslations;
}
