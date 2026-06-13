export const LOADING_MESSSAGE = '@L@O@A@D@I@N@G@';
export default class Translator {
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
      var interval = setInterval(() => {
        var result = document.querySelector(selector)
        if(result && result.innerText) {
          clearInterval(interval)
          window.ReactNativeWebView.postMessage(result.innerText)
        }
        else {
          window.ReactNativeWebView.postMessage('${LOADING_MESSSAGE}')
        }
      }, 200)
    `;
    }
}
