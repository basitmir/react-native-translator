import * as React from 'react';
import { TranslatorType } from '../constants/translatorTypes';
import { LanguageCode, SourceLanguageCode } from '../constants/languageCode';
type Translate = <T extends TranslatorType = 'google'>(from: SourceLanguageCode<T>, to: LanguageCode<T>, value: string, option?: {
    type?: T;
    timeout?: number;
}) => Promise<string>;
export declare const useTranslator: () => {
    translate: Translate;
};
export declare function TranslatorProvider({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
export {};
