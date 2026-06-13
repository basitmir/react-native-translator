import LANGUAGE_CODES from './languageCode';
declare const TRANSLATOR_TYPES: readonly ["papago", "google"];
export type TranslatorType = keyof typeof LANGUAGE_CODES;
export default TRANSLATOR_TYPES;
