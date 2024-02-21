
import React, { Component } from 'react';
import intl from "react-intl-universal";
import ActionButton, {
    BTN_TINT_DARK,
    BTN_TINT_PRIMARY,
    BTN_TYPE_DEFAULT,
    BTN_TYPE_GHOST,
    BTN_TINT_SUCCESS
} from '../component/ActionButton';
import GoogleImg from '../assets/png/google.png';
import AlexaImg from '../assets/png/alexa.png';
import HomeAssistantImg from '../assets/png/assistant.png';
import HomeKitImg from '../assets/png/kit.png';
import OpenHabImg from '../assets/png/hab.png';

import NavigationBar from '../component/NavigationBar';
import MockSidebar from './MockSidebar';
import DetailSection from '../component/detail/DetailSection';
import ToolCardSmall from '../view/tools/ToolCardSmall';
import DeviceDetailTable from '../component/detail/DeviceDetailTable';
import {
    TOOL_PING,
    TOOL_TRACEROUTE,
    TOOL_FIND_OPEN_PORTS,
    TOOL_WAKE_ON_LAN,
    TOOL_PAUSE,
    TOOL_BLOCK,
    TOOL_CONFIRMED,
    DEFAULT_CDN
} from '../model/Constants';
import NotificationCard from '../view/devicedetail/NotificationCard';
import DeviceDetailHeader from '../view/devicedetail/DeviceDetailHeader';
import ClickToScrollBar from '../view/devicedetail/ClickToScrollBar';
import ContactCard from '../view/presence/ContactCard';
import DeviceDetailTableRow from '../component/detail/DeviceDetailTableRow';
import DetailHeader from '../component/detail/DetailHeader';
import DeviceDetailBanner from '../component/detail/DeviceDetailBanner';
import SolutionBadge from '../component/detail/SolutionBadge';
import LinkCard from '../view/tools/LinkCard';
import EditDeviceDialog from '../view/devicedetail/dialogs/EditDeviceDialog';
import { showDialogById, hideDialogById } from '../component/ModalDialog';
import ClearDeviceDialog from '../view/devicedetail/dialogs/ClearDeviceDialog';
import DataRecogCatalog from '../mock/data/DataRecogCatalog.json';
import DataNetNode from '../mock/data/DataNetNode.json';
import SegmentedBar from '../component/SegmentedBar';
import NetNode from '../model/NetNode';
import { formatRelativeDate, formatShortAbsoluteDate, formatSmartAbsoluteDate } from '../helpers/DateHelper';
import EmptyStateSection from '../view/devicedetail/EmptyStateSection';
import DeviceDetailIconPickerDialog from '../view/devicedetail/dialogs/DeviceDetailIconPickerDialog';

const EDIT_DEVICE_DIALOG_ID = "edit_device_dialog_id"
const CLEAR_DEVICE_DIALOG_ID = "clear_device_dialog_id"
const ICON_PICKER_DEVICE_DIALOG_ID = "icon_picker_device_dialog_id"

