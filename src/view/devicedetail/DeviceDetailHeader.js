import React, {PureComponent} from 'react';
import { DT_GENERIC, TINT_WHITE, GEN_FLAG, TINT_PRIMARY, GEN_FLAG_OUT } from '../../model/Constants';
import DeviceTypeIcon from '../../component/icons/DeviceTypeIcon';
import ActionButton, { BTN_TYPE_SOFT, BTN_TYPE_LINK } from '../../component/ActionButton';
import { DATE_FORMAT_SHORT, formatDuration, formatRelativeDate } from '../../helpers/DateHelper';
import intl from 'react-intl-universal';
import GenericIcon from '../../component/icons/GenericIcon';
import LinkCard from '../tools/LinkCard';
import HeaderSubSideAction from '../../component/header/HeaderSubSideAction';
import HeaderSubSideDetail from '../../component/header/HeaderSubSideDetail';
import HeaderRightSide from '../../component/header/HeaderRightSide';
import HeaderLeftSide from '../../component/header/HeaderLeftSide';
import Header from '../../component/header/Header';

export default class DeviceDetailHeader extends PureComponent {

    constructor(props, context) {
        super(props, context);
        this.onClearDevice = this.onClearDevice.bind(this);
        this.onEditDevice = this.onEditDevice.bind(this);
        this.onChangeImportant = this.onChangeImportant.bind(this);
        this.onClickTimeline = this.onClickTimeline.bind(this);
        this.onChangeDeviceType = this.onChangeDeviceType.bind(this);
        this.onClickManage = this.onClickManage.bind(this);
    }

    onClickTimeline(){
        if(this.props.onClickTimeline){
            this.props.onClickTimeline();
        }
    }

    onChangeImportant(){
        if(this.props.onChangeImportant){
            this.props.onChangeImportant();
        }
    }

    onClearDevice(){
        if(this.props.onClearDevice){
            this.props.onClearDevice();
        }
    }

    onEditDevice(){
        if(this.props.onEditDevice){
            this.props.onEditDevice();
        }
    }

    onChangeDeviceType(){
        if(this.props.onChangeDeviceType){
            this.props.onChangeDeviceType();
        }
    }

    onClickManage(){
        if(this.props.onClickManage){
            this.props.onClickManage();
        }
    }


