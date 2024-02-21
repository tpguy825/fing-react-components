/*
 * Copyright (c) Fing. All rights reserved.
 */

import intl from "react-intl-universal";
import { roundPercentile } from "./MathHelper";

export function parseEthernetAnswer(rate) {
    const number = Number(rate) / 1000000;

    if (number === 10000) return intl.get("10_gbit");
    else if (number === 1000) return intl.get("1_gbit");
    else if (number === 100) return intl.get("100_mbit");
    else if (number === 10) return intl.get("10_mbit");
    return number.toFixed(1) + intl.get("#_mbit");
}

export function rankString(score) {
    let SCORE_ROUND_FACTOR = 5.0;
    if (score && score >= 55.0) {
        return intl.get('isp_rank_summary_ranktop', {rank: roundPercentile((100.0 - score), SCORE_ROUND_FACTOR)});
    } else if (score && score <= 45.0) {
        return intl.get('isp_rank_summary_rankbottom', {rank: roundPercentile(score, SCORE_ROUND_FACTOR)});
    } else {
        return intl.get('isp_rank_summary_rankaverage');
    }
}

export function formatSpeed(speed){
    return (speed / 1000000).toFixed(1);
}

export function formatTrend(trend){
    const s = (trend * 100).toFixed(0);
    if (Math.abs(s) === 0) return "0%";
    return s + "%";
}

export function bestIspLocation(internetInfo) {
    let location = '';

    if (internetInfo && internetInfo.isp && internetInfo.isp.country_name) {
        const isp = internetInfo.isp;
        if (isp.country_city) {
            location = isp.country_city + ", " + isp.country_name;
        } else {
            location = isp.country_name;
        }
    }

    return location;
}
export function getLocationFromDiscovery(discovery){
    let location = '';

    if (discovery.network && discovery.network.customLocation) {
        location = discovery.network.customLocation;
    } else if (discovery.internetinfo && discovery.internetinfo.isp &&
        discovery.internetinfo.isp.country_name) {
        const isp = discovery.internetinfo.isp;
        if (isp.country_city) {
            location = isp.country_city + ", " + isp.country_name;
        } else {
            location = isp.country_name;
        }
    }

    return location;
}


export function rankStringWithLocation(score, location) {
    let SCORE_ROUND_FACTOR = 5.0;
    if (score && score >= 55.0) {
        return intl.get('isp_rank_summary_ranktop_location', {rank: roundPercentile((100.0 - score), SCORE_ROUND_FACTOR), location: location});
    } else if (score && score <= 45.0) {
        return intl.get('isp_rank_summary_rankbottom_location', {rank: roundPercentile(score, SCORE_ROUND_FACTOR), location: location});
    } else {
        return intl.get('isp_rank_summary_rankaverage_location', {location: location});
    }
}

export function getIPLocalAddress(discovery, networkInterfaces) {
    if (!discovery || !discovery.nicinfo) {
        return "";
    }

    // If the field is there, just use that
    if (discovery.nicinfo.address) {
        return discovery.nicinfo.address;
    }

    const macAddress = discovery.nicinfo.hardwareaddress;

    if (!macAddress) {
        return "";
    }

    // Check into getNetworkInfo results, but only if the interface is really the same (i.e. has the same MAC address)
    if (networkInterfaces && networkInterfaces.nicinfos) {
        const nif = networkInterfaces.nicinfos.find(net => net.gatewayAddress && net.hardwareaddress === macAddress);

        if (nif) {
            return nif.address;
        }
    }

    // Otherwise, scan all discovery nodes in search of the right one, as a last resort
    if (!discovery.nodes) {
        return "";
    }

    for (let node of discovery.nodes) {
        if (node.mac_address === macAddress) {
            return node.address_list[0] || "";
        }
    }

    return "";
}

