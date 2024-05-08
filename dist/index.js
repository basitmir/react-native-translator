"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRANSLATOR_TYPES = exports.LANGUAGE_CODES = exports.languageCodeConverter = exports.TranslatorProvider = exports.useTranslator = void 0;
const Translator_1 = __importDefault(require("./components/Translator"));
const TranslatorContext_1 = require("./contexts/TranslatorContext");
Object.defineProperty(exports, "TranslatorProvider", { enumerable: true, get: function () { return TranslatorContext_1.TranslatorProvider; } });
Object.defineProperty(exports, "useTranslator", { enumerable: true, get: function () { return TranslatorContext_1.useTranslator; } });
const languageCodeConverter_1 = __importDefault(require("./utils/languageCodeConverter"));
exports.languageCodeConverter = languageCodeConverter_1.default;
const languageCode_1 = __importDefault(require("./constants/languageCode"));
exports.LANGUAGE_CODES = languageCode_1.default;
const translatorTypes_1 = __importDefault(require("./constants/translatorTypes"));
exports.TRANSLATOR_TYPES = translatorTypes_1.default;
exports.default = Translator_1.default;
