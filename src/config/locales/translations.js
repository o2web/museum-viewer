import fr from './fr/index';
import parse from './common';

const translations = {
  fr: parse(fr),
};

export const rawTranslations = { fr };
export const defaultLanguage = 'fr';
export const availableLanguages = Object.keys(translations);

export default translations;
