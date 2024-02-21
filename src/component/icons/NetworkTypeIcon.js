/**
 * Created by marco on 2/6/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';

import {ReactComponent as Wifi} from "../../assets/svg/network/nettype_wifi_24.svg";
import {ReactComponent as Ip} from "../../assets/svg/network/nettype_ip_24.svg";
import {ReactComponent as Eth} from "../../assets/svg/network/nettype_eth_24.svg";
import {ReactComponent as EthUsb} from "../../assets/svg/network/nettype_eth_usb_24.svg";
import {ReactComponent as EthWifi} from "../../assets/svg/network/nettype_eth_wifi_24.svg";
import {ReactComponent as FingboxV1} from "../../assets/svg/network/nettype_fingbox_v1_24.svg";
import {ReactComponent as FingboxV2} from "../../assets/svg/network/nettype_fingbox_v2_24.svg";
import {
    NT_ALL_TYPES,
    NT_ETH_USB,
    NT_ETH_WIFI,
    NT_ETHERNET,
    NT_FINGBOX_V1,
    NT_FINGBOX_V2,
    NT_IP,
    NT_WIFI
} from "../../model/Constants";

const defaultIconSize = "24px";

/**
 */
export default class NetworkTypeIcon extends Component {

    render() {
        const { type, size } = this.props;

        if (!NT_ALL_TYPES.includes(type))
            return "";

        const className = this.props.className || '';
        const iconSize = size || defaultIconSize;
        return <figure className={`svg-icon ${className}`}>{this.renderIcon(type, iconSize)}</figure>;
    }

    renderIcon(type, iconSize) {
        if (!type) return "";

        switch (type.toUpperCase()) {
            case NT_WIFI:
                return <Wifi width={iconSize} height={iconSize} />;
            case NT_ETHERNET:
                return <Eth width={iconSize} height={iconSize} />;
            case NT_ETH_USB:
                return <EthUsb width={iconSize} height={iconSize} />;
            case NT_ETH_WIFI:
                return <EthWifi width={iconSize} height={iconSize} />;
            case NT_FINGBOX_V1:
                return <FingboxV1 width={iconSize} height={iconSize} />;
            case NT_FINGBOX_V2:
                return <FingboxV2 width={iconSize} height={iconSize} />;
            case NT_IP:
                return <Ip width={iconSize} height={iconSize} />;
            default:
                return "";
        }
    }

}