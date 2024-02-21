/**
 * Created by marco on 2/6/21.
 *
 * (C) Copyright Fing
 */

import intl from 'react-intl-universal';
import {bestMakeAndModelAsArray, getOsPrintableVersion} from "../../helpers/RecogHelper";
import {parseEthernetAnswer} from "../../helpers/NetworkHelper";
import {
    NC_ALL_TYPES,
    NC_HOME,
    NC_OFFICE,
    NC_PUBLIC,
    NC_RENTAL,
    NT_ETH_USB,
    NT_ETHERNET,
    NT_WIFI
} from "../../model/Constants";

// --------------------------------------------------------------------------------
// PUBLIC API
// --------------------------------------------------------------------------------

export const HC_STATE_OK = "OK";
export const HC_STATE_SKIP = "SKIP";
export const HC_STATE_INFO = "INFO";
export const HC_STATE_WARN = "WARN";
export const HC_STATE_FAIL = "FAIL";
export const HC_STATES_GOOD = [HC_STATE_OK, HC_STATE_SKIP, HC_STATE_INFO];

export const HC_VIRTUAL_SELF = "self";
export const HC_VIRTUAL_GEO_LOCATION = "geoloc";
export const HC_VIRTUAL_ISP = "isp";
export const HC_VIRTUAL_NIC_INFO = "nicinfo";
export const HC_VIRTUAL_NETWORK = "network";
export const HC_VIRTUAL_GATEWAY = "gateway";

export const HC_SEGMENT_LOCAL = 'local';
export const HC_SEGMENT_NETWORK = 'network';
export const HC_SEGMENT_INTERNET = 'internet';
export const HC_SEGMENT_VIRTUAL = "virtual";

export const HC_IMAGE_TYPE_FONTAWESOME = "fontawesome_icon";
export const HC_IMAGE_TYPE_CDN = "cdn_image";
export const HC_IMAGE_TYPE_NETWORK_ICON = "network_type_icon";
export const HC_IMAGE_TYPE_DEVICE_ICON = "device_type_icon";
export const HC_IMAGE_TYPE_CONTEXT_ICON = "context_icon";

/**
 * Converts the given healthState object into a list of items to display.

 * @param healthState
 * @returns An array of item objects, or null if no original data could be extracted
 */
export function convertToItemList(healthState) {
    if (!healthState || !healthState.result || !healthState.result.checks ||
        healthState.result.checks.length < 1) return null;

    const checks = injectVirtualChecks(healthState);
    return checks.map((check, index) => check.segment === HC_SEGMENT_VIRTUAL ?
        convertVirtualCheckToItem(index, check, healthState) :
        convertCheckToItem(index, check, healthState));
}

// --------------------------------------------------------------------------------
// IMPLEMENTATION & PRIVATE CONVENIENCE FUNCTIONS
// --------------------------------------------------------------------------------

function convertVirtualCheckToItem(index, check, healthState) {
    if (check.type === HC_VIRTUAL_SELF) {
        return convertSelfCheck(index, check, healthState);
    } else if (check.type === HC_VIRTUAL_GATEWAY) {
        return convertGatewayCheck(index, check, healthState);
    } else if (check.type === HC_VIRTUAL_NIC_INFO) {
        return convertNicInfoCheck(index, check, healthState);
    } else if (check.type === HC_VIRTUAL_GEO_LOCATION) {
        return convertGeoLocInfoCheck(index, check, healthState);
    } else if (check.type === HC_VIRTUAL_ISP) {
        return convertIspInfoCheck(index, check, healthState);
    } else if (check.type === HC_VIRTUAL_NETWORK) {
        return convertNetworkInfoCheck(index, check, healthState);
    }

    return newItem(index, check);
}

