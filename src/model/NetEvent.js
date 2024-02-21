import {
    EVT_DEVICE_BLOCK,
    EVT_DEVICE_CHANGE,
    EVT_HACKER_THREAT_CHECK,
    NS_UP,
    NS_NEW,
    NS_NEW_BLOCKED
} from './Constants';
import {safeParseInt} from "../helpers/JsonHelper";

export default class NetEvent {
    timestamp;      // Event timestamp, in millis
    sharpTime;      // Time the change occurred, in millis
    eventType;      // The type of event

    netNode;        // NetNode object of the device the event refers to (optional)
    contact;        // Contact object of the person that owns the device (optional)
    device;         // Device content (optional)
    content;        // Other content the specific network event might have

    onInspect;      // Fill with callback to redirect users to some other place for inspection (optional)

    /**
     * Fill the current object with data coming from Fing Desktop agent's JSON API reply.
     *
     * @param json The external data
     * @return this same object, modified.
     */
    applyFromDiscoveryStateLogAgentData(json, netNode, nextLog) {
        this.timestamp = safeParseInt(json, "time");
        this.sharpTime = safeParseInt(json, "sharptime");
        this.eventType = EVT_DEVICE_CHANGE;
        this.device = netNode;
        const duration = nextLog ? this.timestamp - nextLog.time : 0
        this.content = new NetEventChangeState(json.state.change, duration);
        return this;
    }
    applyFromPeopleData(json, nextLog) {
        const eventContent = json['eventContent'];
        this.timestamp = safeParseInt(json, "timestamp");
        this.sharpTime = safeParseInt(eventContent, "sharpTime");
        this.eventType = EVT_DEVICE_CHANGE;
        this.nextEventType = nextLog && nextLog.eventType;
        this.device = eventContent.device;
        const duration = nextLog ? this.timestamp - nextLog.timestamp : 0;
        this.content = new NetEventChangeState(eventContent.type, duration);
        return this;
    }

    applyFromHtcEventEntryData(json) {
        this.timestamp = safeParseInt(json, "timestamp");
        this.eventType = EVT_HACKER_THREAT_CHECK;
        this.content = json['eventContent'];
        return this;
    }

    applyFromDeviceBlockEventEntryData(json, nextEvent) {
        const eventContent = json['eventContent']
        this.timestamp = safeParseInt(json, "timestamp");
        this.sharpTime = safeParseInt(json, "sharptime");
        this.nextEventType = nextEvent && nextEvent.eventType;
        this.eventType = EVT_DEVICE_BLOCK;
        this.device = eventContent['device'];
        const duration = nextEvent ? this.timestamp - nextEvent.timestamp : 0;

        this.content = new NetEventDeviceBlock(eventContent['type'],eventContent['blockOptions'], duration);
        return this;
    }

    applyNewBlockEventEntryData(json) {
        const eventContent = json['eventContent'] || json['content'];
        this.timestamp = safeParseInt(json, "timestamp");
        this.eventType = EVT_DEVICE_BLOCK;
        this.device = eventContent['device'] || json['device'];

        this.content = new NetEventDeviceBlock(NS_NEW_BLOCKED,eventContent['blockOptions'], 0);
        return this;
    }

    // --------------------------------------------------------------------------------
    // Convenience methods
    // --------------------------------------------------------------------------------

    isDeviceOnline() {
        return this.content && (typeof this.content.isOnline === "function") && this.content.isOnline() === true;
    }

    isDeviceNew() {
        return this.content && (typeof this.content.isNew === "function") && this.content.isNew() === true;
    }

    isBlockedEvent(){
        return this.content && (typeof this.content.isBlockedEvent === "function") && this.content.isBlockedEvent() === true;
    }
    isPausedEvent(){
        return this.content && (typeof this.content.isPausedEvent === "function") && this.content.isPausedEvent() === true;
    }

    getTimeSinceOppositeState() {
        return this.content && this.content.timeSinceOppositeState ? this.content.timeSinceOppositeState : 0;
    }

    getTypeEvent(){
        return this.content && this.content.type ? this.content.type : "";
    }

    getDurationKickOutModeEvent(){
        return this.content && this.content.duration ? this.content.duration : 0;
    }
}

export class NetEventDeviceBlock {
    type;
    blockOptions;
    duration;

    constructor(type, blockOptions, duration){
        this.type = type;
        this.duration = duration;
        this.blockOptions = blockOptions;
    }
    
    isBlockedEvent(){
        return this.blockOptions['onlyInternet'] === "false";
    }
    isPausedEvent(){
        return this.blockOptions['onlyInternet'] === "true";
    }

}

export class NetEventChangeState {
    state;
    timeSinceOppositeState;

    constructor(state, timeSinceOppositeState) {
        this.state = state;
        this.timeSinceOppositeState = timeSinceOppositeState;
    }

    isOnline() {
        return this.state === NS_UP;
    }
    isNew() {
        return this.state === NS_NEW;
    }
}
