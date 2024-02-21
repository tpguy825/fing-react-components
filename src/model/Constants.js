/*
 * Copyright (c) Fing. All rights reserved.
 */
// WEBSITES
export const FACEBOOK = "https://www.facebook.com/";
export const TWITTER = "https://www.twitter.com/";
export const TIKTOK = "https://www.tiktok.com/";
export const LINKEDIN = "https://www.linkedin.com/";
export const YOUTUBE = "https://www.youtube.com/";
export const INSTAGRAM = "https://www.instagram.com/";
export const PINTEREST = "https://www.pinterest.com/";

// CDN
export const DEFAULT_CDN = "https://cdn.fing.io/images";
// Tint
export const TINT_PRIMARY = "primary";
export const TINT_SECONDARY = "secondary";
export const TINT_SUCCESS = "success";
export const TINT_WARNING = "warning";
export const TINT_DANGER = "danger";
export const TINT_NAVY = "navy";
export const TINT_WHITE = "white";
export const TINT_DARK = "dark";
export const TINT_PURPLE = "purple";
export const TINT_INDIGO = "indigo";
export const TINT_PINK = "pink";
export const TINT_LIGHT = "light";
// Network Types
export const NT_WIFI = "WIFI";
export const NT_ETHERNET = "ETHERNET";
export const NT_ETH_USB = "USB_ETHERNET";
export const NT_ETH_WIFI = "ETH_WIFI";
export const NT_FINGBOX_V1 = "FINGBOX_V1";
export const NT_FINGBOX_V2 = "FINGBOX_V2";
export const NT_IP = "IP";
export const NT_ALL_TYPES = [NT_WIFI, NT_ETHERNET, NT_ETH_USB, NT_ETH_WIFI, NT_FINGBOX_V1, NT_FINGBOX_V2, NT_IP];
// Tool
export const TOOL_PING = "TOOL_PING";
export const TOOL_BLOCK = "TOOL_BLOCK";
export const TOOL_WAKE_ON_LAN = "TOOL_WAKE_ON_LAN";
export const TOOL_TRACEROUTE = "TOOL_TRACEROUTE";
export const TOOL_WIFI_SCANNER = "TOOL_WIFI_SCANNER";
export const TOOL_DNS_LOOKUP = "TOOL_DNS_LOOKUP";
export const TOOL_MAC_LOOKUP = "TOOL_MAC_LOOKUP";
export const TOOL_DHCP_DISCOVERY = "TOOL_DHCP_DISCOVERY";
export const TOOL_DNS_BENCHMARK = "TOOL_DNS_BENCHMARK";
export const TOOL_FIND_OPEN_PORTS = "TOOL_FIND_OPEN_PORTS";
export const TOOL_ROUTER_VULNERABILITY_CHECK= "TOOL_ROUTER_VULNERABILITY_CHECK";
export const TOOL_FIND_HIDDEN_CAMERAS = "TOOL_FIND_HIDDEN_CAMERAS";
export const TOOL_SPEED_TEST = "TOOL_SPEED_TEST";
export const TOOL_OUTAGE_DETECTOR = "TOOL_OUTAGE_DETECTOR";
export const TOOL_ISP_COMPARISON = "TOOL_ISP_COMPARISON";
export const TOOL_PAUSE = "TOOL_PAUSE";
export const TOOL_CONFIRMED = "TOOL_CONFIRMED";
export const TOOL_EXPORT = "TOOL_EXPORT";

export const TOOL_ALL_TYPES = [TOOL_EXPORT, TOOL_CONFIRMED,TOOL_BLOCK,TOOL_PAUSE,TOOL_PING,TOOL_WAKE_ON_LAN,TOOL_TRACEROUTE,TOOL_WIFI_SCANNER,TOOL_DNS_LOOKUP,TOOL_MAC_LOOKUP,TOOL_DHCP_DISCOVERY,TOOL_DNS_BENCHMARK,TOOL_FIND_OPEN_PORTS,TOOL_ROUTER_VULNERABILITY_CHECK,TOOL_FIND_HIDDEN_CAMERAS,TOOL_SPEED_TEST,TOOL_OUTAGE_DETECTOR,TOOL_ISP_COMPARISON];
// Network Contexts
export const NC_HOME = "HOME";
export const NC_OFFICE = "OFFICE";
export const NC_RENTAL = "RENTAL";
export const NC_PUBLIC = "PUBLIC";
export const NC_ALL_TYPES = [NC_HOME, NC_OFFICE, NC_RENTAL, NC_PUBLIC];

