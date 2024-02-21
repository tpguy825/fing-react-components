/**
 * Created by marco on 2/6/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {ReactComponent as Export} from "../../assets/svg/generic/export.svg";
import {ReactComponent as Ping} from "../../assets/svg/tools/ping.svg";
import {ReactComponent as Traceroute} from "../../assets/svg/tools/traceroute.svg";
import {ReactComponent as WifiScanner} from "../../assets/svg/tools/wifi_scan.svg";
import {ReactComponent as DNSLookup} from "../../assets/svg/tools/globe.svg";
import {ReactComponent as MacLookup} from "../../assets/svg/tools/search.svg";
import {ReactComponent as DHCPDiscovery} from "../../assets/svg/tools/dhcp_discovery.svg";
import {ReactComponent as DNSBenchmark} from "../../assets/svg/tools/dns_benchmark.svg";
import {ReactComponent as OpenPorts} from "../../assets/svg/tools/lock.svg";
import {ReactComponent as RouterVulnerability} from "../../assets/svg/tools/security.svg";
import {ReactComponent as HiddenCamera} from "../../assets/svg/tools/hidden_camera.svg";
import {ReactComponent as SpeedTest} from "../../assets/svg/tools/speed.svg";
import {ReactComponent as OutageDetection} from "../../assets/svg/tools/bolt.svg";
import {ReactComponent as IspComparison} from "../../assets/svg/tools/star.svg";
import {ReactComponent as WakeOnLan} from "../../assets/svg/tools/wake_on_lan.svg";
import {ReactComponent as Pause} from "../../assets/svg/tools/pause.svg";
import {ReactComponent as Block} from "../../assets/svg/tools/hand.svg";
import {ReactComponent as Confirmed} from "../../assets/svg/tools/confirmed.svg";

import {
    TOOL_CONFIRMED,
    TOOL_PING,
    TOOL_BLOCK,
    TOOL_TRACEROUTE,
    TOOL_WAKE_ON_LAN,
    TOOL_WIFI_SCANNER,
    TOOL_DNS_LOOKUP,
    TOOL_MAC_LOOKUP,
    TOOL_DHCP_DISCOVERY,
    TOOL_DNS_BENCHMARK,
    TOOL_FIND_OPEN_PORTS,
    TOOL_ROUTER_VULNERABILITY_CHECK,
    TOOL_FIND_HIDDEN_CAMERAS,
    TOOL_SPEED_TEST,
    TOOL_OUTAGE_DETECTOR,
    TOOL_ISP_COMPARISON,
    TOOL_ALL_TYPES,
    TINT_DARK,
    TINT_DANGER,
    TINT_NAVY,
    TINT_PRIMARY,
    TINT_SUCCESS,
    TINT_WARNING,
    TINT_WHITE,
    TOOL_PAUSE,
    TOOL_EXPORT
} from '../../model/Constants';

export default class ToolIcon extends Component {

    render() {
        const {type, size, color} = this.props;

        if (!TOOL_ALL_TYPES.includes(type))
            return "";
            
        const currentTint = this.tintToClass(color);
        const className = this.props.className || '';
        const iconSize = size;
        return <figure className={`svg-icon ${currentTint} ${className}`}>{this.renderIcon(type, iconSize)}</figure>;
    }
    tintToClass(tint){
        if (!tint) return "fill-primary";
        switch (tint) {
            case TINT_WHITE: return "fill-white";
            case TINT_DARK: return "fill-dark";
            case TINT_PRIMARY: return "fill-primary";
            case TINT_SUCCESS: return "fill-success";
            case TINT_WARNING: return "fill-warning";
            case TINT_DANGER: return "fill-danger";
            case TINT_NAVY: return "fill-navy";
            default: return "fill-primary";
        }
    }


    renderIcon(type, iconSize) {
        if (!type) return "";
        

        switch (type.toUpperCase()) {
            case TOOL_EXPORT:
                return <Export width={iconSize} height={iconSize} />;
            case TOOL_CONFIRMED:
                return <Confirmed width={iconSize} height={iconSize} />;
            case TOOL_BLOCK:
                return <Block width={iconSize} height={iconSize} />; 
            case TOOL_PAUSE:
                return <Pause width={iconSize} height={iconSize} />; 
            case TOOL_PING:
                return <Ping width={iconSize} height={iconSize} />; 
            case TOOL_TRACEROUTE:
                return <Traceroute width={iconSize} height={iconSize} />; 
            case TOOL_WIFI_SCANNER:
                return <WifiScanner width={iconSize} height={iconSize} />; 
            case TOOL_DNS_LOOKUP:
                return <DNSLookup width={iconSize} height={iconSize} />; 
            case TOOL_MAC_LOOKUP:
                return <MacLookup width={iconSize} height={iconSize} />; 
            case TOOL_DHCP_DISCOVERY:
                return <DHCPDiscovery width={iconSize} height={iconSize} />; 
            case TOOL_DNS_BENCHMARK:
                return <DNSBenchmark width={iconSize} height={iconSize} />; 
            case TOOL_FIND_OPEN_PORTS:
                return <OpenPorts width={iconSize} height={iconSize} />; 
            case TOOL_ROUTER_VULNERABILITY_CHECK:
                return <RouterVulnerability width={iconSize} height={iconSize} />; 
            case TOOL_FIND_HIDDEN_CAMERAS:
                return <HiddenCamera width={iconSize} height={iconSize} />; 
            case TOOL_ISP_COMPARISON:
                return <IspComparison width={iconSize} height={iconSize} />; 
            case TOOL_OUTAGE_DETECTOR:
                return <OutageDetection width={iconSize} height={iconSize} />; 
            case TOOL_SPEED_TEST:
                return <SpeedTest width={iconSize} height={iconSize} />; 
            case TOOL_WAKE_ON_LAN:
                return <WakeOnLan width={iconSize} height={iconSize} />; 
            default:
                return "";
        }
    }

}
ToolIcon.propTypes = {
    size: PropTypes.any,
    type: PropTypes.oneOf([TOOL_EXPORT,TOOL_CONFIRMED,TOOL_BLOCK,TOOL_PAUSE,TOOL_PING,TOOL_WAKE_ON_LAN,TOOL_TRACEROUTE,TOOL_WIFI_SCANNER,TOOL_DNS_LOOKUP,TOOL_MAC_LOOKUP,TOOL_DHCP_DISCOVERY,TOOL_DNS_BENCHMARK,TOOL_FIND_OPEN_PORTS,TOOL_ROUTER_VULNERABILITY_CHECK,TOOL_FIND_HIDDEN_CAMERAS,TOOL_SPEED_TEST,TOOL_OUTAGE_DETECTOR,TOOL_ISP_COMPARISON]),
    color: PropTypes.oneOf([TINT_DARK,TINT_WHITE,TINT_DANGER,TINT_NAVY,TINT_PRIMARY,TINT_SUCCESS,TINT_WARNING]),
};