import { IAMParserBase } from "./ModelsHelper";
import { isUndefined, isObject } from "../../helpers/JsonHelper";
import IAMColorSpecialization from "./IAMColorSpecialization";

const K_DEFINITION_COLORS_DARK = "dark";
const K_DEFINITION_COLORS_LIGHT = "light";

class IAMColors extends IAMParserBase {
    dark;
    light;

    constructor(json) {
        super();
        this.checkAndParseJson(json);
    }

    checkJson(colors) {
        const dark = colors[K_DEFINITION_COLORS_DARK];
        const light = colors[K_DEFINITION_COLORS_LIGHT];

        if (!dark && !light) {
            return isObject(colors);
        } else {
            return (isUndefined(dark) || isObject(dark))
                && (isUndefined(light) || isObject(light))
            ;
        }
    }

    parseJson(colors) {
        const dark = colors[K_DEFINITION_COLORS_DARK];
        const light = colors[K_DEFINITION_COLORS_LIGHT];

        if (!dark && !light) {
            this.light = new IAMColorSpecialization(colors);
        } else {
            this.dark = new IAMColorSpecialization(dark);
            this.light = new IAMColorSpecialization(light);
        }
    }
}

export default IAMColors;