// AchievementIcon
export const AI_VIDEO = "VIDEO";
export const AI_GAME = "GAME";
export const AI_WORK = "WORK";
export const AI_SOCIAL = "SOCIAL";
export const AI_CALL = "CALL";
export const AI_ALL_TYPES = [AI_GAME, AI_WORK, AI_SOCIAL, AI_VIDEO, AI_CALL];

// SupportIcon
export const SI_TWITTER = "TWITTER";
export const SI_PHONE = "PHONE";
export const SI_FACEBOOK = "FACEBOOK";
export const SI_WEBSITE = "WEBSITE";
export const SI_ALL_TYPES=[SI_PHONE, SI_FACEBOOK, SI_TWITTER, SI_WEBSITE];

// TrendIcon
export const TI_UP = 'TREND_UP';
export const TI_UP_FAST = 'TREND_UP_FAST';
export const TI_DOWN = 'TREND_DOWN';
export const TI_DOWN_FAST = 'TREND_DOWN_FAST';
export const TI_ALL_TYPES = [TI_UP, TI_DOWN, TI_UP_FAST, TI_DOWN_FAST];
// Generic
export const GEN_QUESTION = "QUESTION";
export const GEN_LOCATION = "LOCATION";
export const GEN_UP = "UP";
export const GEN_DOWN = "DOWN";
export const GEN_QUESTION_CIRCLE = "QUESTION_CIRCLE";
export const GEN_INFO = "INFO";
export const GEN_TREND_UP = "TREND_UP";
export const GEN_TREND_DOWN = "TREND_DOWN";
export const GEN_TREND_FLAT = "TREND_FLAT";
export const GEN_BADGE = "BADGE";
export const GEN_FLAG = "FLAG";
export const GEN_FLAG_OUT = "FLAG_OUT";

export const GEN_ALL_TYPES = [GEN_FLAG_OUT, GEN_FLAG, GEN_BADGE, GEN_TREND_UP, GEN_TREND_DOWN, GEN_TREND_FLAT, GEN_QUESTION_CIRCLE, GEN_QUESTION, GEN_UP, GEN_DOWN, GEN_LOCATION, GEN_INFO];

// Contact Types
export const CT_FAMILY = "FAMILY";
export const CT_FAMILY_HIM = "HIM";
export const CT_FAMILY_HER = "HER";
export const CT_FAMILY_KID = "KID";
export const CT_FAMILY_RELATIVE = "RELATIVE";
export const CT_FAMILY_PET = "PET";
export const CT_FAMILY_PET_DOG = "DOG";
export const CT_FAMILY_PET_CAT = "CAT";
export const CT_COLLEAGUE = "COLLEAGUE";
export const CT_COLLEAGUE_STAFF = "STAFF";
export const CT_COLLEAGUE_CONTRACTOR = "CONTRACTOR";
export const CT_COLLEAGUE_VISITOR = "VISITOR";
export const CT_HELP = "HELP";
export const CT_HELP_CLEANING = "CLEANING";
export const CT_HELP_MEDICAL = "MEDICAL";
export const CT_HELP_MAINTENANCE = "MAINTENANCE";
export const CT_HELP_DELIVERY = "DELIVERY";
export const CT_FRIEND = "FRIEND";
export const CT_GUEST = "GUEST";
export const CT_OTHERS = "OTHERS";
export const CT_ALL_TYPES = [CT_FAMILY, CT_FAMILY_HIM, CT_FAMILY_HER, CT_FAMILY_KID, CT_FAMILY_RELATIVE,
    CT_FAMILY_PET, CT_FAMILY_PET_DOG, CT_FAMILY_PET_CAT, CT_COLLEAGUE, CT_COLLEAGUE_STAFF, CT_COLLEAGUE_CONTRACTOR,
    CT_COLLEAGUE_VISITOR, CT_HELP, CT_HELP_CLEANING, CT_HELP_MEDICAL, CT_HELP_MAINTENANCE, CT_HELP_DELIVERY,
    CT_FRIEND, CT_GUEST, CT_OTHERS];

