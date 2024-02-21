import { IAMParserBase } from "./ModelsHelper";
import { isString, isUndefined } from "../../helpers/JsonHelper";

const K_DEFINITION_COLORS_BORDER = "border";
const K_DEFINITION_COLORS_EXTRA = "extra";

class IAMColorSpecialization extends IAMParserBase {
    border;
    extra;

    constructor(json) {
        super();
        this.checkAndParseJson(json);
    }

    checkJson(spec) {
        const border = spec[K_DEFINITION_COLORS_BORDER];
        const extra = spec[K_DEFINITION_COLORS_EXTRA];

        return (isUndefined(border) || isColor(border))
            && (isUndefined(extra) || isColor(extra))
        ;
    }

    parseJson(spec) {
        this.border = spec[K_DEFINITION_COLORS_BORDER];
        this.extra = spec[K_DEFINITION_COLORS_EXTRA];
    }
}

export default IAMColorSpecialization;

function isColor(color) {
    return isString(color) && color[0] === "#";
}