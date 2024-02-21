import { isBoolean, isUndefined, isEmptyString } from "../../helpers/JsonHelper";
import { IAMParserBase, isLocalTime } from "./ModelsHelper";

const K_DEFINITION_LOCAL_TIME = "local-time";
const K_DEFINITION_ENABLED = "enabled";

class IAMNotification extends IAMParserBase {
    localTime;
    enabled;

    constructor(json) {
        super();
        this.checkAndParseJson(json);
    }

    parseJson(notification) {
        this.localTime = notification[K_DEFINITION_LOCAL_TIME];
        this.enabled = notification[K_DEFINITION_ENABLED] || false;
    }

    checkJson(notification) {
        const localTime = notification[K_DEFINITION_LOCAL_TIME];
        const enabled = notification[K_DEFINITION_ENABLED];

        return (isUndefined(enabled) || isBoolean(enabled))
            && !isEmptyString(localTime) && isLocalTime(localTime)
        ;
    }
}

export default IAMNotification;