export const GND_MALE = "MALE"
export const GND_FEMALE = "FEMALE"

const CT_STRUCTURE = [
    {type: CT_FAMILY, parent: null, contexts: [NC_HOME]},
    {type: CT_FAMILY_HIM, parent: CT_FAMILY, contexts: [NC_HOME]},
    {type: CT_FAMILY_HER, parent: CT_FAMILY, contexts: [NC_HOME]},
    {type: CT_FAMILY_KID, parent: CT_FAMILY, contexts: [NC_HOME]},
    {type: CT_FAMILY_RELATIVE, parent: CT_FAMILY, contexts: [NC_HOME]},
    {type: CT_FAMILY_PET, parent: CT_FAMILY, contexts: [NC_HOME]},
    {type: CT_FAMILY_PET_CAT, parent: CT_FAMILY_PET, contexts: [NC_HOME]},
    {type: CT_FAMILY_PET_DOG, parent: CT_FAMILY_PET, contexts: [NC_HOME]},
    {type: CT_COLLEAGUE, parent: null, contexts: [NC_OFFICE, NC_PUBLIC]},
    {type: CT_COLLEAGUE_STAFF, parent: CT_COLLEAGUE, contexts: [NC_OFFICE, NC_PUBLIC]},
    {type: CT_COLLEAGUE_CONTRACTOR, parent: CT_COLLEAGUE, contexts: [NC_OFFICE, NC_PUBLIC]},
    {type: CT_COLLEAGUE_VISITOR, parent: CT_COLLEAGUE, contexts: [NC_OFFICE, NC_PUBLIC]},
    {type: CT_HELP, parent: null, contexts: null},
    {type: CT_HELP_CLEANING, parent: CT_HELP, contexts: null},
    {type: CT_HELP_MEDICAL, parent: CT_HELP, contexts: null},
    {type: CT_HELP_MAINTENANCE, parent: CT_HELP, contexts: null},
    {type: CT_HELP_DELIVERY, parent: CT_HELP, contexts: null},
    {type: CT_FRIEND, parent: null, contexts: [NC_HOME]},
    {type: CT_GUEST, parent: null, contexts: [NC_OFFICE, NC_RENTAL, NC_PUBLIC]},
    {type: CT_OTHERS, parent: null, contexts: null}
    ];

// Both parameters can be null
export function contactTypesMatching(parentType, networkContext) {
    return CT_STRUCTURE
        .filter(value =>
            (parentType === null || value.parent === parentType) &&
            (value.contexts === null || networkContext === null || value.contexts.includes(networkContext)))
        .map(value => value.type);
}

export function contactTypeParent(contactType) {
    return contactType ? CT_STRUCTURE
        .find(value => value.type === contactType)
        .map(value => value.parent) : null;
}

// Engine states
export const ES_STARTING = "starting";
export const ES_INIT = "initializing";
export const ES_DISCOVERY = "discovery";
export const ES_COMPLETED = "completed";
export const ES_FAILED = "failed";
export const ES_STOPPING = "stopping";
export const ES_UNAUTHORIZED = "unauthorized";
export const ES_IDLE = "idle";

// Device Types
export const DT_GENERIC = "GENERIC";
export const DT_MOBILE = "MOBILE";
export const DT_TABLET = "TABLET";
export const DT_IPOD = "IPOD";
export const DT_EREADER = "EREADER";
export const DT_WATCH = "WATCH";
export const DT_WEARABLE = "WEARABLE";
export const DT_CAR = "CAR";