export default class MockDeviceDetailPage extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            device: DataNetNode,
            contactList: [],
            recogCatalog: DataRecogCatalog.recogCatalog
        }
    }

    scrollFromIndex(index){
        let scrollKey = "";
        switch (index) {
            case 0: scrollKey = "key_network"; break;
            case 1: scrollKey = "key_device"; break;
            case 2: scrollKey = "key_operating_system"; break;
            case 3: scrollKey = "key_protocols"; break;
            case 4: scrollKey = "key_owner"; break;
            case 5: scrollKey = "key_solutions"; break;

            default: scrollKey = "key_network"; break;
        }
        const section = document.getElementById(scrollKey);
        section.scrollIntoView( { behavior: 'smooth' } );
    }

    // --------------------------------------------------------------------------------
    // MAIN RENDER
    // --------------------------------------------------------------------------------

    render() {
        const {device} = this.state;
        const netNode = new NetNode().applyFromAgentData(device);

        return (
            <>
                <MockSidebar active="HOME" />
                {this.renderHeader(netNode)}
                {this.renderMain(netNode)}
            </>
        );
    }
    renderHeader(netNode) {
        //No padding in  real mode
        return <header id="header" className="header header-sticky-top bg-white container-fluid p-0 app-header">
            <NavigationBar
                left={<ActionButton 
                    route="/" 
                    title="Home" 
                    icon='fa-arrow-left'
                    type={BTN_TYPE_GHOST} 
                    tint={BTN_TINT_DARK} 
                    rounded={true}/>}
                right={<ActionButton
                    title={intl.get("generic_refresh")}
                    type={BTN_TYPE_DEFAULT}
                    tint={BTN_TINT_PRIMARY}
                    rounded={true}/>}
                title={"A mock for device detail"}
            />
            <DeviceDetailHeader 
                netNode={netNode}
                onClickTimeline={()=>console.log("Click timeline")}
                onChangeImportant={()=>console.log('Change important')}
                onClearDevice={()=>showDialogById(CLEAR_DEVICE_DIALOG_ID)}
                onEditDevice={()=>showDialogById(EDIT_DEVICE_DIALOG_ID)}
                onChangeDeviceType={()=>showDialogById(ICON_PICKER_DEVICE_DIALOG_ID)}
            />
            {/*<ClickToScrollBar onChangeTab={(index)=>this.scrollFromIndex(index)}/>*/}
        </header>
    }

    renderMain(netNode) {
        return (
            <main className="app-main pt-6">
                <div className="container-fluid" style={{marginTop: "240px"}}>
                    <div className="row">
                        {this.renderDetailSections(netNode)}
                        {this.renderFunctionsCards()}
                    </div>
                    <div className="row">
                        <SolutionSection recogCatalog={this.state.recogCatalog}/>
                        {this.renderEditModal(netNode)}
                        {this.renderClearModal()}
                        {this.renderIconPickerModal(netNode)}
                    </div>
                </div>
            </main>
        )
    }

    renderDetailSections(netNode){
        return (
            <div className="col-sm-12 col-md-12 col-lg-8">
                <div className="ml-4">
                    <NetworkSection netNode={netNode}/>
                    <DeviceSection netNode={netNode} recogCatalog={this.state.recogCatalog}/>
                    <OperatingSystemSection recogCatalog={this.state.recogCatalog}/>
                    <ProtocolSection netNode={netNode}/>
                    <OwnerSection
                        netNode={netNode}
                        contactList={this.state.contactList}
                        onClickContact={()=>console.log('Clicked contact')}/>
                </div>
            </div>
        )
    }

    // CARDS

    renderFunctionsCards(netNode){
        const onConfirmDevice = (evt) => {
            evt.preventDefault();
            console.log('Confirm')
        };
        const onPauseDevice = (evt) => {
            evt.preventDefault();
            console.log('Pause')
        };
        const onBlockDevice = (evt) => {
            evt.preventDefault();
            console.log('Block')
        };
        const onFindOpenPorts = (evt) => {
            evt.preventDefault();
            console.log('Find open ports')
        };
        const onPing = (evt) => {
            evt.preventDefault();
            console.log('Ping')
        };
        const onTraceroute = (evt) => {
            evt.preventDefault();
            console.log('Traceroute')
        };
        const onWakeOnLan = (evt) => {
            evt.preventDefault();
            console.log('Wake on lan')
        };


        const classes = "shadow-none border";

        const checkedNotification = netNode && netNode.alertOnStateChange && netNode.alertOnStateChange === true;
        return (
            <div className="col-sm-12 col-md-12 col-lg-4">
                <DetailSection title={'Improve security'}>
                    <LinkCard action={onConfirmDevice}>
                        <ToolCardSmall 
                            className={classes} 
                            title={"Confirmed as your device"} 
                            description={"This device is recognised as yours"} 
                            iconType={TOOL_CONFIRMED} 
                            iconBackgroundClass={"bg-fing-security"}/>
                    </LinkCard>
                    <NotificationCard 
                        onChangeTimeout={()=>console.log("Change timeout")}
                        description="Receive a notification when this device goes online or offline."
                        subtitle="Define how long a device must be absent to be declared offline. Fing can automatically detect the best threshold to avoid false alerts."
                        title="Notification:Alert me when state changes">
                        <div className="custom-control custom-switch">
                            <input id="alertOnStateChangeSwitch" type="checkbox" className="custom-control-input"
                                ref={(input) => this.netAlertOnStateChangeInput = input}
                                checked={checkedNotification}
                                onChange={() => console.log("Change alert notification input")}/>
                            <label className="custom-control-label" htmlFor="alertOnStateChangeSwitch">{intl.get('device_detail_notification_alert_label')}<br />
                                <small className='text-muted'>{intl.get('device_detail_notification_alert_small')}</small>
                            </label>
                        </div>
                    </NotificationCard>
                    <LinkCard action={onPauseDevice}>
                        <ToolCardSmall 
                            className={classes} 
                            title={"Pause"} 
                            description={"Set temporary limited access to the internet from this device"} 
                            iconType={TOOL_PAUSE} 
                            iconBackgroundClass={"bg-danger"}/>
                    </LinkCard>
                    <LinkCard action={onBlockDevice}>
                        <ToolCardSmall 
                            className={classes} 
                            title={"Blocklist"} 
                            description={"Permanently block this device on your network"} 
                            iconType={TOOL_BLOCK} 
                            iconBackgroundClass={"bg-danger"}/>
                    </LinkCard>
                    <LinkCard action={onFindOpenPorts}>
                        <ToolCardSmall 
                            className={classes} 
                            title={"Find Open Ports"} 
                            description={"Measure transit delays across your network"} 
                            iconType={TOOL_FIND_OPEN_PORTS} 
                            iconBackgroundClass={"bg-fing-security"}/>
                    </LinkCard>
                </DetailSection>
                <DetailSection title={'Troubleshooting tools'}>
                    <LinkCard action={onPing}>
                        <ToolCardSmall 
                            className={classes} 
                            title={"Ping"} 
                            description={"Visualize the response time of a device or website"} 
                            iconType={TOOL_PING} 
                            iconBackgroundClass={"bg-fing-troubleshooting"}/>
                    </LinkCard>
                    <LinkCard action={onTraceroute}>
                        <ToolCardSmall 
                            className={classes} 
                            title={"Traceroute"} 
                            description={"Measure the transit delays across the network"} 
                            iconType={TOOL_TRACEROUTE} 
                            iconBackgroundClass={"bg-fing-troubleshooting"}/>
                    </LinkCard>
                    <LinkCard action={onWakeOnLan}>
                        <ToolCardSmall 
                            className={classes} 
                            title={"Wake On Lan"} 
                            description={"Wake up devices that have been set up to receive Wake-On-Lan packets"} 
                            iconType={TOOL_WAKE_ON_LAN} 
                            iconBackgroundClass={"bg-fing-troubleshooting"}/>
                    </LinkCard>
                </DetailSection>
            </div>
        )
    }

    // DIALOGS

    renderEditModal(device) {
        
        return <EditDeviceDialog 
            id={EDIT_DEVICE_DIALOG_ID} 
            onSave={(val) => {
                console.log(val);
                hideDialogById(EDIT_DEVICE_DIALOG_ID);
            }}
            onClose={()=>hideDialogById(EDIT_DEVICE_DIALOG_ID)}
            title={intl.get('device_detail_edit_modal_title')} 
            device={device}/>;
    }

    renderClearModal() {

        return <ClearDeviceDialog 
            id={CLEAR_DEVICE_DIALOG_ID} 
            title={intl.get('device_detail_delete_modal_title')} 
            onClose={()=>hideDialogById(CLEAR_DEVICE_DIALOG_ID)} 
            onDelete={()=>{
                console.log('Clear device from list')
                hideDialogById(CLEAR_DEVICE_DIALOG_ID);
            }}/>
        
    }

    renderIconPickerModal(netNode) {
        let type = netNode && netNode.bestType ? netNode.bestType : DT_GENERIC;
        const onChangeDeviceType = (value) => {
            hideDialogById(ICON_PICKER_DEVICE_DIALOG_ID);
            console.log(value)
        }
        return <DeviceDetailIconPickerDialog 
            id={ICON_PICKER_DEVICE_DIALOG_ID} 
            onChangeDeviceType={onChangeDeviceType}
            onClose={()=>hideDialogById(ICON_PICKER_DEVICE_DIALOG_ID)}
            deviceType={type}/>
    }

}

