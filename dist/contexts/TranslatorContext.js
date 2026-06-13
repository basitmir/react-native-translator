import * as React from 'react';
import { createContext, useCallback, useContext, useState } from 'react';
import { View } from 'react-native';
import Translator from '../components/Translator';
const TranslatorContext = createContext({});
export const useTranslator = () => {
    const { translate } = useContext(TranslatorContext);
    return { translate };
};
export function TranslatorProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const translate = useCallback(async (_from, _to, _value, option) => {
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
      <View style={{ width: 0, height: 0 }}>
        {tasks.map((task, index) => (<TranslatorWrapper {...task} key={index}/>))}
      </View>
      {children}
    </TranslatorContext.Provider>);
}
function TranslatorWrapper({ active, ...translatorProps }) {
    if (!active) {
        return null;
    }
    return <Translator {...translatorProps}/>;
}
