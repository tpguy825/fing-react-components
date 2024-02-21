import { DATE_FORMAT_LONG, formatRelativeDate } from "../helpers/DateHelper";
import { safeParseBool, safeParseInt } from "../helpers/JsonHelper";

const Defaults = {
    REQUEST_TIME: () => Date.now(),
    DURATION: 0,
    ONLY_INTERNET: false
}

export default class KickOutMode {
    requestTime;
    duration;
    onlyInternet;

    applyFromAgentData(agentKickOutMode) {
        if (agentKickOutMode) {
            this.requestTime = safeParseInt(agentKickOutMode, "requestTime", Defaults.REQUEST_TIME());
            this.duration = safeParseInt(agentKickOutMode, "duration", Defaults.DURATION);
            this.onlyInternet = safeParseBool(agentKickOutMode, "onlyInternet", Defaults.ONLY_INTERNET);
        }

        return this;
    }

    extractValueForAgentData() {
        return {
            requestTime: String(this.requestTime || Defaults.REQUEST_TIME()),
            duration: String(this.duration || Defaults.DURATION),
            onlyInternet: String(this.onlyInternet || Defaults.ONLY_INTERNET)
        };
    }

    isEmpty() {
        return !this.requestTime && this.requestTime !== 0 && !this.duration && this.duration !== 0 && !this.onlyInternet;
    }

    isBlocked() {
        return this.onlyInternet === false && this.isInTimeRange();
    }

    isPaused() {
        return this.onlyInternet === true && this.isInTimeRange();
    }

    block() {
        this.onlyInternet = false;
        return this;
    }

    pause() {
        this.onlyInternet = true;
        return this;
    }

    fromNow() {
        this.requestTime = Date.now();
        return this;
    }

    from(requestTime) {
        this.requestTime = requestTime;
        return this;
    }

    indefinitely() {
        this.duration = 0;
        return this;
    }

    forTheNext(millis) {
        this.duration = millis;
        return this;
    }

    getRequestTimeFormatted(){
        return formatRelativeDate(this.requestTime, DATE_FORMAT_LONG);
    }

    isInTimeRange() {
        if (!this.requestTime) {
            return false;
        }

        const now = Date.now();
        return this.requestTime <= now && (!this.duration || now <= (this.requestTime + this.duration));
    }
}