import googleTranslator from './google';
// import kakaoTranslator from './kakao';
import papagoTranslator from './papago';
const translators = {
    google: googleTranslator,
    papago: papagoTranslator,
    // kakao: kakaoTranslator, // kakao is deprecated
};
export default translators;
