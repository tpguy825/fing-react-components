import React, {Component} from 'react';

import intl from 'react-intl-universal';

import DiscoveryStateData from './data/DataDiscoveryState.json';
import NavigationBar from '../component/NavigationBar';
import MockSidebar from './MockSidebar';
import ActionButton, { BTN_TINT_DARK, BTN_TYPE_GHOST } from '../component/ActionButton';
import NetNode from '../model/NetNode';
import NetworkTimeline from '../view/network/NetworkTimeline';
import NetEvent from '../model/NetEvent';
import { capitalize, compare } from '../helpers/CommonHelper';
import {NS_NEW} from "../model/Constants";
import { aggregateAvailability, aggregateNetworkAvailability, getDeviceAvailability, getNetworkAvailability } from '../view/security/SecurityUtils';
import { getDayName } from '../helpers/DateHelper';
import NetEventsHeatmap from '../view/network/NetEventsHeatmap';

const isFree = false; // TOSET: true or false
const maxDaysIfNotFree = undefined; // maxDays === a number, or undefined for no limits

export default class MockNetworkTimelinePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            discovery: null,
            engine_state: null,
            progress: 0,

            device: null,
            deviceMacAddress: null
        };
    }

    convertLogsFromDiscovery(discovery, firstSeenOnly) {
        if (discovery.nodes) {
            return discovery.nodes
                .map(node => new NetNode().applyFromAgentData(node))
                .flatMap(netNode => this.convertLogsFromNode(netNode, firstSeenOnly));
        }
        return [];
    }

    convertLogsFromNode(netNode, firstSeenOnly) {
        let logs = [];
        if (firstSeenOnly && netNode.firstSeenTime > 0) {
            const synthesizedEvent = new NetEvent().applyFromDiscoveryStateLogAgentData({
                time: netNode.firstSeenTime,
                sharptime: netNode.firstSeenTime,
                state: {change: NS_NEW},
            }, netNode);
            return [synthesizedEvent];
        } else if (netNode.logs) {
            logs = netNode.logs.map(val => new NetEvent().applyFromDiscoveryStateLogAgentData(val, netNode));
        }
        return logs;
    }

    getNetEvents(device, discovery, isFirstSeenOnly){
        let totalLogs;

        if (device) {
            totalLogs = this.convertLogsFromNode(device);
        } else if (discovery) {
            totalLogs = this.convertLogsFromDiscovery(discovery, isFirstSeenOnly);
        } else {
            totalLogs = [];
        }
        return totalLogs.sort((a, b) => compare(b, a, "sharpTime"));
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);

        const deviceMacAddress = query.get("macAddress");
        // SIMULATE FETCH
        const discovery = DiscoveryStateData.discovery;
        this.setState({
            discovery: discovery.discovery,
            engine_state: DiscoveryStateData.engine_state,
            progress: DiscoveryStateData.progress ? Number(DiscoveryStateData.progress) : 0,
            device: this.findDevice(discovery.discovery, deviceMacAddress),
            deviceMacAddress: deviceMacAddress,
        });
    }

    findDevice(discovery, macAddress){
        let devices = discovery.nodes.map(node => new NetNode().applyFromAgentData(node));
        if (devices && macAddress) {
            for (const device of devices) {
                if (device.hwAddress === macAddress) {
                    return device;
                }
            }
        }
        return null;
    }

    setSingleDayValues(singleDay, singleSlot){
        let diff = singleSlot[3].getHours() - singleSlot[2].getHours()
        
        if(diff < 0) diff = 24 - diff
        if(diff === 0) {
            for(let i = 0; i < singleDay.length; ++i){
                singleDay[i] = 1
            }
        }
        else if(diff === 1){
            singleDay[singleSlot[3].getHours()] = singleSlot[0]
        } else if(diff > 1 ){
            const firstHour = singleSlot[2].getHours();
            singleDay[firstHour] = singleSlot[0]
            for(let j = 0; j <= diff; j++){
                singleDay[firstHour + j] = singleSlot[0]
            }
        } 
        return singleDay
    }

    getHeatmapsValues(device, discovery){
        let weekHeatmaps = [];
        const currentLocale = intl.getInitOptions() && intl.getInitOptions().currentLocale || "en-US";
        const firstDiscTime = Math.max(Number(discovery.network.firstDiscoveryTime), Number(device.firstseentime));
        for (let i = 0; i < 7; ++i) {
            var curStart = new Date(new Date().getTime() - 86400000 * i);
            curStart.setHours(0, 0, 0, 0);
            if (i > 0 && curStart.getTime() < firstDiscTime) break;
            const avails = aggregateAvailability(getDeviceAvailability(device, curStart, 24, 60000 * 60));

            weekHeatmaps.push({
                avail: avails, 
                name: i == 0 ? intl.get('time_today') : i == 1 ? intl.get('time_yesterday') : capitalize(getDayName(curStart, currentLocale))
            });
            
        }
        const data = new Array(7)
        for(let i = 0; i < data.length; i++){
            let singleDay = new Array(24).fill(0)
                if(weekHeatmaps[i].avail.totalup > 0){
                    const singleArraySlotsOnline = weekHeatmaps[i].avail.slots.filter(slot => slot[4] > 0)
                    for(let slotsOnline of singleArraySlotsOnline){
                        this.setSingleDayValues(singleDay,slotsOnline)
                    }
                }
            data[i] = singleDay
        }
        return data;
    }

    isFirstSeenOnly() {
        const query = new URLSearchParams(this.props.location.search);
        return query.get("firstSeenOnly") !== "false";
    }

    render() {
        const { device, discovery } = this.state;

        const isFirstSeenOnly = this.isFirstSeenOnly();
        const netEvents = this.getNetEvents(device, discovery, isFirstSeenOnly);

        const backPressed = () => {
            if(this.state.deviceMacAddress){
                this.props.history.goBack();
                this.setState({
                    device: undefined,
                    deviceMacAddress: undefined
                })
            } else {
                this.props.history.goBack();
            }
            
        }
        const onInspect = (netEvent) => console.log(netEvent)
        const onDrillDown = (netEvent) => {
            this.props.history.push(this.props.location.pathname+'?macAddress='+netEvent.hwAddress);
            this.setState({
                deviceMacAddress: netEvent.hwAddress,
                device: this.findDevice(this.state.discovery.discovery, netEvent.hwAddress)
            })
        }
        return (
            <>
                <MockSidebar active="HOME" />
                <header id="header" className="header header-sticky-top bg-white container-fluid p-2 app-header">
                    <NavigationBar 
                        left={<ActionButton title="Security"
                            icon='fa-arrow-left'
                            action={backPressed}
                            type={BTN_TYPE_GHOST}
                            tint={BTN_TINT_DARK}
                            rounded={true}/>
                        } 
                        title={"Devices Timeline"}/>
                </header>
                <main className="app-main">
                    <div className="container-fluid space-2">
                        {!isFree && device && this.renderNetEventsHeatmap(device, discovery, isFirstSeenOnly)} 
                        {!device ? 
                            <NetworkTimeline
                                onInspect={netEvent => onInspect(netEvent)}
                                onDrillDown={netEvent => onDrillDown(netEvent)}
                                netEvents={netEvents}
                                maxDays={isFree ? 1 : maxDaysIfNotFree}
                            /> :
                            <NetworkTimeline
                                onInspect={netEvent => onInspect(netEvent)}
                                netEvents={netEvents}
                                todayOnly={isFree ? 1 : maxDaysIfNotFree}
                            />}
                    </div>
                </main>
            </> 
        )
    }

    renderNetEventsHeatmap(device, discovery, isFirstSeenOnly){

        if(!discovery) return '';
        if(!device && !isFirstSeenOnly) return '';
        const weekHeatmaps = this.getHeatmapsValues(device, discovery);
        
        return (
            <div>
                <div className="mb-3 border-bottom d-flex">
                    <h3>{intl.get('discovery_events_week_heatmap_header')}</h3>
                </div>
                <NetEventsHeatmap heatMapData={weekHeatmaps}/>
            </div>
        );
        
    }

}

