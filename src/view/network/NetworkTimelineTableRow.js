import React, {Component} from "react";
import intl from "react-intl-universal";
import PropTypes from 'prop-types';
import {DATE_FORMAT_LONG, DATE_FORMAT_SHORT, DATE_FORMAT_SMART, formatAbsoluteDate, formatDuration, formatRelativeDate} from '../../helpers/DateHelper';
import DeviceTypeIcon from "../../component/icons/DeviceTypeIcon";
import {bestMakeAndModelAsArray} from "../../helpers/RecogHelper";
import ActionButton, {
    BTN_TINT_PRIMARY,
    BTN_TYPE_SOFT
} from "../../component/ActionButton";
import {DT_GENERIC, EVT_DEVICE_BLOCK, EVT_DEVICE_CHANGE, NS_DOWN, NS_NEW, NS_NEW_BLOCKED, NS_UP} from "../../model/Constants";

export default class NetworkTimelineTableRow extends Component {

    constructor(props) {
        super(props);
        this.onDrillDown = this.onDrillDown.bind(this);
        this.onInspect = this.onInspect.bind(this);
    }

    onInspect(device) {
        if (this.props.onInspect) {
            this.props.onInspect(device)
        }
    }

    onDrillDown(device) {
        if (this.props.onDrillDown) {
            this.props.onDrillDown(device)
        }
    }

    render() {
        const {netEvent} = this.props;
        if (!netEvent)
            return '';
        return (
            <tr>
                {this.renderState(netEvent)}
                {this.renderTimeCell(netEvent)}
                {this.renderSubjectCell(netEvent)}
                {this.renderDetailCell(netEvent)}
                {this.renderActions(netEvent.device)}
            </tr>
        );
    }

    renderState(netEvent) {
        let badgeClasses = "badge-secondary text-secondary";

        if(netEvent.eventType === EVT_DEVICE_BLOCK){
            if(netEvent.isBlockedEvent()){
                badgeClasses = "badge-danger text-danger";
            } else if(netEvent.isPausedEvent()){
                badgeClasses = "badge-orange text-orange";
            }
        } else {
            const stateChange = netEvent.content && netEvent.content.state || null;
            const isNew = stateChange === NS_NEW;
            const isOnline = stateChange === NS_UP;
            const isNewBlocked = stateChange === NS_NEW_BLOCKED;
            
            if(isNew){
                badgeClasses = "badge-primary text-primary";
            } else if(isOnline){
                badgeClasses = "badge-success text-success";
            } 
        }
        
        
        return (
            <td data-title={this.headerForColumn(0)}>
                <div className="mt-1 mr-1" style={{width: "1.5em"}}>
                    <span className={`badge badge-sm badge-pill py-2 px-2 ${badgeClasses}`} style={{fontSize: "60%"}}> </span>
                    <div style={{"minHeight": "24px", "marginLeft": "7px"}}
                        className="border border-top-0 border-bottom-0 border-right-0"/>
                </div>
            </td>
            
        )
    }

