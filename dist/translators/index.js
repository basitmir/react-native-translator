"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const google_1 = __importDefault(require("./google"));
const kakao_1 = __importDefault(require("./kakao"));
const papago_1 = __importDefault(require("./papago"));
const translators = {
    google: google_1.default,
    papago: papago_1.default,
    kakao: kakao_1.default,
};
exports.default = translators;
