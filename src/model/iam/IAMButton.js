import IAMLocalizedText from "./IAMLocalizedText";
import { IAMParserBase, isDefaultLanguageInMap } from "./ModelsHelper";
import { isUndefined, isObject, isURL } from "../../helpers/JsonHelper";

const K_DEFINITION_BUTTON_TEXTS = "texts";
const K_DEFINITION_BUTTON_ACTION = "action";

class IAMButton extends IAMParserBase {
    texts;
    action;

    constructor(json) {
        super();
        this.checkAndParseJson(json);
    }

    parseJson(button) {
        this.texts = new IAMLocalizedText(button[K_DEFINITION_BUTTON_TEXTS]);
        this.action = button[K_DEFINITION_BUTTON_ACTION];
    }

    checkJson(button) {
        const texts = button[K_DEFINITION_BUTTON_TEXTS];
        const action = button[K_DEFINITION_BUTTON_ACTION];

        return (isUndefined(texts) || (isObject(texts) && isDefaultLanguageInMap(texts)))
            && isURL(action)
        ;
    }

    getTextByLanguage(language) {
        return this.texts.getText(language);
    }
}

export default IAMButton;