function convertGatewayCheck(index, check, healthState) {
    const device = healthState.result.gateway;
    let deviceDetails = bestMakeAndModelAsArray(device);
    if (deviceDetails.length === 0 && device.mac_vendor) deviceDetails = [device.mac_vendor];

    let deviceOs;
    if (device && device.best_os) {
        deviceOs = device.best_os;
        if (device.best_osver) {
            const ver = getOsPrintableVersion(device.best_os, device.best_osver);
            deviceOs += ` ${ver ? ver : device.best_osver}`;
        }
    }

    let info = intl.get('discovery_network_netinfo_gateway_explicit');
    if (device.mac_address) info += ` ${device.mac_address}`;
    if (device.address_list && device.address_list.length > 0) info += ` (${device.address_list[0]})`;

    const titleElements = [];
    if (deviceDetails) titleElements.push(...deviceDetails);
    if (deviceOs) titleElements.push(deviceOs);
    if (!deviceDetails || deviceDetails.length === 0)
        titleElements.push(intl.get('healthcheck_report_network_gateway'));

    const item = newItem(index, check);
    item.segmentImage = { type: HC_IMAGE_TYPE_DEVICE_ICON, ref: device.best_type };
    item.segmentText = intl.get('discovery_network_netinfo_gateway');
    item.itemTitle = titleElements.join(" • ");
    item.itemSubtitle = info;

    return item;
}

function convertSelfCheck(index, check, healthState) {
    const device = healthState.result.self;
    const deviceDetails = bestMakeAndModelAsArray(device);

    let deviceOs;
    if (device && device.best_os) {
        deviceOs = device.best_os;
        if (device.best_osver) {
            const ver = getOsPrintableVersion(device.best_os, device.best_osver);
            deviceOs += ' ' + (ver ? ver : device.best_osver);
        }
    }

    const titleElements = [];
    if (deviceDetails) titleElements.push(...deviceDetails);
    if (deviceOs) titleElements.push(deviceOs);

    const item = newItem(index, check);
    item.segmentImage = { type: HC_IMAGE_TYPE_DEVICE_ICON, ref: device.best_type };
    item.segmentText = intl.get('generic_you').toLowerCase();
    item.itemTitle = titleElements.join(" • ");

    // Not localized because all other subtitles coming from the agent are not localized as well
    item.itemSubtitle = `Your device, ${device.best_name} (${device.mac_address})`;

    return item;
}

function convertNicInfoCheck(index, check, healthState) {
    const nif = healthState.result.nicinfos[0];

    let info = intl.get("healthcheck_v_nicinfo_I");
    let title;
    if (nif && nif.type === NT_ETHERNET) {
        title = intl.get('network_connection_type_eth_simple');
        info = intl.get('healthcheck_report_nicinfo_connection_info', {
            address: nif.address, ethRate: parseEthernetAnswer(nif.downlinkeffectiverate)
        });
    } else if (nif && nif.type === NT_ETH_USB) {
        title = intl.get('network_connection_type_eth_usb_simple');
        info = intl.get('healthcheck_report_nicinfo_connection_info', {
            address: nif.address, ethRate: parseEthernetAnswer(nif.downlinkeffectiverate)
        });
    } else if (nif && nif.type === NT_WIFI) {
        const band = nif.channel > 14 ? '5 GHz' : '2.4 GHz';
        if (nif.apssid && nif.apbssid) {
            title = intl.get('network_connection_type_wifi_apbssid', { band: band, apssid: nif.apbssid });
            info = intl.get('healthcheck_report_nicinfo_connection_more_info', {
                address: nif.address, speed: parseEthernetAnswer(nif.downlinkeffectiverate),
                apbssid: nif.apbssid, channel: nif.channel
            });
        } else {
            title = intl.get('network_connection_type_wifi', { band: band });
            info = intl.get('healthcheck_report_nicinfo_connection_info_nostation', {
                address: nif.address, speed: parseEthernetAnswer(nif.downlinkeffectiverate), channel: nif.channel
            });
        }
    } else {
        title = intl.get("generic_not_connected");
    }

    const item = newItem(index, check);
    item.segmentImage = { type: HC_IMAGE_TYPE_NETWORK_ICON, ref: (nif ? nif.type : NT_WIFI) };
    item.segmentText = intl.get('generic_link');
    item.itemTitle = title;
    item.itemSubtitle = info;

    return item;
}

