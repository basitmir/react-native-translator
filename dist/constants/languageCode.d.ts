import { TranslatorType } from './translatorTypes';
declare const LANGUAGE_CODES: {
    readonly papago: string[];
    readonly kakao: string[];
    readonly google: string[];
};
type ValueOf<T> = T[keyof T];
type SpecifiedLanguageCode<T extends TranslatorType> = ValueOf<Pick<typeof LANGUAGE_CODES, T>>[number];
export type LanguageCode<T extends TranslatorType> = SpecifiedLanguageCode<T>;
type AutoDetectableLanguage = 'google' | 'papago';
export type SourceLanguageCode<T extends TranslatorType> = T extends AutoDetectableLanguage ? SpecifiedLanguageCode<T> | 'auto' : SpecifiedLanguageCode<T>;
export default LANGUAGE_CODES;
