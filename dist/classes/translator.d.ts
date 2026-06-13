export declare const LOADING_MESSSAGE = "@L@O@A@D@I@N@G@";
type ToUrl = (from: string, to: string, value: string) => string;
interface TranslatorParams {
    selector: string;
    lanaugeCodes: string[];
    toUrl: ToUrl;
}
interface TranslatorOptions {
    userAgent?: string;
    beforeTranslate?: string;
}
export default class Translator {
    lanaugeCodes: string[];
    toUrl: ToUrl;
    selector: string;
    userAgent?: string;
    beforeTranslate?: string;
    constructor(params: TranslatorParams, options?: TranslatorOptions);
    getInjectedJavascript(): string;
}
export {};