function convertGeoLocInfoCheck(index, check, healthState) {
    const isp = healthState.result.internetinfo.isp;
    const image = isp.country_code ?
        "/flags/1x1/" + isp.country_code.toLowerCase() + ".png" :
        "/isp/general/default_isp.png";

    const titleElements = [];
    if (isp.country_city) titleElements.push(isp.country_city);
    if (isp.country_region) titleElements.push(isp.country_region);
    if (isp.country_name) titleElements.push(isp.country_name);

    const info = intl.get('healthcheck_report_geoloc_info', {
        name: isp.country_name,
        tz: isp.timezone ? intl.get('healthcheck_report_geoloc_timezone') + isp.timezone : ""
    });

    const item = newItem(index, check);
    item.segmentImage = { type: HC_IMAGE_TYPE_CDN, ref: image };
    item.segmentText = intl.get('healthcheck_report_geoloc_location');
    item.itemTitle = titleElements.join(", ");
    item.itemSubtitle = info;

    return item;
}

function convertIspInfoCheck(index, check, healthState) {
    const internetInfo = healthState.result.internetinfo;
    const isp = internetInfo.isp;
    const ispInfo = internetInfo.ispinfo;
    if (!isp || !ispInfo) return newItem(index, check);

    let image;
    if (ispInfo.bannerimageurl) {
        image = ispInfo.bannerimageurl;
    } else if (ispInfo.logoimageurl) {
        image = ispInfo.logoimageurl;
    } else {
        image = "/isp/general/default_isp.png"
    }
    const ispName = ispInfo.name ? ispInfo.name : isp.isp ? isp.isp : isp.organization;
    let bestLoc = isp.country_city ? isp.country_city : isp.country_name ? isp.country_name : '';
    if (ispInfo.ispstats) bestLoc = ispInfo.ispstats && ispInfo.ispstats.city ?
        ispInfo.ispstats.city : ispInfo.ispstats.country ? ispInfo.ispstats.country : '';

    const title = intl.get('healthcheck_report_isp_info_descr', { name: ispName, loc: bestLoc, address: isp.address });

    let info = intl.get('healthcheck_report_isp_info_message');
    if (ispInfo.ispstats) {
        info = intl.get('healthcheck_report_isp_info_stats_message_download', {
            number: (Number(ispInfo.ispstats.downloadSpeedMbpsAvg)).toFixed(1)
        });
        info += intl.get('healthcheck_report_isp_info_stats_message_upload', {
            number: (Number(ispInfo.ispstats.uploadSpeedMbpsAvg)).toFixed(1)
        });
        info += intl.get('healthcheck_report_isp_info_stats_message_share', {
            number: (Number(ispInfo.ispstats.distribution) * 100.0).toFixed(1)
        });
    }

    const item = newItem(index, check);
    item.segmentImage = { type: HC_IMAGE_TYPE_CDN, ref: image };
    item.segmentText = intl.get('generic_internet');
    item.itemTitle = title;
    item.itemSubtitle = info;

    return item;
}