class OperatingSystemSection extends Component {

    render() {
        const {recogCatalog} = this.props;
        const recogOs = recogCatalog && recogCatalog.recogOs ? recogCatalog.recogOs : null;
        const recogMake = recogCatalog && recogCatalog.recogMake ? recogCatalog.recogMake : null;

        if(!recogOs){
            return (
                <div id="key_operating_system">
                    <DetailHeader title="Operating system"/>
                    <EmptyStateSection 
                        title={"OS not recognised"} 
                        subtitle={"Fing could not identify the brand and model of this device operating system. Please select correct details about this device OS from our Fingpedia catalogue."}/>
                    <RevertBanner onClickRevert={()=>console.log('Click revert')}/>
                </div>
            )
        }
        const osName = recogOs && recogOs.osName ? recogOs.osName : '-';
        const osVersion = recogOs && recogOs.osVersion ? recogOs.osVersion : '-';
        const osReleaseDate = recogOs && recogOs.releaseDate ? formatSmartAbsoluteDate(recogOs.releaseDate) : '-';
        const osEndOfLifeDate = recogOs && recogOs.eolDate ? formatSmartAbsoluteDate(recogOs.eolDate) : '-';
        const osEndOfSupportDate = recogOs && recogOs.eosDate ? formatSmartAbsoluteDate(recogOs.eosDate) : '-';
        const brand = recogMake && recogMake.makeName ? recogMake.makeName : '-';
        const brandAndVersionValues = [
            { title:'Brand',description:brand,canCopy:true},
            { title:'Name',description:osName,canCopy:true},
            { title:'Version',description:osVersion,canCopy:true},
        ]
        const osLifeCyclesValues = [
            { title:'Release date',description:osReleaseDate},
            { title:'End of life date',description:osEndOfLifeDate},
            { title:'End of support date',description:osEndOfSupportDate},
            { title:'Validation',description:'Exact'} // To review
        ]


        let brandImg;
        if (recogOs && recogOs.bannerImageUrl) {
            brandImg = recogOs.bannerImageUrl;
        } else if (recogOs && recogOs.logoImageUrl) {
            brandImg = recogOs.logoImageUrl;
        } else {
            brandImg = "/isp/general/default_isp.png";
        }
        const element = <img src={DEFAULT_CDN + brandImg} />;

        return (
            <div id="key_operating_system">
                <DetailHeader title="Operating system"/>
                <DetailSection title={'Brand & Version'} element={element}>
                    <DeviceDetailTable>
                        {brandAndVersionValues.map(val=><DeviceDetailTableRow row={val}/>)}
                    </DeviceDetailTable>
                </DetailSection>
                <DetailSection title={'Operating system life cycle'}>
                    <DeviceDetailTable>
                        {osLifeCyclesValues.map(val=><DeviceDetailTableRow row={val}/>)}
                    </DeviceDetailTable>
                </DetailSection>
                
            </div>
        )
    }

}

class DeviceSection extends Component {

