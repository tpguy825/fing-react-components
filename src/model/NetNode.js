import {DT_KICK_OUT_PROTECTED_TYPES, DT_USER_OS_RECOG_ENABLED_TYPES, NS_ALL_TYPES, NS_DOWN, NS_IN_RANGE, NS_UP} from "./Constants";
import {safeParseBool, safeParseEnum, safeParseInt} from "../helpers/JsonHelper";
import DeviceRecognition from "./DeviceRecognition";
import KickOutMode from "./KickOutMode";

/**
 * A node in a network. Called "NetNode" to clear avoid ambiguity with every Node.js reference
 */
export default class NetNode {
    ipAddresses;
    hwAddress;
    macVendor;
    hostName;
    state; // oneOf(NS_UP, NS_DOWN, NS_INRANGE)

    // User-customizable properties that define the device
    customType;
    customName;
    customNote;
    customLocation;
    favorite;
    important;
    tags;
    selfNode;
    gatewayNode;
    blockingDeviceNode;

    // User-customizable settings to tune behaviour
    stateChangeTimeout;
    alertOnStateChange;
    autoWakeOnLan;
    kickOutMode;
    digitalPresence;
    contactId;
    contactType;

    // Timestamps
    firstSeenTime;
    lastSeenTime;
    lastChangeTime;
    lastInRangeTime;
    stateChangeTime;
    customChangeTime;
    macVendorChangeTime;
    lastDeepScanTime;
    lastDhcpRequestTime;

    // Device collected data
    netbiosInfo;
    snmpInfo;
    dhcpInfo;
    dhcp6Info;
    bonjourInfo;
    upnpInfo;

    // Device event logs
    logs;

    // Device recognition
    bestTypeId;
    bestMakeId;
    bestModelId;
    bestFamilyId;
    bestOsId;
    bestName;
    bestType;
    bestMake;
    bestModel;
    bestFamily;
    bestSerialNo;
    isFamily;
    recogRank;
    bestOs;
    bestOsVer;
    bestOsBuild;
    brandPicture;
    osPicture;
    osVersionName;
    recognitionOwnerName;
    recogDone;
    devRecog;
    usrRecog;

    // NEW DATA OBJECT
    lastTcpServiceScanShot;
    httpInfo;
    httpScanInfo;
    sshInfo;
    telnetInfo;
    ftpInfo;
    smbInfo;

    /**
     * Fill the current object with data coming from Fing Desktop agent's JSON API reply.
     * Use as:
     *
     * const json = fetchNodeDataFromAPI();
     * <code>const netNode = new NetNode().applyFromAgentData(json)</code>.
     *
     * @param json The external data
     * @return this same object, modified.
     */
    applyFromAgentData(json) {

        this.hwAddress = json["mac_address"];
        this.ipAddresses = json["address_list"];
        this.macVendor = json["mac_vendor"];
        this.hostName = json["host_name"];
        this.state = safeParseEnum(json, "state", NS_ALL_TYPES);

        this.customName = json["customName"];
        this.customType = json["customType"];
        this.customNote = json["customNote"];
        this.customLocation = json["customLocation"];
        this.favorite = safeParseBool(json, "favorite");
        this.important = safeParseBool(json, "important");
        this.recogDone = safeParseBool(json, "usrrecog");

        if (json["dev_recog"]) {
            this.devRecog = new DeviceRecognition().applyFromAgentData(json["dev_recog"]);
        }

        if (json["usr_recog"]) {
            this.usrRecog = new DeviceRecognition().applyFromAgentData(json["usr_recog"]);
            this.recogDone = true;
        }

        this.stateChangeTimeout = safeParseInt(json, "statechangetimeout");
        this.alertOnStateChange = safeParseBool(json, "alertOnStateChange");
        this.digitalPresence = safeParseBool(json, "digitalPresence");

        if (json["kickOutMode"]) {
            this.kickOutMode = new KickOutMode().applyFromAgentData(json["kickOutMode"]);
        }

        this.firstSeenTime = safeParseInt(json, "firstseentime");
        this.lastSeenTime = safeParseInt(json, "lastseentime");
        this.stateChangeTime = safeParseInt(json, "statechangetime");
        this.customChangeTime = safeParseInt(json, "customChangeTime");
        this.macVendorChangeTime = safeParseInt(json, "mac_vendor_changed");
        this.lastDeepScanTime = safeParseInt(json, "last_deep_scan_time");
        this.lastDhcpRequestTime = safeParseInt(json, "last_dhcp_request_time");

        this.bestTypeId = safeParseInt(json, "best_type_id");
        this.bestMakeId = safeParseInt(json, "best_make_id");
        this.bestModelId = safeParseInt(json, "best_model_id");
        this.bestFamilyId = safeParseInt(json, "best_family_id");
        this.bestName = json["best_name"];
        this.bestType = json["best_type"];
        this.bestMake = json["best_make"];
        this.bestModel = json["best_model"];
        this.bestFamily = json["best_family"];
        this.bestSerialNo = json["best_sno"];
        this.bestOs = json["best_os"];
        this.bestOsVer = json["best_osver"];
        this.bestOsBuild = json["best_osbuild"];
        this.isFamily = safeParseBool(json, "isFamily");
        this.recogRank = safeParseInt(json, "recog_rank");

        this.contactId = json["contactId"];

        this.logs = json["logs"];

        // NEW DATA
        this.selfNode = safeParseBool(json, "selfNode");
        this.recognizing = safeParseBool(json, "recognizing");
        this.customType = json["customType"];
        this.prevStateTime = safeParseInt(json, "prevstatetime");
        this.bestOsId = safeParseInt(json, "best_os_id");
        this.ownerName = json["ownerName"];

        this.bonjourInfo = json["bonjour"]; // name model os serviceinfo_list
        this.upnpInfo = json["upnp"]; // name make model serialNumber type_list service_list
        this.dhcpInfo = json["dhcp"]; // name params vendor mud
        this.dhcp6Info = json["dhcp6"]; // name params vendor mud enterpriseid
        this.netbiosInfo = json["netbios"]; // name mac domain user is_file_server is_domain_controller
        this.lastTcpServiceScanShot = json["lastTcpServiceScanShot"]; // timestamp activePorts
        this.httpInfo = json["http"]; // useragent_list
        this.httpScanInfo = json["httpScan"]; // timestamp httpserver_list
        this.sshInfo = json["sshInfo"]; // timestamp banner
        this.telnetInfo = json["telnetInfo"]; // timestamp banner
        this.ftpInfo = json["ftpInfo"]; // timestamp banner
        this.smbInfo = json["smbInfo"]; // timestamp nativeOS nativeLM
        this.snmpInfo = json["snmp"]; // sysoid name services description contact location

        // TO REVIEW
        this.tags = json["tags"];
        this.autoWakeOnLan = safeParseBool(json, "autoWakeOnLan");
        this.lastChangeTime = safeParseInt(json, "lastchangetime");
        this.recognitionOwnerName = json["owner"];
        this.contactType = json["ownerType"];
        
        return this;
    }

