import React, {Component} from "react";
import intl from "react-intl-universal";

import ActionButton, {BTN_SIZE_BIG} from '../component/ActionButton';
import DiscoveryStateData from "./data/DataDiscoveryState.json";
import NetNode from "../model/NetNode";
import {
    hideDialogById,
    showDialogById
} from '../component/ModalDialog';
import SecurityDeviceToggleDialog from "../view/security/SecurityDeviceToggleDialog";
import UnconfirmedDeviceCard from "../view/security/UnconfirmedDeviceCard";
import AccessPointCard from "../view/security/AccessPointCard";
import ManageNotificationCard from "../view/security/ManageNotificationCard";
import FindHiddenCameraCard from "../view/security/FindHiddenCameraCard";
import AutomatedVulnerabilityCard from "../view/security/AutomatedVulnerabilityCard";
import NotificationDeviceCard from "../view/security/NotificationDeviceCard";
import RouterVulnerabilityCard from "../view/security/RouterVulnerabilityCard";
import SummaryCard from "../component/summary/SummaryCard";
import AccessPointDialog from "../view/security/AccessPointDialog";
import SummarySection from '../component/summary/SummarySection';
import SummaryCardBody from '../component/summary/SummaryCardBody';
import ScheduleVulnerabilityTestDialog from "../view/security/ScheduleVulnerabilityTestDialog";
import SummarySecurityScore from "../component/summary/SummarySecurityScore";
import SummaryTitle from "../component/summary/SummaryTitle";
import NotificationAutoBlockCard from "../view/security/NotificationAutoBlockCard";

const SECURITY_ACCESS_POINT = "SECURITY_ACCESS_POINT";
const SECURITY_MANAGE_ALERTS_DIALOG = "SECURITY_MANAGE_ALERTS_DIALOG";
const SECURITY_CONFIRM_PART_DIALOG = "SECURITY_CONFIRM_PART_DIALOG";
const SECURITY_OPTION_DIALOG = "SECURITY_OPTION_DIALOG";

const isFree = false;

const COLORS = [
    '#F7CA45',
    '#DECF4B',
    '#C5D251',
    '#91D251',
    '#36CE33',
]