    render() {
        const {recogCatalog, netNode} = this.props;

        const recogMake = recogCatalog && recogCatalog.recogMake ? recogCatalog.recogMake : null;

        if(!recogCatalog){
            return (
                <div id="key_device">
                    <DetailHeader title="Device"/>
                    <EmptyStateSection 
                        title={"Device not recognised"} 
                        subtitle={"Fing could not identify the brand and model of this device. Please select correct details about this device from our Fingpedia catalogue."}/>
                    <RevertBanner onClickRevert={()=>console.log('Click revert')}/>
                </div>
            )
        }
        const recogDevice = recogCatalog.recogDevice ? recogCatalog.recogDevice : null;

        const deviceModel = recogDevice && recogDevice.deviceModel ? recogDevice.deviceModel : '-';
        const deviceModelCode = recogDevice && recogDevice.deviceModelCode ? recogDevice.deviceModelCode : '-';
        const brand = recogMake && recogMake.makeName ? recogMake.makeName : '-';
        const family = netNode && netNode.bestFamily ? netNode.bestFamily : '-';

        const brandAndModelValues = [
            { title:'Brand',description:brand,canCopy:true},
            { title:'Family',description:family,canCopy:true}, 
            { title:'Model',description:deviceModel,canCopy:true},
            { title:'Model code',description:deviceModelCode,canCopy:true}
        ]

        const releaseDate = recogDevice && recogDevice.releaseDate ? formatShortAbsoluteDate(recogDevice.releaseDate) : '-';
        const endOfSupportDate = recogDevice && recogDevice.eosDate ? formatShortAbsoluteDate(recogDevice.eosDate) : '-';
        const deviceLifeCyclesValues = [
            { title:'Release date',description:releaseDate},
            { title:'End of life date',description:'27/01/2018'}, // To review
            { title:'End of support date',description:endOfSupportDate},
            { title:'Validation',description:'Exact'}, // To review
            { title:'Warranty',description:'Check warranty'} // To review
        ]

        const priceClass = recogDevice && recogDevice.priceClass ? recogDevice.priceClass : '-';
        const lowBadgeClass = priceClass === 'Low' ? "badge-success" : "badge-soft-secondary";
        const mediumBadgeClass = priceClass === 'Medium' ? "badge-success" : "badge-soft-secondary";
        const highBadgeClass = priceClass === 'High' ? "badge-success" : "badge-soft-secondary";

        const priceBadges = <div className="d-flex align-items-center justify-content-center">
            <badge className={"badge mr-2 " + lowBadgeClass}>Low</badge>
            <badge className={"badge mr-2 " + mediumBadgeClass}>Medium</badge>
            <badge className={"badge mr-2 " + highBadgeClass}>High</badge>
        </div>

        const productClass = recogDevice && recogDevice.productClass ? recogDevice.productClass : '-';
        const consumerBadgeClass = productClass === 'Consumer' ? "badge-success" : "badge-soft-secondary";
        const enterpriseBadgeClass = productClass === 'Enterprise' ? "badge-success" : "badge-soft-secondary";

        const productBadges = <div className="d-flex align-items-center justify-content-center">
            <badge className={"badge mr-2 " + consumerBadgeClass}>Consumer</badge>
            <badge className={"badge mr-2 " + enterpriseBadgeClass}>Enterprise</badge>
        </div>

        const popularity = recogDevice && recogDevice.spreadInType ? recogDevice.spreadInType : null;
        let popularityVote = '- / 5';
        if (popularity) {
            const share = (Number(popularity) * 100);
            if (share < 0.1) popularityVote = '1 / 5';
            else if (share < 1) popularityVote = '2 / 5';
            else if (share < 5) popularityVote = '3 / 5';
            else if (share < 20) popularityVote = '4 / 5';
            else popularityVote = '5 / 5';
        }
            
        const productValues = [ 
            { title:'Price class',description: priceBadges},
            { title:'Product class',description: productBadges},
            { title:'Popularity',description: popularityVote}
        ]

        let brandImg;
        if (recogMake && recogMake.bannerImageUrl) {
            brandImg = recogMake.bannerImageUrl;
        } else if (recogMake && recogMake.logoImageUrl) {
            brandImg = recogMake.logoImageUrl;
        } else {
            brandImg = "/isp/general/default_isp.png";
        }
        const element = <img src={DEFAULT_CDN + brandImg} />;

        const googleImg = <img className="mb-2" src={GoogleImg} />;
        const alexaImg = <img className="mb-2" src={AlexaImg} />;
        const homeAssistantImg = <img className="mb-2" src={HomeAssistantImg} />;
        const homeKitImg = <img className="mb-2" src={HomeKitImg} />;
        const openHabImg = <img className="mb-2" src={OpenHabImg} />;

        return (
            <div id="key_device">
                <DetailHeader title="Device"/>
                <DetailSection title={"Brand & Model"} element={element}>
                    <DeviceDetailTable>
                        {brandAndModelValues.map(val=><DeviceDetailTableRow row={val}/>)}
                    </DeviceDetailTable>
                </DetailSection>
                
                <DetailSection title={"Device life cycle"}>
                    <DeviceDetailTable>
                        {deviceLifeCyclesValues.map(val=><DeviceDetailTableRow row={val}/>)}
                    </DeviceDetailTable>
                </DetailSection>
                <DetailSection title={"Product value"}>
                    <DeviceDetailTable>
                        {productValues.map(val=><DeviceDetailTableRow noBorder row={val}/>)}
                    </DeviceDetailTable>
                </DetailSection>
                <SmartHomeServices 
                    imageAlexa={alexaImg} 
                    imageHomeKit={homeKitImg} 
                    imageHomeAssistant={homeAssistantImg} 
                    imageGoogleAssistant={googleImg} 
                    imageOpenHAB={openHabImg}/>
            </div>
        )
    }

}
class NetworkSection extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            networkTableExpandable: false
        }
    }

    render() {
        const {netNode} = this.props;
        const {networkTableExpandable} = this.state;
        
        if(!netNode){
            return (
                <div id="key_network">
                    <DetailHeader title="Network setup"/>
                    <EmptyStateSection 
                        title={"Network not recognised"} 
                        subtitle={"Fing could not identify the setup data for this device"}/>
                    <RevertBanner onClickRevert={()=>console.log('Click revert')}/>
                </div>
            )
        }

        const ipAddresses = netNode.ipAddresses ? netNode.ipAddresses : '-';
        const macAddress = netNode.hwAddress ? netNode.hwAddress : '-';
        const firstSeenTime = netNode.firstSeenTime ? formatSmartAbsoluteDate(netNode.firstSeenTime) : '-';
        const lastSeenTime = netNode.lastSeenTime ? formatSmartAbsoluteDate(netNode.lastSeenTime) : '-';
        const stateChangeTime = netNode.stateChangeTime ? formatSmartAbsoluteDate(netNode.stateChangeTime) : '-';
        const hostName = netNode.hostName ? netNode.hostName : '-';
        const serialNumber = netNode.bestSerialNo ? netNode.bestSerialNo : '-';
        const networkSetupValues = [];
        if(ipAddresses.length === 1){
            networkSetupValues.push({ title:'IP Address',description:ipAddresses[0],canCopy:true});
        } else if(ipAddresses.length > 1){
            const icon = networkTableExpandable ? "fa-minus" : "fa-plus";
            const text = networkTableExpandable ? 'IP Address' : 'IP Addresses';

            const iconExpandable = <i className={"fa text-primary mr-2 " + icon} onClick={()=>this.setState({networkTableExpandable:!this.state.networkTableExpandable})}/>
            networkSetupValues.push({ title:text,description:ipAddresses[0],canCopy:true, icon: iconExpandable});
            if(networkTableExpandable){
                ipAddresses.forEach((ip,index) => {
                    if(index !== 0){
                        networkSetupValues.push({ title:'Additional IP Address',description:ip,canCopy:true});
                    }
                })
            }
        }

        networkSetupValues.push({ title:'MAC Address',description:macAddress,canCopy:true});
        networkSetupValues.push({ title:'Serial No',description:serialNumber,canCopy:true});
        networkSetupValues.push({ title:'First seen',description:firstSeenTime});
        networkSetupValues.push({ title:'Last seen',description:lastSeenTime});
        networkSetupValues.push({ title:'Last change',description:stateChangeTime});
        networkSetupValues.push({ title:'Hostname',description:hostName,canCopy:true});

        
        const onExpandIpRow = () => this.setState({networkTableExpandable: !this.state.networkTableExpandable});
        return (
            <div id="key_network">
                <DetailHeader title="Network setup"/>
                <DetailSection>
                    <DeviceDetailTable>
                        {networkSetupValues.map(val=> val.icon ? 
                            <DeviceDetailTableRow onExpandIpRow={onExpandIpRow} row={val}/> :  
                            <DeviceDetailTableRow row={val}/>
                        )}
                    </DeviceDetailTable>
                </DetailSection>
            </div>
        )
    }

}
class ProtocolSection extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            upnpServiceExpandable: false,
            upnpTypeExpandable: false,
            bonjourServiceExpandable: false,
        }
    }

    render() {
        const {netNode} = this.props;
        const {upnpServiceExpandable, upnpTypeExpandable, bonjourServiceExpandable} = this.state;
        const dhcp = netNode && netNode.dhcpInfo ? netNode.dhcpInfo : null;
        const upnp = netNode && netNode.upnpInfo ? netNode.upnpInfo : null;
        const snmp = netNode && netNode.snmpInfo ? netNode.snmpInfo : null;
        const bonjour = netNode && netNode.bonjourInfo ? netNode.bonjourInfo : null;
        const netBios = netNode && netNode.netbiosInfo ? netNode.netbiosInfo : null;
        const smb = netNode && netNode.smbInfo ? netNode.smbInfo : null;
        if(!dhcp && !upnp && !snmp && !bonjour && !netBios && !smb){
            return (
                <div id="key_protocols">
                    <DetailHeader title="Protocols"/>
                    <EmptyStateSection 
                        title={"No protocols found"} 
                        subtitle={"Fing could not identify any protocols from teh latest scan."}/>
                </div>
            )
        }
        const dhcpName = dhcp && dhcp.name ? dhcp.name : '-';
        const dhcpParams = dhcp && dhcp.params ? dhcp.params : '-';
        const dhcpVendor = dhcp && dhcp.vendor ? dhcp.vendor : '-';
        const lastDHCPRequestTime = netNode && netNode.lastDhcpRequestTime ? formatRelativeDate(netNode.lastDhcpRequestTime) : '-';
        const dhcpValues = [
            { title:'Name',description:dhcpName},
            { title:'Vendor',description:dhcpVendor},
            { title:'Params',description:dhcpParams},
            { title:'Last request',description:lastDHCPRequestTime}
        ]

        const upnpName = upnp && upnp.name ? upnp.name : '-';
        const upnpMake = upnp && upnp.make ? upnp.make : '-';
        const upnpModel = upnp && upnp.model ? upnp.model : '-';
        const upnpServiceList = upnp && upnp.service_list ? upnp.service_list : [];
        const upnpTypeList = upnp && upnp.type_list ? upnp.type_list : [];

        const upnpValues = [
            { title:'Name',description:upnpName},
            { title:'Make',description:upnpMake},
            { title:'Model',description:upnpModel}
        ]
        if(upnpServiceList.length === 1){
            upnpValues.push({ title:'Service',description:upnpServiceList[0],canCopy:true});
        } else if(upnpServiceList.length > 1){
            const icon = upnpServiceExpandable ? "fa-minus" : "fa-plus";
            const text = upnpServiceExpandable ? 'Service' : 'Services';

            const iconExpandable = <i className={"fa text-primary mr-2 " + icon} onClick={()=>this.setState({upnpServiceExpandable:!this.state.upnpServiceExpandable})}/>
            upnpValues.push({ title:text,description:upnpServiceList[0],canCopy:true, icon: iconExpandable});
            if(upnpServiceExpandable){
                upnpServiceList.forEach((service,index) => {
                    if(index !== 0){
                        upnpValues.push({ title:'Additional Service',description:service,canCopy:true});
                    }
                })
            }
        }

        if(upnpTypeList.length === 1){
            upnpValues.push({ title:'Device Type',description:upnpTypeList[0],canCopy:true});
        } else if(upnpTypeList.length > 1){
            const icon = upnpTypeExpandable ? "fa-minus" : "fa-plus";
            const text = upnpTypeExpandable ? 'Device Type' : 'Device Types';

            const iconExpandable = <i className={"fa text-primary mr-2 " + icon} onClick={()=>this.setState({upnpTypeExpandable:!this.state.upnpTypeExpandable})}/>
            upnpValues.push({ title:text,description:upnpTypeList[0],canCopy:true, icon: iconExpandable});
            if(upnpTypeExpandable){
                upnpTypeList.forEach((type,index) => {
                    if(index !== 0){
                        upnpValues.push({ title:'Additional Device Type',description:type,canCopy:true});
                    }
                })
            }
        }
        const snmpDescription = snmp && snmp.description ? snmp.description : '-';
        const snmpName = snmp && snmp.name ? snmp.name : '-';
        const snmpServices = snmp && snmp.services ? snmp.services : '-';

        const snmpValues = [
            { title:'Name',description:snmpName},
            { title:'Description',description:snmpDescription},
            { title:'Services',description:snmpServices}
        ]

        const bonjourName = bonjour && bonjour.name ? bonjour.name : '-';
        const bonjourModel = bonjour && bonjour.model ? bonjour.model : '-';
        const bonjourServiceList = bonjour && bonjour.serviceinfo_list ? bonjour.serviceinfo_list : '-';
        const bonjourValues = [
            { title:'Name',description:bonjourName},
            { title:'Model',description:bonjourModel}
        ]

        if(bonjourServiceList.length === 1){
            bonjourValues.push({ title:'Service',description:bonjourServiceList[0]['name'],canCopy:true});
        } else if(bonjourServiceList.length > 1){
            const icon = bonjourServiceExpandable ? "fa-minus" : "fa-plus";
            const text = bonjourServiceExpandable ? 'Service' : 'Services';

            const iconExpandable = <i className={"fa text-primary mr-2 " + icon} onClick={()=>this.setState({bonjourServiceExpandable:!this.state.bonjourServiceExpandable})}/>
            bonjourValues.push({ title:text,description:bonjourServiceList[0]['name'],canCopy:true, icon: iconExpandable});
            if(bonjourServiceExpandable){
                bonjourServiceList.forEach((service,index) => {
                    if(index !== 0){
                        bonjourValues.push({ title:'Additional Service',description:service.name,canCopy:true});
                    }
                })
            }
        }

        const netBiosName = netBios && netBios.name ? netBios.name : '-';
        const netBiosDomain = netBios && netBios.domain ? netBios.domain : '-';
        const netBiosIsFileServer = netBios && netBios.is_file_server && netBios.is_file_server === 'true' ? 'Yes' : 'No';
        const netBiosIsDomainController = netBios && netBios.is_domain_controller && netBios.is_domain_controller === 'true' ? 'Yes' : 'No';
        const netBiosValues = [
            { title:'Name',description:netBiosName},
            { title:'Domain',description:netBiosDomain},
            { title:'File server',description:netBiosIsFileServer},
            { title:'Domain controller',description:netBiosIsDomainController}
        ]

        const smbNativeOS = smb && smb.nativeOS ? smb.nativeOS : '-';
        const smbNativeLM = smb && smb.nativeLM ? smb.nativeLM : '-';
        const smbValues = [
            { title:'Native OS',description:smbNativeOS},
            { title:'Native LM',description:smbNativeLM}
        ]

        const onChangeDeepScan = () => {
            console.log('Deep scan changed')
        }
        return (
            <div id="key_protocols">
                <DetailHeader title="Protocols" onChangeDeepScan={onChangeDeepScan}/>
                <DeepScanBanner deepScanChecked={true}/>
                {dhcp && <DetailSection title={'DHCP'}>
                    <DeviceDetailTable>
                        {dhcpValues.map(val=><DeviceDetailTableRow row={val}/>)}
                    </DeviceDetailTable>
                </DetailSection>}
                {upnp && <DetailSection title={'UPNP'}>
                    <DeviceDetailTable>
                        {upnpValues.map(val=><DeviceDetailTableRow row={val}/>)}
                    </DeviceDetailTable>
                </DetailSection>}
                {snmp && <DetailSection title={'SNMP'}>
                    <DeviceDetailTable>
                        {snmpValues.map(val=><DeviceDetailTableRow row={val}/>)}
                    </DeviceDetailTable>
                </DetailSection>}
                {bonjour && <DetailSection title={'Bonjour'}>
                    <DeviceDetailTable>
                        {bonjourValues.map(val=><DeviceDetailTableRow row={val}/>)}
                    </DeviceDetailTable>
                </DetailSection>}
                {netBios && <DetailSection title={'Net BIOS'}>
                    <DeviceDetailTable>
                        {netBiosValues.map(val=><DeviceDetailTableRow row={val}/>)}
                    </DeviceDetailTable>
                </DetailSection>}
                {smb && <DetailSection title={'SMB'}>
                    <DeviceDetailTable>
                        {smbValues.map(val=><DeviceDetailTableRow row={val}/>)}
                    </DeviceDetailTable>
                </DetailSection>}
            </div>
        )
    }

}
class OwnerSection extends Component {