    applyFromCatalog(catalog) {
        if (!catalog) {
            return this;
        }
        
        this.osVersionName = catalog.recogOs && catalog.recogOs.osVersionName;

        if (!this.osVersionName && this.bestOs) {
            this.osVersionName = `${this.bestOs}${this.bestOsVer ? " " + this.bestOsVer : ""}`;
        }

        return this;
    }

    applyFromDiscovery(discoveryOrSnapshot) {
        if (!discoveryOrSnapshot) {
            return this;
        }

        const isSnapshot = Boolean(discoveryOrSnapshot.discovery && !discoveryOrSnapshot.engine_state);

        if (isSnapshot) {
            const snapshot = discoveryOrSnapshot;
            const discoveryState = snapshot.discovery;
            const discovery = discoveryState.discovery;

            this.onSnapshotApplies(discoveryOrSnapshot);

            if (discovery) {
                this.onDiscoveryApplies(discovery);
            }
        } else {
            const isDiscoveryState = Boolean(discoveryOrSnapshot.engine_state);
            const discovery = isDiscoveryState ? discoveryOrSnapshot.discovery || {} : discoveryOrSnapshot;

            if (Object.keys(discovery).length > 0) {
                this.onDiscoveryApplies(discovery);
            }
        }

        return this;
    }

    onSnapshotApplies(snapshot) {
        const kickOutValidation = snapshot.kickoutValidation || snapshot.validation;

        if (kickOutValidation) {
            this.blockingDeviceNode = this.hwAddress === kickOutValidation.blockingDeviceHwAddress;
        }
    }

    onDiscoveryApplies(discovery) {
        if (discovery.network && discovery.network.gateway_mac_address) {
            this.gatewayNode = this.hwAddress === discovery.network.gateway_mac_address;
        }
    }

    isUserOsRecogEnabled() {
        const hasOsRecog = this.usrRecog && this.usrRecog.hasOsRecog();
        const isBestTypeValid = this.bestType && DT_USER_OS_RECOG_ENABLED_TYPES.includes(this.bestType);
        
        return Boolean(hasOsRecog) || Boolean(isBestTypeValid);
    }

    extractValueForAgentData() {
        const res = {
            id: this.hwAddress,
            customType: this.customType,
            customName: this.customName,
            customNote: this.customNote,
            customLocation: this.customLocation,
            alertOnStateChange: this.alertOnStateChange,
            statechangetimeout: this.stateChangeTimeout ? String(this.stateChangeTimeout) : undefined,
            last_deep_scan_time: this.lastDeepScanTime ? String(this.lastDeepScanTime) : undefined,
            favorite: this.favorite ? String(this.favorite) : undefined,
            important: this.important ? String(this.important) : undefined
        };

        if (this.kickOutMode && !this.kickOutMode.isEmpty() && !this.isProtectedFromBeingKickedOut()) {
            res.kickOutMode = this.kickOutMode.extractValueForAgentData();
        }

        return res;
    }

