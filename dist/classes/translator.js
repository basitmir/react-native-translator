"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOADING_MESSSAGE = void 0;
exports.LOADING_MESSSAGE = '@L@O@A@D@I@N@G@';
class Translator {
    lanaugeCodes;
    toUrl;
    selector;
    userAgent;
    beforeTranslate;
    constructor(params, options) {
        this.lanaugeCodes = params.lanaugeCodes;
        this.toUrl = params.toUrl;
        this.selector = params.selector;
        this.userAgent = options?.userAgent;
        this.beforeTranslate = options?.beforeTranslate;
    }
    getInjectedJavascript() {
        return `
      // if beforeTranslate is set, run it
      ${this.beforeTranslate ?? ''}

      var selector = '${this.selector}'
      // Wait for the element to be loaded
      setInterval(() => {
        var result = document.querySelector(selector)
        if(result) {
          window.ReactNativeWebView.postMessage(result.innerText)
        }
        else {
          window.ReactNativeWebView.postMessage('${exports.LOADING_MESSSAGE}')
        }
      }, 200)
    `;
    }
}
exports.default = Translator;