    constructor(props, context) {
        super(props, context);
        this.onClickContact = this.onClickContact.bind(this);
    }
    onClickContact(contact){
        if(this.props.onClickContact){
            this.props.onClickContact(contact);
        }
    }

    render() {
        const {netNode, contactList} = this.props;
        let contact = contactList.find(contact => contact.contactId === netNode.contactId)
        
        if(!contact){
            contact = {
                contactName: "User not found",
                imageURL: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb"
            };
        }
        return (
            <div id="key_owner">
                <DetailHeader title="Owner"/>
                <LinkCard action={()=>this.onClickContact(contact)}>
                    <ContactCard contact={contact} horizontal={true}/>
                </LinkCard>
            </div>
        )
    }

}
class SolutionSection extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedIndex: 0
        }
    }

    render() {
        const {recogCatalog} = this.props;

        let recogMake = recogCatalog && recogCatalog.recogMake ? recogCatalog.recogMake : null;
        let recogOsMake = recogCatalog && recogCatalog.recogOsMake ? recogCatalog.recogOsMake : null;
        let recogOs = recogCatalog && recogCatalog.recogOs ? recogCatalog.recogOs : null;
        const deviceData = recogCatalog && recogCatalog.recogDevice ? recogCatalog.recogDevice : null;

        // TODO: Search these type of 
        const items = [];
        if(recogMake && recogMake.makeName){
            items.push({label: recogMake.makeName});
        }
        if(recogOs && recogOs.osName){
            items.push({label: recogOs.osName});
        }

        if(this.state.selectedIndex === 0){
            recogOsMake = null;
            recogOs = null;
        } else if(this.state.selectedIndex === 1){
            recogMake = null
        }

        const onItemSelected = (index) => {
            this.setState({selectedIndex: index})
        };

        return (
            <div className="col-12" id="key_solutions">
                <DetailHeader title="Solutions"/>
                <div className="d-flex align-items-center justify-content-end">
                    <SegmentedBar 
                        activeIndex={this.state.selectedIndex} 
                        items={items} 
                        onItemSelected={onItemSelected}/>
                </div>
                <div className="row">
                    <SolutionHelpDesk recogMake={recogMake} recogOs={recogOs} recogOsMake={recogOsMake}/>
                    <SolutionConsult data={deviceData}/>
                    <SolutionKnowMore recogMake={recogMake} recogOs={recogOs} recogOsMake={recogOsMake}/>
                    <SolutionSocial recogMake={recogMake} recogOs={recogOs} recogOsMake={recogOsMake}/>
                </div>
            </div>
        );
    }

}
class SolutionSocial extends Component {

