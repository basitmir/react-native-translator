import Translator from '../classes/translator';
import { TranslatorType } from '../constants/translatorTypes';
declare const translators: Record<TranslatorType, Translator>;
export default translators;