export const DT_MEDIA_PLAYER = "MEDIA_PLAYER";
export const DT_TELEVISION = "TELEVISION";
export const DT_GAME_CONSOLE = "GAME_CONSOLE";
export const DT_STREAMING_DONGLE = "STREAMING_DONGLE";
export const DT_LOUDSPEAKER = "LOUDSPEAKER";
export const DT_SOUND_SYSTEM = "SOUND_SYSTEM";
export const DT_STB = "STB";
export const DT_DISC_PLAYER = "DISC_PLAYER";
export const DT_SATELLITE = "SATELLITE";
export const DT_MUSIC = "MUSIC";
export const DT_REMOTE_CONTROL = "REMOTE_CONTROL";
export const DT_RADIO = "RADIO";
export const DT_PHOTO_CAMERA = "PHOTO_CAMERA";
export const DT_PHOTOS = "PHOTOS";
export const DT_MICROPHONE = "MICROPHONE";
export const DT_PROJECTOR = "PROJECTOR";
export const DT_AUTOMATIC = "AUTOMATIC";
export const DT_COMPUTER = "COMPUTER";
export const DT_LAPTOP = "LAPTOP";
export const DT_DESKTOP = "DESKTOP";
export const DT_PRINTER = "PRINTER";
export const DT_PHONE = "PHONE";
export const DT_VOIP = "VOIP";
export const DT_CONFERENCING = "CONFERENCING";
export const DT_SCANNER = "SCANNER";
export const DT_POS = "POS";
export const DT_CLOCK = "CLOCK";
export const DT_BARCODE = "BARCODE";

export const DT_SURVEILLANCE_CAMERA = "SURVEILLANCE_CAMERA";
export const DT_SMART_HOME = "SMART_HOME";
export const DT_SMART_PLUG = "SMART_PLUG";
export const DT_LIGHT = "LIGHT";
export const DT_VOICE_CONTROL = "VOICE_CONTROL";
export const DT_THERMOSTAT = "THERMOSTAT";
export const DT_POWER_SYSTEM = "POWER_SYSTEM";
export const DT_SOLAR_PANEL = "SOLAR_PANEL";
export const DT_SMART_METER = "SMART_METER";
export const DT_HEATING = "HEATING";
export const DT_APPLIANCE = "APPLIANCE";
export const DT_WASHER = "WASHER";
export const DT_FRIDGE = "FRIDGE";
export const DT_CLEANER = "CLEANER";
export const DT_SLEEP = "SLEEP";
export const DT_FITNESS = "FITNESS";
export const DT_GARAGE = "GARAGE";
export const DT_POOL = "POOL";
export const DT_SPRINKLER = "SPRINKLER";
export const DT_BELL = "BELL";
export const DT_KEY_LOCK = "KEY_LOCK";
export const DT_CONTROL_PANEL = "CONTROL_PANEL";
export const DT_SMART_CONTROLLER = "SMART_CONTROLLER";
export const DT_SCALE = "SCALE";
export const DT_TOY = "TOY";
export const DT_ROBOT = "ROBOT";
export const DT_WEATHER = "WEATHER";
export const DT_HEALTH_MONITOR = "HEALTH_MONITOR";
export const DT_BABY_MONITOR = "BABY_MONITOR";
export const DT_PET_MONITOR = "PET_MONITOR";
export const DT_ALARM = "ALARM";
export const DT_MOTION_DETECTOR = "MOTION_DETECTOR";
export const DT_SECURITY_SYSTEM = "SECURITY_SYSTEM";
export const DT_SMOKE = "SMOKE";
export const DT_HUMIDITY = "HUMIDITY";
export const DT_SENSOR = "SENSOR";
export const DT_FINGBOX = "FINGBOX";
export const DT_DOMOTZ_BOX = "DOMOTZ_BOX";

export const DT_ROUTER = "ROUTER";
export const DT_WIFI = "WIFI";
export const DT_WIFI_EXTENDER = "WIFI_EXTENDER";
export const DT_NAS_STORAGE = "NAS_STORAGE";
export const DT_MODEM = "MODEM";
export const DT_SWITCH = "SWITCH";
export const DT_GATEWAY = "GATEWAY";
export const DT_FIREWALL = "FIREWALL";
export const DT_VPN = "VPN";
export const DT_POE_PLUG = "POE_PLUG";
export const DT_USB = "USB";
export const DT_SMALL_CELL = "SMALL_CELL";
export const DT_CLOUD = "CLOUD";
export const DT_BATTERY = "BATTERY";
export const DT_NETWORK_APPLIANCE = "NETWORK_APPLIANCE";

export const DT_VIRTUAL_MACHINE = "VIRTUAL_MACHINE";
export const DT_SERVER = "SERVER";
export const DT_TERMINAL = "TERMINAL";
export const DT_MAIL_SERVER = "MAIL_SERVER";
export const DT_FILE_SERVER = "FILE_SERVER";
export const DT_PROXY_SERVER = "PROXY_SERVER";
export const DT_WEB_SERVER = "WEB_SERVER";
export const DT_DOMAIN_SERVER = "DOMAIN_SERVER";
export const DT_COMMUNICATION = "COMMUNICATION";
export const DT_DATABASE = "DATABASE";