    getData(key){
        const {recogMake, recogOs, recogOsMake} = this.props;
        let data;
        if(recogMake){
            data = recogMake;
        } else {
            data = recogOs;
        }

        return data && data[key] ? data[key] : recogOsMake ? recogOsMake[key] : null;
    }
    
    render() {
        
        const facebook = this.getData('facebookAccount');
        const twitter = this.getData('twitterAccount');
        const linkedin = this.getData('linkedinAccount');
        const instagram = this.getData('instagramAccount');
        const youtube = this.getData('youtubeAccount');
        const pinterest = this.getData('pinterestAccount');

        const onClickFacebook = (evt) => {
            evt.preventDefault();
            if(facebook){
                console.log('Facebook');
            }
        };

        const onClickTwitter = (evt) => {
            evt.preventDefault();
            if(twitter){
                console.log('Twitter');
            }
        };

        const onClickLinkedin = (evt) => {
            evt.preventDefault();
            if(linkedin){
                console.log('Linkedin');
            }
        };

        const onClickYoutube = (evt) => {
            evt.preventDefault();
            if(youtube){
                console.log('Youtube');
            }
        };

        const onClickPinterest = (evt) => {
            evt.preventDefault();
            if(pinterest){
                console.log('Pinterest');
            }
        };

        const onClickInstagram = (evt) => {
            evt.preventDefault();
            if(instagram){
                console.log('Instagram');
            }
        };
        
        return (
            <div className="col-3">
                <h4>Social</h4>
                <SolutionBadge text="Facebook" icon="fab fa-facebook-f" disabled={facebook === null} action={onClickFacebook}/>
                <SolutionBadge text="Twitter" icon="fab fa-twitter" disabled={twitter === null} action={onClickTwitter}/>
                <SolutionBadge text="Linkedin" icon="fab fa-linkedin" disabled={linkedin === null} action={onClickLinkedin}/>
                <SolutionBadge text="YouTube" icon="fab fa-youtube" disabled={youtube === null} action={onClickYoutube}/>
                <SolutionBadge text="Pinterest" icon="fab fa-pinterest" disabled={pinterest === null} action={onClickPinterest}/>
                <SolutionBadge text="Instagram" icon="fab fa-instagram" disabled={instagram === null} action={onClickInstagram}/>
            </div>
        )
    }
}

