"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const languageMap_1 = __importDefault(require("../constants/languageMap"));
function languageCodeConverter(from, to, languageCode) {
    for (const key in languageMap_1.default) {
        if (languageMap_1.default[key][from] === languageCode) {
            return languageMap_1.default[key][to];
        }
    }
}
exports.default = languageCodeConverter;
