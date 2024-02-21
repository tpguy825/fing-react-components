import { isEmptyString, isString } from "../../helpers/JsonHelper";

class IAMLocalizedText {
    static DEFAULT_LANGUAGE_CODE = "en";

    constructor(json) {
        this.textByLocale = {};

        for (const key in json) {
            if (isString(key) && isString(json[key]) && !isEmptyString(json[key])) {
                this.textByLocale[key.toLowerCase()] = json[key];
            }
        }
    }

    isLocalizedIn(language) {
        return isString(language) && this.textByLocale.hasOwnProperty(language.toLowerCase());
    }

    getText(language) {
        const lowerCaseLanguage = language.toLowerCase();

        return this.textByLocale[lowerCaseLanguage]
            || this.textByLocale[getIETFPrimaryLanguageSubtag(lowerCaseLanguage, "-")]
            || this.textByLocale[IAMLocalizedText.DEFAULT_LANGUAGE_CODE.toLowerCase()]
            || ""
        ;
    }
}

function getIETFPrimaryLanguageSubtag(lang, delimiter) {
    return lang.split(delimiter)[0];
}

export default IAMLocalizedText;