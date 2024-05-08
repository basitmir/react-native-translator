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
exports.TranslatorProvider = exports.useTranslator = void 0;
const React = __importStar(require("react"));
const react_1 = require("react");
const react_native_1 = require("react-native");
const Translator_1 = __importDefault(require("../components/Translator"));
const TranslatorContext = (0, react_1.createContext)({});
const useTranslator = () => {
    const { translate } = (0, react_1.useContext)(TranslatorContext);
    return { translate };
};
exports.useTranslator = useTranslator;
function TranslatorProvider({ children }) {
    const [tasks, setTasks] = (0, react_1.useState)([]);
    const translate = (0, react_1.useCallback)(async (_from, _to, _value, option) => {
        if (_value === '') {
            return '';
        }
        return new Promise((resolve, reject) => {
            setTasks(prev => {
                const timeout = option?.timeout ?? 5000;
                const currentIndex = prev.length;
                function inactive() {
                    setTasks(_prev => {
                        const copyTasks = [..._prev];
                        copyTasks[currentIndex].active = false;
                        return copyTasks;
                    });
                }
                setTimeout(() => {
                    inactive();
                    reject('translate timeout');
                }, timeout);
                function onTranslated(result) {
                    inactive();
                    resolve(result);
                }
                return [
                    ...prev,
                    {
                        active: true,
                        from: _from,
                        to: _to,
                        value: _value,
                        type: option?.type ?? 'google',
                        onTranslated,
                    },
                ];
            });
        });
    }, []);
    // TODO clean up all tasks when every tasks are inactived, to use throttle or debounce
    return (<TranslatorContext.Provider value={{ translate }}>
      <react_native_1.View style={{ width: 0, height: 0 }}>
        {tasks.map((task, index) => (<TranslatorWrapper {...task} key={index}/>))}
      </react_native_1.View>
      {children}
    </TranslatorContext.Provider>);
}
exports.TranslatorProvider = TranslatorProvider;
function TranslatorWrapper({ active, ...translatorProps }) {
    if (!active) {
        return null;
    }
    return <Translator_1.default {...translatorProps}/>;
}
