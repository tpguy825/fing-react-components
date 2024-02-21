import { IAMParserBase } from "./ModelsHelper";
import IAMStyle from "./IAMStyle";
import IAMTarget from "./IAMTarget";
import IAMScheduling from "./IAMScheduling";
import IAMConversion from "./IAMConversion";
import IAMNotification from "./IAMNotification";
import { isBoolean, isObject, isString, isUndefined, isURL } from "../../helpers/JsonHelper";

const K_DEFINITION_ID = "id";
const K_DEFINITION_LOCATION_ID = "locationId";
const K_DEFINITION_STYLE = "style";
const K_DEFINITION_ENABLED = "enabled";
const K_DEFINITION_TARGET = "target";
const K_DEFINITION_SCHEDULING = "scheduling";
const K_DEFINITION_CONVERSION = "conversion";
const K_DEFINITION_NOTIFICATION = "notification";
const K_DEFINITION_ACTION = "action";

class IAMDefinition extends IAMParserBase {
    id;
    locationId;
    style;
    enabled;
    target;
    scheduling;
    conversion;
    notification;
    action;

    constructor(json) {
        super();
        this.checkAndParseJson(json);
    }

    parseJson(message) {
        this.id = message[K_DEFINITION_ID];
        this.locationId = message[K_DEFINITION_LOCATION_ID];
        this.enabled = isBoolean(message[K_DEFINITION_ENABLED]) ? message[K_DEFINITION_ENABLED] : true;
        this.style = new IAMStyle(message[K_DEFINITION_STYLE]);
        this.target = message[K_DEFINITION_TARGET] ? new IAMTarget(message[K_DEFINITION_TARGET]) : undefined;
        this.scheduling = message[K_DEFINITION_SCHEDULING] ? new IAMScheduling(message[K_DEFINITION_SCHEDULING]) : undefined;
        this.conversion = message[K_DEFINITION_CONVERSION] ? new IAMConversion(message[K_DEFINITION_CONVERSION]) : undefined;
        this.notification = message[K_DEFINITION_NOTIFICATION] ?
            new IAMNotification(message[K_DEFINITION_NOTIFICATION]) : undefined
        ;
        this.action = message[K_DEFINITION_ACTION];
    }

    checkJson(message) {
        const id = message[K_DEFINITION_ID];
        const locationId = message[K_DEFINITION_LOCATION_ID];
        const enabled = message[K_DEFINITION_ENABLED];
        const style = message[K_DEFINITION_STYLE];
        const action = message[K_DEFINITION_ACTION];
        const target = message[K_DEFINITION_TARGET];
        const scheduling = message[K_DEFINITION_SCHEDULING];
        const conversion = message[K_DEFINITION_CONVERSION];
        const notification = message[K_DEFINITION_NOTIFICATION];

        return isString(id)
            && (isUndefined(locationId) || isString(locationId))
            && (isUndefined(enabled) || isBoolean(enabled))
            && isObject(style)
            && (isUndefined(action) || isURL(action))
            && (isUndefined(target) || isObject(target))
            && (isUndefined(scheduling) || isObject(scheduling))
            && (isUndefined(conversion) || isObject(conversion) || isString(conversion))
            && (isUndefined(notification) || isObject(notification))
        ;
    }

    matches(targetArgs, schedulingArgs) {
        return this.enabled
            && (!this.target || this.target.matches(targetArgs))
            && (!this.scheduling || this.scheduling.matches(schedulingArgs)
            )
        ;
    }
}

export default IAMDefinition;