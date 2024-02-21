/**
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import intl from 'react-intl-universal';
import DeviceTypeIcon from "../../component/icons/DeviceTypeIcon";
import ContactAvatar, {AVT_SIZE_MINI} from "./ContactAvatar";
import {
    DATE_FORMAT_LONG,
    DATE_FORMAT_SHORT,
    DATE_FORMAT_SMART,
    formatAbsoluteDate,
    formatDuration,
    formatRelativeDate
} from "../../helpers/DateHelper";
import ActionButton, {BTN_TINT_PRIMARY, BTN_TYPE_SOFT} from "../../component/ActionButton";
import {getContactTypeName} from "../../helpers/ContactTypeHelper";
import {DT_GENERIC, EVT_DEVICE_BLOCK, EVT_DEVICE_CHANGE, TINT_SECONDARY, TINT_SUCCESS} from "../../model/Constants";
import PropTypes from "prop-types";
import NetEvent from '../../model/NetEvent';

export default class PresenceTimelineTableRow extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {netEvent} = this.props;
        if (!netEvent) return;
        const blockEvent = netEvent && netEvent.eventType === EVT_DEVICE_BLOCK;
        const changeEvent = netEvent && netEvent.eventType === EVT_DEVICE_CHANGE;
        return (
            <tr>
                {changeEvent ? this.renderContactEvent(netEvent) : 
                    blockEvent ? this.renderDeviceEvent(netEvent) : ''}
            </tr>
        )
        
    }

    /**
     * @param {NetEvent} netEvent The network event
     * @return {JSX.Element}
     */
    renderContactEvent(netEvent) {
        const contact = netEvent.contact;
        const timestamp = netEvent.sharpTime ? netEvent.sharpTime : netEvent.timestamp;
        return (
            <>
                {this.renderContactColumn(contact, netEvent)}
                {this.renderTimeCell(timestamp)}
                {this.renderSubjectCell(contact.contactName, getContactTypeName(contact.contactType))}
                {this.renderDetailCell(netEvent)}
                {this.renderActionCell(netEvent.onInspect)}
            </>
        )
    }

    renderContactColumn(contact, netEvent) {
        let status = "avatar-secondary";
        if(netEvent && netEvent.eventType === EVT_DEVICE_BLOCK && 
            (netEvent.isBlockedEvent() || netEvent.isPausedEvent())){
            status = "avatar-danger";
        } else if(netEvent && netEvent.eventType === EVT_DEVICE_CHANGE && netEvent.isDeviceOnline()){
            status = "avatar-success";
        } 

        return <td data-title={this.headerForColumn(0)}>
            <div className="step mx-0">
                <div className="step-avatar step-avatar-xs">
                    <ContactAvatar size={AVT_SIZE_MINI} contact={contact} status={status}/>
                </div>
            </div>
        </td>;
    }

    /**
     * @param {NetEvent} netEvent The network event
     * @return {JSX.Element}
     */
    renderDeviceEvent(netEvent) {
        const netNode = netEvent.netNode;
        const deviceType = netNode.bestType || DT_GENERIC;
        return (
            <>
                {this.renderDeviceColumn(netEvent, deviceType)}
                {this.renderTimeCell(netEvent.timestamp)}
                {this.renderSubjectCell(netNode.bestName || netNode.address, intl.get(`devicetype_${deviceType.toLowerCase()}`))}
                {this.renderDetailCell(netEvent)}
                {this.renderActionCell(netEvent.onInspect)}
            </>
        );
    }

    renderDeviceColumn(netEvent, deviceType) {
        let stepIconClass = "step-icon-soft-secondary";
        let fillClass = "fill-dark";

        if (netEvent.isBlockedEvent() || netEvent.isPausedEvent()) {
            stepIconClass = netEvent.isPausedEvent() ? "badge-orange" : "step-icon-danger";
            fillClass = "fill-white";
        } 

        return <td data-title={this.headerForColumn(0)}>
            <div className="step mx-0">
                <span className={`step-icon step-icon-xs ${stepIconClass}`}>
                    <DeviceTypeIcon type={deviceType} size="16px" className={fillClass}/>
                </span>
            </div>
        </td>;
    }

    /**
     * @param {number} timestamp
     * @return {JSX.Element}
     */
    renderTimeCell(timestamp) {
        return (
            <td data-title={this.headerForColumn(1)}>
                {timestamp &&
                <>
                    <h4 className="mb-0">{formatAbsoluteDate(timestamp, DATE_FORMAT_LONG)}</h4>
                    <div className="small text-secondary">{formatRelativeDate(timestamp, DATE_FORMAT_SMART)}</div>
                </>}
            </td>
        );
    }

    /**
     * @param {string} title
     * @param {string} subtitle
     * @return {JSX.Element}
     */
    renderSubjectCell(title, subtitle) {
        return (
            <td data-title={this.headerForColumn(2)}>
                {title && <p className="mb-0 text-dark">{title}</p>}
                {subtitle && <div className="small text-secondary">{subtitle}</div>}
            </td>
        );
    }

    /**
     * @param {string} detail
     * @return {JSX.Element}
     */
    renderDetailCell(netEvent) {
        let stateString = "";

        if (netEvent) {
            if (netEvent.eventType === EVT_DEVICE_BLOCK) {
                const isBlocked = netEvent.isBlockedEvent();

                if (netEvent.getTypeEvent() === 'Block') {
                    stateString = intl.get(isBlocked ? 'device_detail_kick_out_mode_blocked' : 'device_detail_kick_out_mode_paused');
                } else if (netEvent.getTypeEvent() === 'Unlock') {
                    const duration = formatDuration(netEvent.getDurationKickOutModeEvent(), DATE_FORMAT_SHORT, false);

                    if (duration !== "0m") {
                        stateString = intl.get(
                            isBlocked ? 'device_detail_kick_out_mode_blocked_for' : 'device_detail_kick_out_mode_paused_for',
                            { duration: duration }
                        );
                    } else {
                        stateString = intl.get(
                            isBlocked ? 'device_detail_kick_out_mode_unblocked_immediately' : 'device_detail_kick_out_mode_resumed_immediately'
                        );
                    }
                }
            } else if (netEvent.eventType === EVT_DEVICE_CHANGE) {
                const duration = formatDuration(netEvent.getTimeSinceOppositeState(), DATE_FORMAT_SHORT, false);
                const state = netEvent.isDeviceOnline() || netEvent.isDeviceNew() ? 'online' : 'offline';
                if (duration === '0m') {
                    stateString = intl.get('discovery_events_timeline_'+state+'_duration_immediately');                    
                } else {
                    stateString = intl.get('discovery_events_timeline_'+state+'_duration',{duration:duration});                    
                }
            }  
        }
        
        return <td data-title={this.headerForColumn(3)}>
            <p className="text-dark mb-0">{stateString}</p>
        </td>
    }

    renderActionCell(onInspect) {
        return <td className="text-md-right" data-title={this.headerForColumn(4)}>
            {onInspect &&
                <ActionButton action={onInspect}
                              chevron={"fa-pen"}
                              type={BTN_TYPE_SOFT}
                              tint={BTN_TINT_PRIMARY}
                              rounded={true}
                              className="mr-2"
                              title={intl.get("generic_inspect")}
                              titleClass="d-md-none" />
            }
        </td>
    }


    labelForOppositeState(duration, online) {
        if (duration <= 0) return null;

        // Labels inverted because it's about the PREVIOUS state
        return intl.get("status_for_duration", {
            status: intl.get(online ? "generic_offline" : "generic_online"),
            duration: formatDuration(duration, DATE_FORMAT_SHORT, true)
        });
    }

    headerForColumn(idx) {
        if (idx === 0) return intl.get("timeline_table_header_state");
        if (idx === 1) return intl.get("timeline_table_header_when");
        if (idx === 2) return intl.get("timeline_table_header_subject");
        if (idx === 3) return intl.get("timeline_table_header_details");
        if (idx === 4) return intl.get("generic_actions");
        return '';
    }

}

PresenceTimelineTableRow.propTypes = {
    netEvent: PropTypes.object
}