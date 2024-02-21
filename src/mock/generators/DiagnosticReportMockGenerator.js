import {
    HC_IMAGE_TYPE_DEVICE_ICON,
    HC_IMAGE_TYPE_FONTAWESOME,
    HC_IMAGE_TYPE_NETWORK_ICON,
    HC_SEGMENT_LOCAL,
    HC_STATE_FAIL,
    HC_STATE_INFO,
    HC_STATE_OK,
    HC_STATE_SKIP,
    HC_STATE_WARN
} from "../../view/diagnostic/DiagnosticLogic";

import intl from "react-intl-universal";
import {DT_LAPTOP, DT_MOBILE, DT_ROUTER} from "../../model/Constants";

export function createMockItem(index) {
    const statusCode = Math.floor((Math.random() * 5));
    let status;
    let segmentImage;
    let segmentText;

    switch (statusCode) {
        case 0:
            status = HC_STATE_OK;
            segmentImage = { type: HC_IMAGE_TYPE_DEVICE_ICON, ref: DT_LAPTOP };
            segmentText = intl.get('discovery_network_netinfo_gateway');
            break;
        case 1:
            status = HC_STATE_INFO;
            segmentImage = { type: HC_IMAGE_TYPE_NETWORK_ICON, ref: DT_ROUTER };
            segmentText = intl.get('generic_you').toLowerCase();
            break;
        case 2:
            status = HC_STATE_SKIP;
            segmentImage = { type: HC_IMAGE_TYPE_DEVICE_ICON, ref: DT_MOBILE };
            segmentText = intl.get('generic_you').toLowerCase();
            break;
        case 3:
            status = HC_STATE_WARN;
            segmentImage = { type: HC_SEGMENT_LOCAL, ref: DT_LAPTOP };
            segmentText = intl.get('generic_link');

            break;
        case 4:
            status = HC_STATE_FAIL;
            segmentImage = { type: HC_IMAGE_TYPE_FONTAWESOME, ref: "fa-server" };
            segmentText = intl.get('healthcheck_report_geoloc_location');
            break;
        default: status = null; break;
    }

    const titles = [
        "Apple • MacBook Pro 15\" (Mid 2015) • macOS Big Sur",
        "Device is in network: has a valid IP address",
        "Device is in network: successfully got an IP address from DHCP",
        "Computer clock is synchronized",
        "DNS server is configured",
        "Wi-Fi strength is good or acceptable"
    ];

    const subtitles = [
        "Your device, C02RM4U7G8WP (F4:5C:89:C9:E7:D1)",
        "Current IP is 192.168.1.184",
        "DHCP 192.168.1.254 assigned to network 192.168.1.184/24",
        "Computer local time is synchronized",
        "DNS Servers 8.8.8.8 1.1.1.1",
        "Wi-Fi signal is good: 80%",
    ];

    const codes = [
        "WIFI",
        "BOX_MOBILE_WIFI",
        "001",
        "002",
        "003",
        "004",
        "005",
        "006",
        "007",
        "008",
        "009",
        "00A",
        "401",
        "402",
        "403",
        "404",
        "405",
        "406",
        "407",
        "408",
        "409",
        "40A",
        "40B",
        "40E",
        "40F",
        "410",
        "411",
        "415",
        "416",
        "417",
        "418",
        "801",
        "802",
        "804",
        "805",
        "806",
        "807",
        "808",
        "809",
        "80B",
        "80C",
        "80D",
        "80F",
        "810"
    ];

    const title = titles[Math.floor((Math.random() * titles.length))];
    const subtitle = titles[Math.floor((Math.random() * subtitles.length))];
    const canEdit = index === 10; // Randomly make some items editable
    const code = codes[Math.floor((Math.random() * codes.length))];
    const item = {
        itemId: index,
        code: code,
        status: status,
        itemTitle: title,
        itemSubtitle: subtitle,
        segmentImage,
        segmentText,
        editable: canEdit,
        mutable: status === HC_STATE_WARN && code !== "402"
    };

    return item;
}

