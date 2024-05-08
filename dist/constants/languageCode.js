"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const languageCode_1 = __importDefault(require("../translators/google/languageCode"));
const languageCode_2 = __importDefault(require("../translators/kakao/languageCode"));
const languageCode_3 = __importDefault(require("../translators/papago/languageCode"));
const LANGUAGE_CODES = { papago: languageCode_3.default, kakao: languageCode_2.default, google: languageCode_1.default };
exports.default = LANGUAGE_CODES;
