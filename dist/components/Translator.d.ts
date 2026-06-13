import * as React from 'react';
import { LanguageCode, SourceLanguageCode, TranslatorType } from '..';
export interface TranslatorProps<T extends TranslatorType> {
    from: SourceLanguageCode<T>;
    to: LanguageCode<T>;
    value: string;
    type?: T;
    onTranslated: (result: string) => void;
}
declare function Translator<T extends TranslatorType = 'google'>(props: TranslatorProps<T>): React.JSX.Element;
export default Translator;
