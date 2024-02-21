import IAMLocalizedText from "./IAMLocalizedText";
import { isString } from "../../helpers/JsonHelper";

export function isLocalTime(localTime) {
    if (!isString(localTime)) {
        return false;
    }

    if (localTime.indexOf(":") < 0) {
        return false;
    }

    const lts = localTime.split(":");

    if (lts.length === 2 && isFinite(Number(lts[0])) && isFinite(Number(lts[1]))) {
        return true;
    }

    if (lts.length === 3 && isFinite(Number(lts[0])) && isFinite(Number(lts[1])) && isFinite(Number(lts[2]))) {
        return true;
    }

    return false;
}

export function checkAndParseJsonWithModel(model, json) {
    if (model.checkJson(json)) {
        model.parseJson(json);
    } else {
        throw new Error(`[${model.constructor.name}] JSON check failed`);
    }
}

export function isDefaultLanguageInMap(map) {
    return map[IAMLocalizedText.DEFAULT_LANGUAGE_CODE.toLowerCase()] 
        || map[IAMLocalizedText.DEFAULT_LANGUAGE_CODE.toUpperCase()]
    ;
}

export class IAMParserBase {
    checkAndParseJson(json) {
        if (this.checkJson(json)) {
            this.parseJson(json);
        } else {
            this.throwParseError();
        }

        return this;
    }

    throwParseError() {
        throw new Error(`[${this.constructor.name}] JSON check failed`);
    }
}