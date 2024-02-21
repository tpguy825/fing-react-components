import { IAMParserBase } from "./ModelsHelper";
import { isUndefined, isString } from "../../helpers/JsonHelper";

const K_DEFINITION_CONVERSION_DISPLAY = "display";
const K_DEFINITION_CONVERSION_CLICK = "click";

class IAMConversion extends IAMParserBase {
    display;
    click;

    constructor(json) {
        super();
        this.checkAndParseJson(json);
    }

    isDefined() {
        return this.display || this.click;
    }

    parseJson(conversion) {
        if (isString(conversion)) {
            this.click = conversion;
        } else {
            this.display = conversion[K_DEFINITION_CONVERSION_DISPLAY];
            this.click = conversion[K_DEFINITION_CONVERSION_CLICK];
        }
    }

    checkJson(conversion) {
        const display = conversion[K_DEFINITION_CONVERSION_DISPLAY];
        const click = conversion[K_DEFINITION_CONVERSION_CLICK];

        return ((isUndefined(display) || isString(display))
            && (isUndefined(click) || isString(click)))
            || isString(conversion)
        ;
    }
}

export default IAMConversion;