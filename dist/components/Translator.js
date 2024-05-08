"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_1 = require("react");
const lodash_1 = __importDefault(require("lodash"));
const react_native_webview_1 = __importDefault(require("react-native-webview"));
const translators_1 = __importDefault(require("../translators"));
const translator_1 = require("../classes/translator");
function Translator(props) {
    const { from, to, value: _value, onTranslated, type = 'google' } = props;
    const [value, setValue] = (0, react_1.useState)('');
    const translator = (0, react_1.useMemo)(() => translators_1.default[type], [type]);
    const injectedJavascript = (0, react_1.useMemo)(() => translator.getInjectedJavascript(), [translator]);
    const userAgent = (0, react_1.useMemo)(() => translator.userAgent, [translator]);
    const uri = (0, react_1.useMemo)(() => (from && to ? translator.toUrl(from, to, value) : ''), [translator, from, to, value]);
    const onMessage = (0, react_1.useCallback)((event) => {
        const result = event.nativeEvent.data;
        if (!result || result === translator_1.LOADING_MESSSAGE || result === 'Enter a URL') {
            return;
        }
        onTranslated(result);
    }, []);
    // set value throttled
    const throttledSetValue = (0, react_1.useMemo)(() => lodash_1.default.debounce(setValue, 100), []);
    (0, react_1.useEffect)(() => {
        if (_value === '') {
            // clear value when input value is empty
            setValue('');
            onTranslated('');
            return;
        }
        throttledSetValue(_value);
    }, [_value]);
    return (<react_native_webview_1.default style={{ width: 0, height: 0 }} injectedJavaScript={injectedJavascript} userAgent={userAgent} source={{ uri }} onMessage={onMessage} cacheEnabled/>);
}
exports.default = Translator;