    renderTimeCell(netEvent) {
        let timestamp = netEvent.timestamp;
        if(netEvent){
            const stateChange = netEvent.content && netEvent.content.state || null;
            if(stateChange === NS_DOWN){
                timestamp = netEvent.sharpTime;
            } 
        }
        const longDate = formatAbsoluteDate(timestamp, DATE_FORMAT_LONG);
        const smartDate = formatRelativeDate(timestamp, DATE_FORMAT_SMART);
        return (
            <td data-title={this.headerForColumn(1)}>
                {timestamp &&
                <>
                    <h5 className="mb-0">{longDate}</h5>
                    <p className="mb-0 small text-secondary">{smartDate}</p>
                </>}
            </td>
            
        )
    }
    renderSubjectCell(netEvent) {
        let device = {
            mac_address: "",
            best_type: "",
            best_model: "",
            best_make: "",
            best_name: ""
        }
        if(netEvent.eventType === EVT_DEVICE_BLOCK) {
            if(netEvent && netEvent.device){
                const blockedDevice = netEvent.device;
                if(blockedDevice.address){
                    device.mac_address = blockedDevice.address;
                }
                if(blockedDevice.type){
                    device.best_type = blockedDevice.type;
                }
                if(blockedDevice.model){
                    device.best_model = blockedDevice.model;
                }
                if(blockedDevice.make){
                    device.best_make = blockedDevice.make;
                }
                if(blockedDevice.name){
                    device.best_name = blockedDevice.name;
                }
            }
            
        } else {
            device = netEvent.device;
        }
        const deviceMakeAndModel = bestMakeAndModelAsArray(device);
        if (deviceMakeAndModel && deviceMakeAndModel.length === 0) {
            
            let model;
            if(device.ipAddresses && device.ipAddresses.length > 0){
                model = device.ipAddresses[0];
            } else if(device.address_list && device.address_list.length > 0){
                model = device.address_list[0];
            } else{
                model = device.hwAddress || device.mac_address || intl.get("devicetype_generic");
            }
            return (
                <td data-title={this.headerForColumn(2)}>
                    <div className="d-flex align-items-center">
                        <DeviceTypeIcon type={device.bestType || device.best_type || DT_GENERIC}/>
                        <span className="mx-2">{model}</span>
                    </div>
                </td>
                
            )
        }
        return (
            <td data-title={this.headerForColumn(2)}>
                <div className="d-flex align-items-center">
                    <DeviceTypeIcon type={device.bestType || device.best_type || DT_GENERIC}/>
                    <div className="d-inline-block">
                        <span className="mx-2">{device.bestName ? device.bestName : device.best_name ? device.best_name : intl.get("devicetype_generic")}</span>
                        <div>
                            {
                                deviceMakeAndModel && deviceMakeAndModel.length >= 2 &&
                                <span className="small text-secondary ml-2">{deviceMakeAndModel[0]} • {deviceMakeAndModel[1]}</span>
                            }
                            {
                                deviceMakeAndModel && deviceMakeAndModel.length === 1 &&
                                <span className="small text-secondary ml-2">{deviceMakeAndModel[0]}</span>
                            }
                        </div>
                        
                    </div>
                    
                </div>
            </td>
            
        )
    }

    headerForColumn(idx) {
        if (idx === 0) return intl.get("timeline_table_header_state");
        if (idx === 1) return intl.get("timeline_table_header_when");
        if (idx === 2) return intl.get("timeline_table_header_subject");
        if (idx === 3) return intl.get("timeline_table_header_details");
        if (idx === 4) return intl.get("generic_actions");
        return '';
    }


    renderDetailCell(netEvent) {
        let stateString = "";

        if (netEvent) {
            if (netEvent.eventType === EVT_DEVICE_BLOCK) {
                const type = netEvent.content && netEvent.content.type || null;
                if(type === NS_NEW_BLOCKED){
                    stateString = intl.get("discovery_events_timeline_new_blocked");
                } else {
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
                }
                
            } else if (netEvent.eventType === EVT_DEVICE_CHANGE) {
                if(netEvent.isDeviceNew()){
                    stateString = intl.get('discovery_events_timeline_new');                    
                } else {
                    const duration = formatDuration(netEvent.getTimeSinceOppositeState(), DATE_FORMAT_SHORT, false);
                    const state = netEvent.isDeviceOnline() ? 'online' : 'offline';
                    if(duration === '0m'){
                        stateString = intl.get('discovery_events_timeline_'+state+'_duration_immediately');                    
                    } else {
                        stateString = intl.get('discovery_events_timeline_'+state+'_duration',{duration:duration});                    
                    }
                }
                
            }  
            
        }
        
        return <td data-title={this.headerForColumn(3)}>
            <p className="text-dark">{stateString}</p>
        </td>
    }

    renderActions(netNode) {
        if (!netNode)
            return '';
        return (
            <td className="text-md-right" data-title={this.headerForColumn(4)}>
                <div className="d-inline-block" style={{whiteSpace: 'nowrap'}}>
                {
                    this.props.onInspect &&
                    <ActionButton action={()=>this.onInspect(netNode)}
                                  chevron={"fa-pen"}
                                  type={BTN_TYPE_SOFT}
                                  tint={BTN_TINT_PRIMARY}
                                  rounded={true}
                                  className="mr-2"
                                  title={intl.get("generic_drill_down")}
                                  titleClass="d-md-none" />
                }
                {
                    this.props.onDrillDown &&
                    <ActionButton action={()=>this.onDrillDown(netNode)}
                                  chevron={"fa-level-down-alt"}
                                  type={BTN_TYPE_SOFT}
                                  tint={BTN_TINT_PRIMARY}
                                  rounded={true}
                                  className="mr-2"
                                  title={intl.get("generic_inspect")}
                                  titleClass="d-md-none" />
                }
                </div>
                
            </td>
            
        )
    }

}

NetworkTimelineTableRow.propTypes = {
    netEvent: PropTypes.object,
    onInspect: PropTypes.func,
    onDrillDown: PropTypes.func,
};