import LANGUAGE_MAP from '../constants/languageMap';
function languageCodeConverter(from, to, languageCode) {
    for (const key in LANGUAGE_MAP) {
        if (LANGUAGE_MAP[key][from] === languageCode) {
            return LANGUAGE_MAP[key][to];
        }
    }
}
export default languageCodeConverter;
