import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import WebView from 'react-native-webview';
import translators from '../translators';
import { LOADING_MESSSAGE } from '../classes/translator';
function Translator(props) {
    const { from, to, value: _value, onTranslated, type = 'google' } = props;
    const [value, setValue] = useState('');
    const translator = useMemo(() => translators[type], [type]);
    const injectedJavascript = useMemo(() => translator.getInjectedJavascript(), [translator]);
    const userAgent = useMemo(() => translator.userAgent, [translator]);
    const uri = useMemo(() => (from && to ? translator.toUrl(from, to, value) : ''), [translator, from, to, value]);
    const onMessage = useCallback((event) => {
        const result = event.nativeEvent.data;
        if (!result ||
            result === LOADING_MESSSAGE ||
            result.includes('Enter a URL')) {
            return;
        }
        onTranslated(result);
    }, [onTranslated]);
    // set value throttled
    const throttledSetValue = useMemo(() => _.debounce(setValue, 100), []);
    useEffect(() => {
        if (_value === '') {
            // clear value when input value is empty
            setValue('');
            onTranslated('');
            return;
        }
        throttledSetValue(_value);
    }, [_value]);
    return (<WebView style={{ width: 0, height: 0 }} injectedJavaScript={injectedJavascript} userAgent={userAgent} source={{ uri }} onMessage={onMessage} cacheEnabled/>);
}
export default Translator;