class SolutionKnowMore extends Component {

    getData(key){
        const {recogMake, recogOs, recogOsMake} = this.props;
        let data;
        if(recogMake){
            data = recogMake;
        } else {
            data = recogOs;
        }

        return data && data[key] ? data[key] : recogOsMake ? recogOsMake[key] : null;
    }

    render() {
        const website = this.getData('websiteUrl');
        const wikipedia = this.getData('wikipediaId');

        const onClickWebsite = (evt) => {
            evt.preventDefault();
            if(website){
                console.log('Website');
            }
        };

        const onClickWiki = (evt) => {
            evt.preventDefault();
            if(wikipedia){
                console.log('Wikipedia');
            }
        };

        return (
            <div className="col-3">
                <h4>Know more</h4>
                <SolutionBadge text="Brand website" icon="fa fa-globe" disabled={website === null} action={onClickWebsite}/>
                <SolutionBadge text="Wiki" icon="fab fa-wikipedia-w" disabled={wikipedia === null} action={onClickWiki}/>
            </div>
        )
    }
}


class SolutionConsult extends Component {
    
    render() {
        const {data} = this.props;
        const manual = data && data.manualUrl ? data.manualUrl : null;
        const faq = data && data.faqUrl ? data.faqUrl : null;
        
        const onClickDocs = (evt) => {
            evt.preventDefault();
            if(manual){
                console.log('Docs');
            }
        };

        const onClickFaqs = (evt) => {
            evt.preventDefault();
            if(faq){
                console.log('FAQs');
            }
        };
        return (
            <div className="col-3">
                <h4>Consult</h4>
                <SolutionBadge text="Manual docs" icon="fa fa-book-open" disabled={manual === null} action={onClickDocs}/>
                <SolutionBadge text="FAQs" icon="fa fa-question" disabled={faq === null} action={onClickFaqs}/>
            </div>
        )
    }
}


class SolutionHelpDesk extends Component {

    getData(key){
        const {recogMake, recogOs, recogOsMake} = this.props;
        let data;
        if(recogMake){
            data = recogMake;
        } else {
            data = recogOs;
        }

        return data && data[key] ? data[key] : recogOsMake ? recogOsMake[key] : null;
    }
    
    render() {
        const support = this.getData('supportUrl');
        const forum = this.getData('communityUrl'); 
        const phone = this.getData('supportPhone');

        const onClickPhone = (evt) => {
            evt.preventDefault();
            if(phone){
                console.log('Phone');
            }
        };

        const onClickSupport = (evt) => {
            evt.preventDefault();
            if(support){
                console.log('Support');
            }
        };

        const onClickForum = (evt) => {
            evt.preventDefault();
            if(forum){
                console.log('Forum');
            }
        };
        
        return (
            <div className="col-3">
                <h4>Help Desk</h4>
                <SolutionBadge text="Customer service" icon="fa fa-phone" disabled={phone === null} action={onClickPhone}/>
                <SolutionBadge text="Support website" icon="fa fa-globe" disabled={support === null} action={onClickSupport}/>
                <SolutionBadge text="Forum" icon="fas fa-message-quote" disabled={forum === null} action={onClickForum}/>
            </div>
        )
    }
}

class RevertBanner extends Component {

    constructor(props, context) {
        super(props, context);
        this.onClickRevert = this.onClickRevert.bind(this);
    }

    onClickRevert(){
        if(this.props.onClickRevert){
            this.props.onClickRevert();
        }
    }

    render(){
        return (
            <DeviceDetailBanner 
                subtitle="Please update these details if they no longer look right">
                <ActionButton action={this.onClickRevert} title="Revert to original"/>
            </DeviceDetailBanner>
        )

    }

}

class ChooseModelBanner extends Component {

    constructor(props, context) {
        super(props, context);
        this.onClickChoose = this.onClickChoose.bind(this);
    }

    onClickChoose(){
        if(this.props.onClickChoose){
            this.props.onClickChoose();
        }
    }

    render(){
        return (
            <DeviceDetailBanner 
                subtitle="Help us to get it right">
                <ActionButton title="Choose a model" action={this.onClickChoose} icon="fa-search"/>
            </DeviceDetailBanner>
        )
    }

}

class FeedbackBanner extends Component {

    constructor(props, context) {
        super(props, context);
        this.onClickYes = this.onClickYes.bind(this);
        this.onClickNo = this.onClickNo.bind(this);
    }

    onClickNo(){
        if(this.props.onClickNo){
            this.props.onClickNo();
        }
    }

    onClickYes(){
        if(this.props.onClickYes){
            this.props.onClickYes();
        }
    }

    render(){
        return (
            <DeviceDetailBanner 
                title="Did Fing get it right?" 
                subtitle="Your feedback helps us improve device recognition results">
                <ActionButton title="Yes" action={this.onClickYes} tint={BTN_TINT_SUCCESS} icon="fa-thumbs-up"/>
                <ActionButton title="No" action={this.onClickNo} tint={BTN_TINT_DARK} icon="fa-thumbs-up"/>
            </DeviceDetailBanner>
        )
    }

}

class DeepScanBanner extends Component {

    constructor(props, context) {
        super(props, context);
        this.onChangeDeepScan = this.onChangeDeepScan.bind(this);
    }

    onChangeDeepScan(){
        if(this.props.onChangeDeepScan){
            this.props.onChangeDeepScan();
        }
    }