function convertNetworkInfoCheck(index, check, healthState) {
    const net = healthState.result.network;
    const nif = healthState.result.nicinfos[0];
    let image = { type: HC_IMAGE_TYPE_NETWORK_ICON, ref: (nif ? nif.type : NT_WIFI) };

    let context = intl.get("generic_unknown");
    if (net.context && NC_ALL_TYPES.includes(net.context)) {
        if (net.context === NC_HOME) {
            image = { type: HC_IMAGE_TYPE_CONTEXT_ICON, ref: NC_HOME };
            context = intl.get("generic_home");
        } else if (net.context === NC_OFFICE) {
            image = { type: HC_IMAGE_TYPE_CONTEXT_ICON, ref: NC_OFFICE };
            context = intl.get('generic_office');
        } else if (net.context === NC_PUBLIC) {
            image = { type: HC_IMAGE_TYPE_CONTEXT_ICON, ref: NC_PUBLIC };
            context = intl.get('generic_public');
        } else if (net.context === 'RENTAL') {
            image = { type: HC_IMAGE_TYPE_CONTEXT_ICON, ref: NC_RENTAL };
            context = intl.get('generic_rental');
        }
    }

    let title = intl.get('healthcheck_report_networkinfo', { context: context });

    let accessPointList = "";
    let accessPointCount = 0;
    if (net.bssid || net.additionalbssids) {
        accessPointList = net.bssid;
        accessPointCount = 1;
        if (net.additionalbssids && net.additionalbssids.length > 0) {
            accessPointList += ", " + net.additionalbssids.join(", ");
            accessPointCount += net.additionalbssids.length;
        }
    }

    let info;
    if (net.address_type === 'NTYPE_WIFI') {
        info = intl.get('healthcheck_report_nettype_wireless', {
            address: net.address, aps: accessPointCount, bssid: accessPointList
        });
    } else if (net.address_type === 'NTYPE_ETHWIFI') {
        info = intl.get('healthcheck_report_nettype_ethwifi', {
            address: net.address, aps: accessPointCount, bssid: accessPointList
        });
    } else if (net.address_type === 'NTYPE_ETHERNET') {
        info = intl.get('healthcheck_report_nettype_eth', {
            address: net.address
        });
    } else {
        info = net.address;
    }

    const item = newItem(index, check);
    item.segmentImage = image;
    item.segmentText = intl.get('discovery_header_network');
    item.itemTitle = title;
    item.itemSubtitle = info;

    return item;
}

function convertCheckToItem(index, check, healthState) {
    let segmentImage = { type: HC_IMAGE_TYPE_FONTAWESOME, ref: "fa-server" };
    let segmentText = "";

    if (check.segment === HC_SEGMENT_NETWORK) {
        const nicInfo = healthState.result.nicinfos;
        const nif = nicInfo.length > 0 ? nicInfo[0] : null;
        if (nif && nif.type) {
            segmentImage = { type: HC_IMAGE_TYPE_NETWORK_ICON, ref: nif.type };
        } else {
            segmentImage = { type: HC_IMAGE_TYPE_FONTAWESOME, ref: "fa-network-wired" };
        }
        segmentText = intl.get('generic_network').toLowerCase();

    } else if (check.segment === HC_SEGMENT_INTERNET) {
        segmentImage = { type: HC_IMAGE_TYPE_FONTAWESOME, ref: "fa-cloud" };
        segmentText = intl.get('generic_internet').toLowerCase();

        // Override with ISP-specific icon if available
        const internetInfo = healthState.result.internetinfo;
        if (internetInfo && internetInfo.ispinfo) {
            const ispInfo = internetInfo.ispinfo;
            if (ispInfo.bannerimageurl) {
                segmentImage = { type: HC_IMAGE_TYPE_CDN, ref: ispInfo.bannerimageurl };
            } else if (ispInfo.logoimageurl) {
                segmentImage = { type: HC_IMAGE_TYPE_CDN, ref: ispInfo.logoimageurl };
            }
        }
    } else if (check.segment === HC_SEGMENT_LOCAL) {
        segmentImage = { type: HC_IMAGE_TYPE_FONTAWESOME, ref: "fa-laptop" };
        segmentText = intl.get('generic_local').toLowerCase();
    }

    const title = intl.get(`healthcheck_${check.type}_${HC_STATES_GOOD.includes(check.status) ? "G" : "B"}`);
    const subtitle = check.info;

    const item = newItem(index, check);
    item.segmentImage = segmentImage;
    item.segmentText = segmentText;
    item.itemTitle = title;
    item.itemSubtitle = subtitle;
    item.noContext = check.type === "402" && check.status === HC_STATE_WARN && healthState.result.network;
    item.editable = check.type === "810";
    item.mutable = check.status === HC_STATE_WARN && check.type !== "402";

    return item;
}

