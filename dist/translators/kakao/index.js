"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const translator_1 = __importDefault(require("../../classes/translator"));
const languageCode_1 = __importDefault(require("./languageCode"));
const kakaoTranslator = new translator_1.default({
    lanaugeCodes: languageCode_1.default,
    selector: '#result',
    toUrl: (from, to, value) => `https://translate.kakao.com/?lang=${from}${to}&q=${encodeURI(value)}`,
}, {
    userAgent: 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.4) Gecko/20100101 Firefox/4.0',
});
exports.default = kakaoTranslator;