    render() {
        const {netNode, activeInternetDowntimeSchedule} = this.props;
        const name = netNode && netNode.bestName ? netNode.bestName : "";
        const vendor = netNode && netNode.macVendor ? netNode.macVendor : "";
        const brand = netNode && netNode.bestMake ? netNode.bestMake : "";
        const model = netNode && netNode.bestModel ? netNode.bestModel : "";
        const osVer = netNode && netNode.osVersionName ? netNode.osVersionName : "";
        const type = netNode && netNode.bestType ? netNode.bestType : DT_GENERIC;
        const importantIcon = netNode && netNode.important ? 
            <GenericIcon type={GEN_FLAG} color={TINT_PRIMARY} size={12}/>:
            <GenericIcon type={GEN_FLAG_OUT} color={TINT_PRIMARY} size={12}/>;


        let statusChangeTime = null;
        if (netNode && netNode.stateChangeTime > 0) {
            statusChangeTime = formatRelativeDate(netNode.stateChangeTime);
        } else if (netNode && netNode.firstSeenTime > 0) {
            statusChangeTime = formatRelativeDate(netNode.firstSeenTime);
        }
        let iconOnline = "text-success";
        let iconType = "fa fa-circle fa-xs";
        let textOnline = intl.get('generic_online');
        let colorText = "";
        let manageText = intl.get('generic_manage');
        let duration = netNode.getKickOutModeDuration();

        if(netNode.isBlocked()){
            statusChangeTime = netNode.kickOutFormattedDate();
            iconOnline = "text-danger";
            iconType = "fas fa-hand-paper";
            colorText = "text-danger";
            manageText = intl.get('generic_resume');
            textOnline = intl.get('device_detail_kick_out_mode_blocked');
        } else if(netNode.isPaused()){
            if(duration){
                statusChangeTime = intl.get('device_detail_kick_out_mode_paused_ago_for',{time:netNode.kickOutFormattedDate(),duration:formatDuration(duration, DATE_FORMAT_SHORT)});
            } else {
                statusChangeTime = intl.get('device_detail_kick_out_mode_paused') + ' ' + netNode.kickOutFormattedDate();
            }
            iconOnline = "text-orange";
            iconType = "fa fa-pause";
            textOnline = intl.get('device_detail_kick_out_mode_paused_on');
        } else if (activeInternetDowntimeSchedule) {
            const startDate = new Date(0, 0, 0, activeInternetDowntimeSchedule.startHour, activeInternetDowntimeSchedule.startMin);
            const endDate = new Date(0, 0, 0, activeInternetDowntimeSchedule.endHour, activeInternetDowntimeSchedule.endMin);
            const start = startDate.toLocaleTimeString(undefined, { hour: "numeric", minute: "numeric" });
            const end = endDate.toLocaleTimeString(undefined, { hour: "numeric", minute: "numeric" });
            statusChangeTime = intl.getHTML("device_detail_internet_downtime_schedule", {
                name: activeInternetDowntimeSchedule.name,
                startTime: start,
                endTime: end
            });
            iconOnline = "text-orange";
            iconType = "fa fa-pause";
            textOnline = intl.get("device_detail_kick_out_mode_paused_on");
            manageText = intl.get("device_detail_internet_downtime_schedule_manage");
        } else if(netNode && netNode.state === 'DOWN'){
            iconOnline = "text-secondary";
            textOnline = intl.get('generic_offline');
        }

        return (
            <Header className="bg-soft-primary" classContainer="px-4">
                <HeaderLeftSide className="mr-3">
                    <div className="d-flex align-items-center justify-content-center mr-3">
                        <div className="text-center">
                            <LinkCard action={this.onChangeDeviceType}>
                                <div style={{borderRadius: "12px", backgroundColor:'#000'}} className="text-center p-3">
                                    <DeviceTypeIcon size={36} type={type} tint={TINT_WHITE}/>
                                </div>
                            </LinkCard>
                            

                            <ActionButton title={intl.get("generic_change")} action={this.onChangeDeviceType} type={BTN_TYPE_LINK}/>
                        </div>
                    </div>
                </HeaderLeftSide>
                
                <HeaderRightSide dividerColor="border-secondary-dark" className="py-2">
                    <HeaderSubSideDetail>
                        <div className="ml-3">
                            <h2 className={"mb-0 " + (name ? "text-dark" : "text-secondary")}>{name || intl.get('generic_no_name')}</h2>
                            {!brand && !model && !osVer && !vendor ?
                                <p className="mb-0 text-dark">{intl.get('model_not_recognized')}</p> :
                                <div className="list-inline list-separator mb-2 text-dark">
                                    {brand && model ? <p className="list-inline-item mb-0">{brand} {model}</p> :
                                        brand ? <p className="list-inline-item mb-0">{brand}</p> :
                                        vendor ? <p className="list-inline-item mb-0">{vendor}</p> : ""
                                    }
                                    {osVer && <p className="list-inline-item mb-0">{osVer}</p>}
                                </div>
                            }
                        </div>
                        <div className="ml-3 text-lg-right">
                            <span>
                                <i className={"d-sm-none d-md-none d-lg-inline-block " + iconType + " mr-2 " + iconOnline}></i>
                                <h3 className={"mb-0 d-inline-block " + colorText}>{textOnline}</h3>
                                <i className={"d-lg-none " + iconType + " ml-2 " + iconOnline}></i>
                            </span>
                            <div className="list-inline list-separator mb-2">
                                <p className="list-inline-item mb-0 text-dark">{statusChangeTime}</p>
                                {(netNode.isPaused() || netNode.isBlocked() || activeInternetDowntimeSchedule) && 
                                    <a onClick={this.onClickManage} className="text-primary list-inline-item mb-0 h4 pointer">
                                        {manageText}
                                    </a>}
                            </div>
                        </div>
                    </HeaderSubSideDetail>
                    <HeaderSubSideAction className="pb-2">
                        <div>
                            <ActionButton 
                                className="mr-2 mt-2"
                                action={this.onChangeImportant}
                                title={<div className="d-flex align-items-center justify-content-start ml-1">
                                    <span className="mr-2">{importantIcon}</span>{intl.get('generic_important')}
                                </div>}
                                type={BTN_TYPE_LINK}/>
                            <ActionButton 
                                icon={"fa-edit"}
                                className="mr-2 mt-2"
                                action={this.onEditDevice}
                                title={intl.get('device_detail_edit_action')}
                                type={BTN_TYPE_LINK}/>
                        </div>
                        <div>
                            <ActionButton 
                                icon="fa-trash"
                                className="ml-2 mt-2"
                                action={this.onClearDevice}
                                title={intl.get('device_detail_clear_action')}
                                type={BTN_TYPE_SOFT}/>
                            <ActionButton 
                                action={this.onClickTimeline}
                                icon="fa-history"
                                className="ml-2 mt-2"
                                title={intl.get('view_timeline_button')}/>
                        </div>
                    </HeaderSubSideAction>
                </HeaderRightSide>
            </Header>
                    
        )
    }
}