    render(){
        const {deepScanChecked} = this.props;
        const title = deepScanChecked ? "Deep scan enabled" : "Deep scan disabled";
        return (
            <DeviceDetailBanner 
                title={title}
                subtitle="Runs weekly on each discovered device, collect additional detail for HTTP, HTTPS, SSH, Telnet, FTP, SMB to improve the device recognition.">
                <div className="custom-control custom-switch">
                    <input id="deepScanChangeSwitch" type="checkbox" className="custom-control-input"
                        ref={(input) => this.deepScanChangeInput = input}
                        checked={deepScanChecked}
                        onChange={() => console.log("Change alert notification input")}/>
                    <label className="custom-control-label"></label>
                </div>
            </DeviceDetailBanner>
        )
    }

}

class SmartHomeServices extends Component {
    
    constructor(props, context) {
        super(props, context);
        this.onClickAlexa = this.onClickAlexa.bind(this);
        this.onClickHomeKit = this.onClickHomeKit.bind(this);
        this.onClickHomeAssistant = this.onClickHomeAssistant.bind(this);
        this.onClickOpenHAB = this.onClickOpenHAB.bind(this);
        this.onClickGoogleAssistant = this.onClickGoogleAssistant.bind(this);
    }

    onClickAlexa(){
        const {recogDevice} = this.props;
        const shAlexaLangs = recogDevice && recogDevice.shAlexaLangs && recogDevice.shAlexaLangs.length > 0 ? data.shAlexaLangs : [];
        if(this.props.onClickAlexa){
            this.props.onClickAlexa(shAlexaLangs);
        }
    }
    onClickHomeKit(){
        const {recogDevice} = this.props;
        const shAppleHomeKit = recogDevice && recogDevice.shAppleHomeKit ? recogDevice.shAppleHomeKit : null;
        if(this.props.onClickHomeKit){
            this.props.onClickHomeKit(shAppleHomeKit);
        }
    }
    onClickHomeAssistant(){
        const {recogDevice} = this.props;
        const shHassHandle = recogDevice && recogDevice.shHassHandle ? recogDevice.shHassHandle : null;
        if(this.props.onClickHomeAssistant){
            this.props.onClickHomeAssistant(shHassHandle);
        }
    }
    onClickOpenHAB(){
        const {recogDevice} = this.props;
        const shOpenHabHandle = recogDevice && recogDevice.shOpenHabHandle ? recogDevice.shOpenHabHandle : null;
        if(this.props.onClickOpenHAB){
            this.props.onClickOpenHAB(shOpenHabHandle);
        }
    }
    onClickGoogleAssistant(){
        const {recogDevice} = this.props;
        const shGoogleAssLangs = recogDevice && recogDevice.shGoogleAssLangs && recogDevice.shGoogleAssLangs.length > 0 ? data.shGoogleAssLangs : [];
        if(this.props.onClickGoogleAssistant){
            this.props.onClickGoogleAssistant(shGoogleAssLangs);
        }
    }    

    render() {
        const {recogDevice, imageAlexa, imageHomeKit, imageHomeAssistant, imageGoogleAssistant, imageOpenHAB} = this.props;
        const shOpenHabHandle = recogDevice && recogDevice.shOpenHabHandle ? recogDevice.shOpenHabHandle : null;
        const shGoogleAssLangs = recogDevice && recogDevice.shGoogleAssLangs && recogDevice.shGoogleAssLangs.length > 0 ? data.shGoogleAssLangs : [];
        const shHassHandle = recogDevice && recogDevice.shHassHandle ? recogDevice.shHassHandle : null;
        const shAppleHomeKit = recogDevice && recogDevice.shAppleHomeKit ? recogDevice.shAppleHomeKit : null;
        const shAlexaLangs = recogDevice && recogDevice.shAlexaLangs && recogDevice.shAlexaLangs.length > 0 ? data.shAlexaLangs : [];

        const opacityAlexa = shAlexaLangs.length > 0 ? 1 : 0.2;
        const opacityGoogle = shGoogleAssLangs.length > 0 ? 1 : 0.2;
        const opacityHomeAssistant = shHassHandle ? 1 : 0.2;
        const opacityHomeKit = shAppleHomeKit ? 1 : 0.2;
        const opacityOpenHab = shOpenHabHandle ? 1 : 0.2;

        const cName = "d-block px-auto p-2 m-2 border text-center";

        const element = !shOpenHabHandle && shGoogleAssLangs.length === 0 && shHassHandle && shAppleHomeKit && shAlexaLangs.length === 0 ? 
            <p className="mb-0">Services not available</p> : '';

        return (
            <DetailSection title={'Smart home services'} element={element}>
                <div className="d-flex align-items-center justify-content-between">
                    
                    <LinkCard action={this.onClickAlexa}>
                        <div style={{borderRadius: "12px", width:120, opacity: opacityAlexa}} className={cName}>
                            {imageAlexa}
                            <p className={"mb-0 small text-dark"}>Alexa</p>
                        </div>
                    </LinkCard>
                
                    <LinkCard action={this.onClickHomeKit}>
                        <div style={{borderRadius: "12px", width:120, opacity: opacityHomeKit}} className={cName}>
                            {imageHomeKit}
                            <p className={"mb-0 small text-dark"}>Home kit</p>
                        </div>
                    </LinkCard>
                
                    <LinkCard action={this.onClickHomeAssistant}>
                        <div style={{borderRadius: "12px", width:120, opacity: opacityHomeAssistant}} className={cName}>
                            {imageHomeAssistant}
                            <p className={"mb-0 small text-dark"}>Home assistant</p>
                        </div>
                    </LinkCard>
                
                    <LinkCard action={this.onClickOpenHAB}>
                        <div style={{borderRadius: "12px", width:120, opacity: opacityOpenHab}} className={cName}>
                            {imageGoogleAssistant}
                            <p className={"mb-0 small text-dark"}>Open HAB</p>
                        </div>
                    </LinkCard>

                    <LinkCard action={this.onClickGoogleAssistant}>
                        <div style={{borderRadius: "12px", width:120, opacity: opacityGoogle}} className={cName}>
                            {imageOpenHAB}
                            <p className={"mb-0 small text-dark"}>Google assistant</p>
                        </div>
                    </LinkCard>
                </div>
            </DetailSection>
        )
    }
}
