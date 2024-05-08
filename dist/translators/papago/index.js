"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const translator_1 = __importDefault(require("../../classes/translator"));
const languageCode_1 = __importDefault(require("./languageCode"));
const papagoTranslator = new translator_1.default({
    lanaugeCodes: languageCode_1.default,
    selector: '#txtTarget',
    toUrl: (from, to, value) => `https://papago.naver.com/?sk=${from}&tk=${to}&hn=0&st=${encodeURI(value)}`,
}, {
    userAgent: 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.4) Gecko/20100101 Firefox/4.0',
});
exports.default = papagoTranslator;
