"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const translator_1 = __importDefault(require("../../classes/translator"));
const languageCode_1 = __importDefault(require("./languageCode"));
// EU cache policy agreement modal pass code
const beforeTranslate = `
  setTimeout(() => {
    try {
      document.querySelectorAll("form > div[data-is-touch-wrapper] > button")[1].click();
    } catch(e) { }
  }, 500)
`;
const googleTranslator = new translator_1.default({
    lanaugeCodes: languageCode_1.default,
    selector: 'c-wiz[role] > div > div[jsaction] > div > div',
    toUrl: (from, to, value) => `https://translate.google.com/?sl=${from}&tl=${to}&text=${encodeURI(value)}`,
}, { beforeTranslate });
exports.default = googleTranslator;