export default class MockSecurityScorePage extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            discovery: DiscoveryStateData.discovery.discovery,
            running: false,
            disabled: false,
            activeOption: 0,
            newDevicesDialogDays: -1
        }
        this.editNetwork = this.editNetwork.bind(this);
        this.editNodes = this.editNodes.bind(this);
    }

    // --------------------------------------------------------------------------------------------------------
    // EDITING
    // --------------------------------------------------------------------------------------------------------

    
    editNetwork(network) {
        // Edit network in real app
        console.log("About to change network");
        console.log(network)
    }

    editNodes(netNodes) {
        // Edit nodes in real app
        console.log("About to change " + netNodes.length + " devices");
        console.log(netNodes);
    }

    // --------------------------------------------------------------------------------------------------------
    // RENDERING
    // --------------------------------------------------------------------------------------------------------

    render() {
        const {discovery, running} = this.state;
        const netNodes = discovery.nodes ? discovery.nodes.map(node => new NetNode().applyFromAgentData(node)) : null;
        const network = discovery.network ? discovery.network : null;

        return (
            <>
                {this.renderSummarySections(discovery, netNodes, running)}
                {this.renderOptionDialog(network)}
                {this.renderAccessPointDialog(discovery)}
                {this.renderManageAlertsDialog(netNodes)}
                {this.renderConfirmNewDevicesDialog(netNodes)}
            </>
        );
    }

    renderSummarySections(discovery, netNodes, running) {
        const {activeOption} = this.state;
        const network = discovery.network ? discovery.network : null;
        const titleSection = "Included with your plan";

        const handleAlertOnNewNodesChanged = (checked) => {
            const newNetwork = Object.assign({}, network);
            newNetwork.alertOnNewNode = checked;
            this.editNetwork(newNetwork);
        };

        const onManageAlertClick = () => showDialogById(SECURITY_MANAGE_ALERTS_DIALOG);
        const onClickAccessPoint = () => showDialogById(SECURITY_ACCESS_POINT);
        const onClickRouterVulnerability = () => window.location.pathname = '/mock/vulnerability_test';
        const onClickTimeline = () => window.location.pathname = '/mock/vulnerability_test/timeline';
        const onClickHiddenCamera = () => window.location.pathname = '/mock/find_hidden_camera';
        const onClickEventsTimeline = () => window.location.pathname = '/mock/security/timeline';
        const onConfirmDevices = () => showDialogById(SECURITY_CONFIRM_PART_DIALOG);
        const onScheduleClick = () => showDialogById(SECURITY_OPTION_DIALOG);
        const sectionTitle = (title) => <h3 className="mb-3">{title}</h3>;

        const CardContainer = props => (
            <div className="py-2 row">
                <div className="col-12">
                    {props.children}
                </div>
            </div>
        );

        return (
            <>
                <SummarySection>
                    {sectionTitle(intl.get('security_score_score'))}
                    <div className="container ml-0">
                        <div className="row">
                            <div className="col-12">
                                {this.renderScoreAndInfoCard(discovery, running)}
                            </div>
                        </div>
                    </div>
                </SummarySection>
                <SummarySection>
                    {/* {sectionTitle(titleSection)} */}
                    <SummaryTitle title={titleSection} />
                    <div className="container ml-0">
                        <CardContainer>
                            <UnconfirmedDeviceCard
                                onClickEventsTimeline={onClickEventsTimeline}
                                onConfirmDevices={onConfirmDevices}
                                netNodes={netNodes}
                                enabled={!running}/>
                        </CardContainer>
                        <CardContainer>
                            <AccessPointCard
                                onClickAccessPoint={onClickAccessPoint}
                                discovery={discovery}
                                enabled={!running}/>
                        </CardContainer>
                    </div>
                    {/* {isFree && sectionTitle(intl.get('security_score_unlock'))} */}
                    {isFree && <SummaryTitle className="pt-4 pb-2" title="Disabled checks" actionTitle="Unlock all features" onUnlock={() => undefined}/>}
                    <div className="container ml-0">
                        <CardContainer>
                            <NotificationDeviceCard
                                _config={{
                                    isAllowedByPermission: !isFree
                                }}
                                network={network}
                                handleAlertOnNewNodesChanged={handleAlertOnNewNodesChanged}
                                enabled={!running}/>
                        </CardContainer>
                        <CardContainer>
                            <ManageNotificationCard
                                _config={{
                                    isAllowedByPermission: !isFree
                                }}
                                netNodes={netNodes}
                                handleManageDevicesClick={onManageAlertClick}
                                enabled={!running}/>
                        </CardContainer>
                        <CardContainer>
                            <AutomatedVulnerabilityCard
                                _config={{
                                    isAllowedByPermission: !isFree
                                }}
                                onClickTimeline={onClickTimeline}
                                onScheduleClick={onScheduleClick}
                                enabled={!running}/>
                        </CardContainer>
                        <CardContainer>
                            <RouterVulnerabilityCard
                                _config={{
                                    isAllowedByPermission: !isFree
                                }}
                                discovery={discovery}
                                running={running}
                                enabled={!running}
                                onClickRouterVulnerability={onClickRouterVulnerability}
                                activeOption={activeOption}/>
                        </CardContainer>
                        <CardContainer>
                            <NotificationAutoBlockCard 
                                _config={{
                                    isAllowedByPermission: !isFree
                                }}
                                network={network}
                                enabled={!running}
                                hasValidationFailed={false}/>
                        </CardContainer>
                        <CardContainer>
                            <FindHiddenCameraCard
                                _config={{
                                    isAllowedByPermission: !isFree
                                }}
                                onClickHiddenCamera={onClickHiddenCamera}
                                discovery={discovery}
                                running={running}
                                enabled={!running}/>
                        </CardContainer>
                    </div>
                </SummarySection>
            </>
        )
    }

    renderInfoCard(running) {
        return (
            <SummaryCard background={'bg-light'}>
                <SummaryCardBody>
                    <div className="d-block my-auto">
                        <p>
                            {intl.get('security_score_info')}
                        </p>
                        {isFree && <ActionButton
                            size={BTN_SIZE_BIG}
                            title={intl.get('premium_unlock_all')}
                            disabled={running}/>}
                    </div>
                </SummaryCardBody>
            </SummaryCard>
        )
    }

    renderScoreAndInfoCard(discovery, running) {
        const security = discovery && discovery.lastsecurityanalysis ? discovery.lastsecurityanalysis : null;

        const score = security ? Number((security.score / 20).toFixed(0)) : 0;
        return (
            <SummarySecurityScore 
                leftText={'Unsecure'} 
                rightText={'Secure'} 
                score={score} 
                infoTitle="The network MyHome returned a security score of 58 out of 100."
                infoText="Score parameters are based on your network setup, reported vulnerabilities, active alerts and unconfirmed devices.">
                {isFree && <ActionButton
                    title={intl.get('premium_unlock_all')}
                    disabled={running}/>}
            </SummarySecurityScore>
        );
    }

    //DIALOGS

    renderManageAlertsDialog(netNodes) {
        const onClose = () => {
            hideDialogById(SECURITY_MANAGE_ALERTS_DIALOG);
        };
        const onConfirm = (values) => {
            hideDialogById(SECURITY_MANAGE_ALERTS_DIALOG);

            const nodeChanges = netNodes
                .filter(netNode => values[netNode.hwAddress] !== undefined && (netNode.alertOnStateChange === true) !== values[netNode.hwAddress])
                .map(netNode => {
                    const editableValues = netNode.extractValueForAgentData();
                    editableValues.alertOnStateChange = values[netNode.hwAddress] === true ? "true" : "false";
                    return editableValues;
                });
            this.editNodes(nodeChanges);
        };

        // Extract the alert setting from the NetNodes
        const values = {}
        if(netNodes && netNodes.length > 0){
            netNodes.forEach(netNode => values[netNode.hwAddress] = (netNode.alertOnStateChange === true));
        }
        return (
            <SecurityDeviceToggleDialog
                id={SECURITY_MANAGE_ALERTS_DIALOG}
                title={intl.get("device_alerts_dialog_title")}
                body={intl.get("device_alerts_dialog_body")}
                selectAllEnabled={true}
                deselectAllEnabled={true}
                netNodes={netNodes}
                values={values}
                onClose={onClose}
                onConfirm={onConfirm}/>
        );
    }

    renderOptionDialog(network) {
        const onClose = () => {
            hideDialogById(SECURITY_OPTION_DIALOG);
        };
        const onOptionSelected = (value) => {
            console.log("Updated schedule with timestamp: " + value);

            hideDialogById(SECURITY_OPTION_DIALOG);
        };
        
        return <ScheduleVulnerabilityTestDialog
            onOptionSelected={onOptionSelected}
            onClose={onClose}
            network={network}
            id={SECURITY_OPTION_DIALOG}/>
    }

    renderConfirmNewDevicesDialog(origNetNodes) {
        let netNodes;
        if(origNetNodes && origNetNodes.length > 0){
            netNodes = origNetNodes.sort((n1, n2) => {
                const conf1 = n1.customChangeTime && n1.customChangeTime > 0;
                const conf2 = n2.customChangeTime && n2.customChangeTime > 0;
                const name1 = n1.bestName || "";
                const name2 = n2.bestName || "";
                return (conf1 === conf2) ? name1.localeCompare(name2) : conf1 ? 1 : -1;
            });
        }
        

        const onClose = () => {
            hideDialogById(SECURITY_CONFIRM_PART_DIALOG);
        };
        const onConfirm = (values) => {
            hideDialogById(SECURITY_CONFIRM_PART_DIALOG);

            const nodeChanges = netNodes
                .filter(node => {
                    const hasSetting = values[node.hwAddress] !== undefined;
                    const nodeWasConfirmed = node.customChangeTime !== undefined && Number(node.customChangeTime) > 0;
                    const nodeIsNowConfirmed = values[node.hwAddress] === true;
                    return hasSetting && (nodeWasConfirmed !== nodeIsNowConfirmed);
                })
                .map(netNode => netNode.extractValueForAgentData());

            this.editNodes(nodeChanges);
        };

        // Extract the alert setting from the NetNodes
        const values = {};
        const disabled = {};
        if(netNodes && netNodes.length > 0){
            netNodes.forEach(netNode => {
                values[netNode.hwAddress] = (netNode.customChangeTime > 0);
                disabled[netNode.hwAddress] = (netNode.customChangeTime > 0);
            });
        }
        

        return (
            <SecurityDeviceToggleDialog
                id={SECURITY_CONFIRM_PART_DIALOG}
                title={intl.get("device_confirm_dialog_title")}
                body={intl.get("device_confirm_dialog_body_alt")}
                selectAllEnabled={true}
                deselectAllEnabled={false}
                netNodes={netNodes}
                values={values}
                disabled={disabled}
                onClose={onClose}
                onConfirm={onConfirm}/>
        );
    }

    renderAccessPointDialog(discovery) {
        console.log(discovery);
        return <AccessPointDialog
            onClose={() => hideDialogById(SECURITY_ACCESS_POINT)}
            title="About your access point"
            discovery={discovery}
            id={SECURITY_ACCESS_POINT}/>
    }

}
