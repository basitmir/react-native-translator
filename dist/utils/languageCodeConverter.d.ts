import { LanguageCode, TranslatorType } from '..';
declare function languageCodeConverter<F extends TranslatorType, T extends TranslatorType>(from: F, to: T, languageCode: LanguageCode<F>): LanguageCode<T> | undefined;
export default languageCodeConverter;
