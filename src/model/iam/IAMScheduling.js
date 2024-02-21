import { IAMParserBase } from "./ModelsHelper";
import { isUndefined } from "../../helpers/JsonHelper";

const K_DEFINITION_SCHEDULING_FREQUENCY_PER_DEVICE = "frequency-per-device";
const K_DEFINITION_SCHEDULING_DAYS_BETWEEN_DISPLAY = "days-between-display";
const K_DEFINITION_SCHEDULING_DAYS_ACROSS_ANY_MESSAGE = "days-across-any-message";
const K_DEFINITION_SCHEDULING_DAYS_SINCE_FIRST_OPEN = "days-since-first-open";
const K_DEFINITION_SCHEDULING_START = "start_ms";
const K_DEFINITION_SCHEDULING_END = "end_ms";

class IAMScheduling extends IAMParserBase {
    frequencyPerDevice;
    daysBetweenDisplay;
    daysAcrossAnyMessage;
    daysSinceFirstOpen;
    startMs;
    endMs;

    constructor(json) {
        super();
        this.checkAndParseJson(json);
    }

    parseJson(scheduling) {
        this.frequencyPerDevice = scheduling[K_DEFINITION_SCHEDULING_FREQUENCY_PER_DEVICE] || 1;
        this.daysBetweenDisplay = scheduling[K_DEFINITION_SCHEDULING_DAYS_BETWEEN_DISPLAY];
        this.daysAcrossAnyMessage = scheduling[K_DEFINITION_SCHEDULING_DAYS_ACROSS_ANY_MESSAGE];
        this.daysSinceFirstOpen = scheduling[K_DEFINITION_SCHEDULING_DAYS_SINCE_FIRST_OPEN];
        this.startMs = timestampToDate(scheduling[K_DEFINITION_SCHEDULING_START]);
        this.endMs = timestampToDate(scheduling[K_DEFINITION_SCHEDULING_END]);
    }

    checkJson(scheduling) {
        const frequencyPerDevice = scheduling[K_DEFINITION_SCHEDULING_FREQUENCY_PER_DEVICE];
        const daysBetweenDisplay = scheduling[K_DEFINITION_SCHEDULING_DAYS_BETWEEN_DISPLAY];
        const daysAcrossAnyMessage = scheduling[K_DEFINITION_SCHEDULING_DAYS_ACROSS_ANY_MESSAGE];
        const daysSinceFirstOpen = scheduling[K_DEFINITION_SCHEDULING_DAYS_SINCE_FIRST_OPEN];
        const startMs = scheduling[K_DEFINITION_SCHEDULING_START];
        const endMs = scheduling[K_DEFINITION_SCHEDULING_END];

        return (isUndefined(frequencyPerDevice) || Number.isInteger(frequencyPerDevice))
            && (isUndefined(daysBetweenDisplay) || Number.isInteger(daysBetweenDisplay))
            && (isUndefined(daysAcrossAnyMessage) || Number.isInteger(daysAcrossAnyMessage))
            && (isUndefined(daysSinceFirstOpen) || Number.isInteger(daysSinceFirstOpen))
            && (isUndefined(startMs) || Number.isInteger(startMs))
            && (isUndefined(endMs) || Number.isInteger(endMs))
        ;
    }

    /**
     * @typedef {SchedulingArgs}
     * @property {number|undefined} showCount 
     * @property {timestamp|undefined} lastShowDate 
     * @property {timestamp|undefined} lastShowDateForAnyMessage
     * @property {timestamp|undefined} appFirstOpen
     */

    matches(args) {
        if (this.startMs && isDateAfterNow(this.startMs)) {
            return false;
        }

        if (this.endMs && isDateBeforeNow(this.endMs)) {
            return false;
        }

        const daysSinceLastShow = args.lastShowDate ? getNumberOfDaysUntilNow(args.lastShowDate) : -1;

        const daysSinceLastShowOfAnyMessage = 
            args.lastShowDateForAnyMessage ? getNumberOfDaysUntilNow(args.lastShowDateForAnyMessage) : -1
        ;

        const checksFrequencyPerDeviceRule = args.showCount < this.frequencyPerDevice;

        const checksDaysBetweenDisplayRule = 
            !this.daysBetweenDisplay || daysSinceLastShow === -1 || daysSinceLastShow >= this.daysBetweenDisplay
        ;

        const checksDaysAcrossAnyMessageRule =
            !this.daysAcrossAnyMessage || daysSinceLastShowOfAnyMessage === -1 || daysSinceLastShowOfAnyMessage >= this.daysAcrossAnyMessage
        ;

        const checksDaysSinceFirstOpenRule = !this.daysSinceFirstOpen
            || (args.appFirstOpen && getNumberOfDaysUntilNow(args.appFirstOpen) >= this.daysSinceFirstOpen)
        ;

        return checksFrequencyPerDeviceRule 
            && checksDaysBetweenDisplayRule 
            && checksDaysAcrossAnyMessageRule
            && checksDaysSinceFirstOpenRule
        ;
    }
}

function timestampToDate(time) {
    if (time && Number.isInteger(time)) {
        return new Date(time);
    }

    return undefined;
}

function isDateAfterNow(date) {
    return date.getTime() > Date.now();
}

function isDateBeforeNow(date) {
    return date.getTime() < Date.now();
}

function getNumberOfDaysUntilNow(date) {
    const dateTime = date.getTime ? date.getTime() : Number(date);
    return daysSinceEpoch(Date.now() - dateTime);
}

function daysSinceEpoch(time) {
    return Math.floor(time / (1000 * 60 * 60 * 24));
}

export default IAMScheduling;