export const DT_RASPBERRY = "RASPBERRY";
export const DT_ARDUINO = "ARDUINO";
export const DT_PROCESSOR = "PROCESSOR";
export const DT_CIRCUIT_CARD = "CIRCUIT_CARD";
export const DT_RFID = "RFID";

export const DT_INDUSTRIAL = "INDUSTRIAL";
export const DT_MEDICAL = "MEDICAL";
export const DT_AUTOMOTIVE = "AUTOMOTIVE";
export const DT_ENERGY = "ENERGY";

export const DT_ALL_TYPES = [
    DT_AUTOMATIC,
    DT_GENERIC, DT_MOBILE, DT_TABLET, DT_IPOD, DT_EREADER, DT_WATCH, DT_WEARABLE, DT_CAR,

    DT_MEDIA_PLAYER, DT_TELEVISION, DT_GAME_CONSOLE, DT_STREAMING_DONGLE, DT_LOUDSPEAKER, DT_SOUND_SYSTEM,
    DT_STB, DT_DISC_PLAYER, DT_SATELLITE, DT_MUSIC, DT_REMOTE_CONTROL, DT_RADIO, DT_PHOTO_CAMERA, DT_PHOTOS,
    DT_MICROPHONE, DT_PROJECTOR,

    DT_COMPUTER, DT_LAPTOP, DT_DESKTOP, DT_PRINTER, DT_PHONE, DT_VOIP, DT_CONFERENCING, DT_SCANNER, DT_POS,
    DT_CLOCK, DT_BARCODE,

    DT_SURVEILLANCE_CAMERA, DT_SMART_HOME, DT_SMART_PLUG, DT_LIGHT, DT_VOICE_CONTROL, DT_THERMOSTAT, DT_POWER_SYSTEM,
    DT_SOLAR_PANEL, DT_SMART_METER, DT_HEATING, DT_APPLIANCE, DT_WASHER, DT_FRIDGE, DT_CLEANER, DT_SLEEP, DT_FITNESS,
    DT_GARAGE, DT_POOL, DT_SPRINKLER, DT_BELL, DT_KEY_LOCK, DT_CONTROL_PANEL, DT_SMART_CONTROLLER,
    DT_SCALE, DT_TOY, DT_ROBOT, DT_WEATHER, DT_HEALTH_MONITOR, DT_BABY_MONITOR, DT_PET_MONITOR, DT_ALARM,
    DT_MOTION_DETECTOR, DT_SECURITY_SYSTEM, DT_SMOKE, DT_HUMIDITY, DT_SENSOR, DT_FINGBOX, DT_DOMOTZ_BOX,

    DT_ROUTER, DT_WIFI, DT_WIFI_EXTENDER, DT_NAS_STORAGE, DT_MODEM, DT_SWITCH, DT_GATEWAY, DT_FIREWALL,
    DT_VPN, DT_POE_PLUG, DT_USB, DT_SMALL_CELL, DT_CLOUD, DT_BATTERY, DT_NETWORK_APPLIANCE,

    DT_VIRTUAL_MACHINE, DT_SERVER, DT_TERMINAL, DT_MAIL_SERVER, DT_FILE_SERVER, DT_PROXY_SERVER, DT_WEB_SERVER,
    DT_DOMAIN_SERVER, DT_COMMUNICATION, DT_DATABASE,

    DT_RASPBERRY, DT_ARDUINO, DT_PROCESSOR, DT_CIRCUIT_CARD, DT_RFID,

    DT_INDUSTRIAL, DT_MEDICAL, DT_AUTOMOTIVE, DT_ENERGY
];

export const DT_PRESENCE_TYPES = [DT_MOBILE, DT_WATCH];

export const DT_PRESENCE_DISCARD_TYPES = [
    DT_ALARM, DT_BELL, DT_CLEANER, DT_DOMOTZ_BOX, DT_FINGBOX, DT_FRIDGE, DT_GARAGE,
    DT_HEATING, DT_HUMIDITY, DT_KEY_LOCK, DT_LIGHT, DT_MODEM, DT_MOTION_DETECTOR,
    DT_POWER_SYSTEM, DT_SENSOR, DT_SMART_HOME, DT_SMART_METER, DT_SMART_PLUG,
    DT_SMOKE, DT_SOLAR_PANEL, DT_SPRINKLER, DT_SURVEILLANCE_CAMERA, DT_THERMOSTAT];