/**
 * Creates the base item for the UI.
 */
function newItem(index, check) {
    return {
        itemId: `hc_${index}`,
        code: check.type,
        segment: check.segment,
        status: check.status,
        premium: check.premium === "true",
        muted: check.muted === "true",

        segmentImage: { type: null, ref: null },
        segmentText: null,
        itemTitle: null,
        itemSubtitle: null,
        category: null,
        noContext: false,
        editable: false
    };
}

/**
 * Injects the array of engine checks with new virtual checks from local data. The checks are inserted at the
 * proper place.
 *
 * @param healthState The Health Check tool result
 * @return The modified list of checks
 */
function injectVirtualChecks(healthState) {
    const progress = healthState.progress;
    const isRunning = progress < 100;

    let checks = isRunning ?
        healthState.result.checks.slice(0) :    // Makes a copy of the array
        healthState.result.checks.filter(c => c.status !== HC_STATE_SKIP || c.premium === "true");

    if (healthState.result.self) {
        addVirtualCheck(checks, HC_SEGMENT_LOCAL, {
            segment: HC_SEGMENT_VIRTUAL,
            type: HC_VIRTUAL_SELF,
            status: HC_STATE_INFO
        });
    }

    const internetInfo = healthState.result.internetinfo;
    if (internetInfo && internetInfo.isp && internetInfo.isp.country_name) {
        addVirtualCheck(checks, HC_SEGMENT_INTERNET, {
            segment: HC_SEGMENT_VIRTUAL,
            type: HC_VIRTUAL_GEO_LOCATION,
            status: HC_STATE_INFO
        });

        // TODO: Check logic!
        if (internetInfo.isp.isp) {
            addVirtualCheck(checks, HC_SEGMENT_INTERNET, {
                segment: HC_SEGMENT_VIRTUAL,
                type: HC_VIRTUAL_ISP,
                status: HC_STATE_INFO
            });
        }

        if (internetInfo.isp.ispinfo && (internetInfo.isp.isp || internetInfo.isp.organization)) {
            addVirtualCheck(checks, HC_SEGMENT_INTERNET, {
                segment: HC_SEGMENT_VIRTUAL,
                type: HC_VIRTUAL_ISP,
                status: HC_STATE_INFO
            });
        }
    }

    const nicInfo = healthState.result.nicinfos;
    if (nicInfo && nicInfo.length > 0 && nicInfo[0].state && nicInfo[0].state === "ACTIVE") {
        addVirtualCheck(checks, HC_SEGMENT_NETWORK, {
            segment: HC_SEGMENT_VIRTUAL,
            type: HC_VIRTUAL_NIC_INFO,
            status: HC_STATE_INFO
        });
    }

    if (healthState.result.network) {
        addVirtualCheck(checks, HC_SEGMENT_NETWORK, {
            segment: HC_SEGMENT_VIRTUAL,
            type: HC_VIRTUAL_NETWORK,
            status: HC_STATE_INFO
        });
    }

    if (healthState.result.gateway) {
        addVirtualCheck(checks, HC_SEGMENT_NETWORK, {
            segment: HC_SEGMENT_VIRTUAL,
            type: HC_VIRTUAL_GATEWAY,
            status: HC_STATE_INFO
        });
    }

    return checks;
}

function addVirtualCheck(checks, beforeSegment, virtualCheck) {
    virtualCheck.muted = "false";
    let pos = 0;
    for (; pos < checks.length; ++pos) {
        if (checks[pos].segment === beforeSegment) break;
    }
    checks.splice(pos, 0, virtualCheck);
}