    isUp() {
        return this.state === NS_UP || this.state === NS_IN_RANGE;
    }

    isDown() {
        return this.state === NS_DOWN
    }

    getLastOnlineToDownTime() {
        if (!this.isDown())
            return this.stateChangeTime;
        const maxSeenTime = Math.max(this.lastSeenTime || 0, this.lastInRangeTime || 0);
        if (maxSeenTime === 0)
            return this.stateChangeTime;
        return maxSeenTime;
    }

    getLastDownToOnlineTime() {
        if (this.isDown())
            return this.stateChangeTime;
        if (this.logs === undefined || this.logs.length < 2)
            return this.stateChangeTime;

        let entryIndex = 0;
        let lastLog = this.logs[0];
        if (lastLog == null)
            return this.stateChangeTime;

        const lastChangeLog = lastLog;
        if (lastChangeLog.time !== this.stateChangeTime)
            return this.stateChangeTime;
        if (lastChangeLog.state !== this.state)
            return this.stateChangeTime;

        let prevOnlineLog = null;
        for (; entryIndex < this.logs; ++entryIndex) {
            const prevChangeLog = this.logs[entryIndex];
            if (prevChangeLog.state === "UP" || prevChangeLog.state === "INRANGE") {
                prevOnlineLog = prevChangeLog;
                continue;
            }
            break;
        }
        if (prevOnlineLog == null)
            return this.stateChangeTime;
        return prevOnlineLog.sharpTime || prevOnlineLog.time;
    }

    getBestMakeAndModelAsArray() {
        if (!this.bestMake && !this.macVendor)
            return [];

        let make = this.bestMake;
        let model = this.bestModel;
        if (make && model) {
            return [make, model];
        } else if (model) {
            return [model];
        } else if (make) {
            return [make];
        } else {
            return [this.macVendor];
        }
    }

    getBestIdentifier() {
        return this.bestName || this.bestModel || this.bestFamily || this.bestMake || this.bestOs || this.macVendor;
    }

    isConfirmed() {
        return this.customChangeTime && this.customChangeTime > 0;
    }

    isSelf() {
        return this.selfNode;
    }

    isGateway() {
        return this.gatewayNode;
    }

    isBlockingDevice() {
        return this.blockingDeviceNode;
    }

    isFingbox() {
        const equalsIgnoreCase = (attr, test) => 
            attr && typeof attr === "string" && attr.toLowerCase() === test.toLowerCase()
        ;

        const equalsFingbox = attr => equalsIgnoreCase(attr, "Fingbox");

        if (this.devRecog) {
            return equalsFingbox(this.devRecog.typeName) || equalsFingbox(this.devRecog.familyName);
        }
        
        if (this.upnpInfo) {
            return equalsFingbox(this.upnpInfo.name) || equalsFingbox(this.upnpInfo.model);
        }

        /** 
         *  macVendor can't be overwritten by the user, while best fields can be, so we strengthen the check by adding it. 
         *  This may still give false positives whenever a Domotz device is present, so previous tests happen to be more reliable.
         */ 
        return equalsIgnoreCase(this.macVendor, "Domotz") 
            || equalsFingbox(this.bestName) 
            || equalsFingbox(this.bestType)
            || equalsFingbox(this.bestFamily)
        ;
    }

    kickOut() {
        if (!this.kickOutMode) {
            this.kickOutMode = new KickOutMode();
        }

        return this.kickOutMode;
    }

    clearKickOut() {
        delete this.kickOutMode;
    }

    isProtectedFromBeingKickedOut() {
        /**
         * Applying from discovery is required to know if this node is a gateway. When this information is not
         * available we must be conservative and just protect the node, since isGateway() and isBlockingDevice() 
         * would test false (as undefined)
         */
        const hasAppliedFromDiscovery = typeof this.gatewayNode !== "undefined" || typeof this.blockingDeviceNode !== "undefined";
        const isProtectedDeviceType = () => this.bestType && DT_KICK_OUT_PROTECTED_TYPES.includes(this.bestType);

        return !hasAppliedFromDiscovery
            || this.isSelf()
            || this.isGateway()
            || this.isBlockingDevice()
            || isProtectedDeviceType()
            || this.isFingbox()
        ;
    }

    kickOutFormattedDate() {
        return (this.kickOutMode && this.kickOutMode.getRequestTimeFormatted()) || null;
    }

    isBlocked() {
        return (this.kickOutMode && this.kickOutMode.isBlocked()) || false;
    }

    isPaused() {
        return (this.kickOutMode && this.kickOutMode.isPaused()) || false;
    }

    getKickOutModeDuration() {
        return (this.kickOutMode && this.kickOutMode.duration) || null;
    }
}