export const DT_USER_OS_RECOG_ENABLED_TYPES = [
    DT_MOBILE, DT_TABLET, DT_IPOD, DT_WATCH, DT_COMPUTER, DT_LAPTOP, DT_DESKTOP,
    DT_RASPBERRY, DT_PROCESSOR, DT_VIRTUAL_MACHINE, DT_SERVER, DT_DOMAIN_SERVER,
    DT_WEB_SERVER, DT_PROXY_SERVER, DT_FILE_SERVER, DT_TELEVISION, DT_STB
];

export const DT_KICK_OUT_PROTECTED_TYPES = [
    DT_ROUTER, DT_WIFI, DT_WIFI_EXTENDER, DT_MODEM, DT_SWITCH, DT_GATEWAY, 
    DT_FIREWALL, DT_VPN
];

export const NS_UP = "UP";
export const NS_DOWN = "DOWN";
export const NS_NEW = "NEW";
export const NS_IN_RANGE = "INRANGE";
export const NS_NEW_BLOCKED = "NEW_BLOCKED";
export const NS_ALL_TYPES = [ NS_UP, NS_DOWN, NS_IN_RANGE, NS_NEW_BLOCKED ];

export const NKT_HWADDRESS = "HWADDRESS";
export const NKT_IPADDRESS = "IPADDRESS";
export const NKT_ALL_TYPES = [ NKT_HWADDRESS, NKT_IPADDRESS ];

export const EVT_DEVICE_CHANGE = "NetworkDeviceChangeEvent";
export const EVT_WIFI_RADIO_MONITOR = "WiFiRadioMonitorEvent";
export const EVT_INTERNET_OUTAGE = "NetworkInternetOutageEvent";
export const EVT_WIFI_SWEET_SPOT = "WifiSweetSpotEvent";
export const EVT_BANDWIDTH_HOG = "IdentifyBandwidthHogEvent";
export const EVT_INTERNET_SPEED_TEST = "InternetSpeedTestEvent";
export const EVT_INTERNET_TROUBLESHOOTING = "InternetTroubleshootingEvent";
export const EVT_HACKER_THREAT_CHECK = "HackerThreatCheckEvent";
export const EVT_DEVICE_BLOCK = "DeviceBlockEventEntry";
export const EVT_WIFI_DEAUTH_ATTACK = "WiFiSecurityDeauthAttackEvent";
export const EVT_WIFI_EVIL_TWIN = "WiFiSecurityEvilTwinApEvent";
export const EVT_WIFI_NEW_BSSID = "WiFiSecurityNewBssidEvent";
export const EVT_GATEWAY_CHANGED = "NetworkGatewayChangeEvent";
export const EVT_INTERNET_CHANGED = "NetworkInternetChangeEvent";
export const EVT_IF_CONFIG_CHANGED = "NetworkInterfaceConfigChangeEvent";
export const EVT_AGENT_CHANGED = "AgentEvent";
export const EVT_DHCP_OUTAGE = "NetworkDhcpOutageEvent";
export const EVT_HEARTBEAT = "NetworkHeartbeatEvent";

export const POPULAR_TARGET_WEBSITES = [
    { displayName: "google.com", value: "google.com", local: false },
    { displayName: "amazon.com", value: "amazon.com", local: false },
    { displayName: "facebook.com", value: "facebook.com", local: false },
    { displayName: "bing.com", value: "bing.com", local: false }
]

export const I6S_NONE = "I6S_NONE";
export const I6S_LOCAL = "I6S_LOCAL";
export const I6S_INTERNET = "I6S_INTERNET";

export const I6S_ALL_IPV6_SETUPS = [
    I6S_NONE, I6S_LOCAL, I6S_INTERNET
];

export const SCRD_STATUS_OK = "OK";
export const SCRD_STATUS_WARN = "WARN";
export const SCRD_STATUS_FAIL = "FAIL";
export const SCRD_STATUS_INACTIVE = "INACTIVE";