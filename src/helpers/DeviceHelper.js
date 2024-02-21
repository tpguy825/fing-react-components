import intl from 'react-intl-universal';

import deviceTypes from '../assets/json/device_types.json';
const _getByteSize = () => 4;

export function getDeviceTypeCaption(deviceType) {
    if (!deviceType) return null;
    const devType = deviceTypes[deviceType];
    if (!devType) return deviceType.charAt(0) + deviceType.toLowerCase().slice(1);
    return devType.caption;
}

function getIpAddress(node) {
    let ipaddr = node.address_list && node.address_list.length ? node.address_list[0] : null;
    if (ipaddr === "0.0.0.0") ipaddr = intl.get('generic_not_in_network');
    return ipaddr;
}


function ipAddressParse(input) {
    const arrayParts = input.split(".");
    if (arrayParts.length !== 4) return null;
    const arrayByteAddress = [];
    for (let i=0; i<4; ++i) {
        try {
            arrayByteAddress[i] = (parseInt(arrayParts[i],10)&0xFF);
        } catch (err) {
            return null;
        }
    }
    return arrayByteAddress;
}

function toSplittedStringPrefix(address, netPrefixLength) {
    if (!address) return ""
    const showPrefixBytes = parseInt(netPrefixLength / 8,10);
    let res = "";
    for (let i = 0; i < showPrefixBytes && i < address.length; ++i) {
        let stonk = (parseInt(address[i],10) & 0xFF)
        res += stonk
        if (i < (_getByteSize() - 1)) res += '.';
    }
    return res.toString();
}

function toSplittedStringSuffix(address, netPrefixLength) {
    if (!address) return ""
    const skipPefixBytes = parseInt(netPrefixLength / 8,10);
    let res = "";
    for (let i = 0; i < _getByteSize(); ++i) {
        if (i < skipPefixBytes) continue;
        res += (parseInt(address[i],10) & 0xFF)
        if (i < (_getByteSize() - 1)) res += '.';
    }
    return res.toString();
}


export default {
    getIpAddress,
    ipAddressParse,
    toSplittedStringPrefix,
    toSplittedStringSuffix
}
 