import React, {Component} from "react";
import intl from "react-intl-universal";

import DataIstAnalysis from "./data/DataIstAnalysis.json";
import DiscoveryStateData from "./data/DataDiscoveryState.json";

import ActionButton, {
    BTN_TINT_PRIMARY,
    BTN_SIZE_BIG,
    BTN_TYPE_SOFT,
    BTN_TYPE_DEFAULT,
} from '../component/ActionButton';
import EmptyState from "../component/EmptyState";

import ScheduleHoursDialog from '../component/ScheduleHoursDialog';

import {hideDialogById, showDialogById} from "../component/ModalDialog";

import DropdownButton from "../component/DropdownButton";

import InternetScoreSection from "../view/internet/InternetScoreSection";
import InternetAveragePerformanceSection
    from '../view/internet/InternetAveragePerformanceSection';
import InternetTrendSection from "../view/internet/InternetTrendSection";
import InternetLastSpeedTestSection from '../view/internet/InternetLastSpeedTestSection';
import InternetSetupSection from '../view/internet/InternetSetupSection';
import RatingComment from '../model/RatingComment';

import ScheduledNoResult from '../assets/svg/storyset/scheduled-no-results.svg';
import NoResult from '../assets/svg/storyset/no-results.svg';

const SCHEDULE_HOURS_DIALOG = 'SCHEDULE_HOURS_DIALOG'
const MAX_NUM_HOURS = 3
const MIN_SAMPLES = 10
export default class MockInternetPage extends Component {

    
    constructor(props, context) {
        super(props, context);
        this.state = {
            discovery: DiscoveryStateData.discovery,
            istAnalysis: DataIstAnalysis.result,
            hours: [],
            ratingComment: new RatingComment(3,'Ciao')
        }
    }

    onSaveNewScheduledHours(values) {
        if (values) {
            this.setState({hours: values});
        }
        hideDialogById(SCHEDULE_HOURS_DIALOG);
    }

    render(){
        const internetInfo = this.state.discovery && this.state.discovery.internetinfo ?
            this.state.discovery.internetinfo : null;
        const lastSpeedTestResult = this.state.discovery && this.state.discovery.lastinternetspeedtest ?
            this.state.discovery.lastinternetspeedtest : null;
        const internetSamples = this.state.istAnalysis && this.state.istAnalysis.samples ?
            this.state.istAnalysis.samples : null;
        if(!internetInfo && !lastSpeedTestResult && !internetSamples){
            return (
                <EmptyState 
                        className="my-8 w-60 mx-auto"
                        image={NoResult}
                        title={intl.get('generic_data_not_available')}/>
            )
        }
        if(!internetSamples || internetSamples.length < MIN_SAMPLES){
            const action = <ActionButton    size={BTN_SIZE_BIG} 
                                            icon={'fa-calendar'}
                                            title={intl.get('internet_schedule')}
                                            action={() => showDialogById(SCHEDULE_HOURS_DIALOG)} />
            return (
                <>
                    <EmptyState 
                        className="my-8 w-60 mx-auto"
                        image={ScheduledNoResult}
                        title={'Not enough data'}
                        action={action} />
                    {this.renderScheduleDialog()}
                </>
            )
        }
        return (
            <>
                {this.renderScoreSection(internetInfo)}
                {this.renderInternetAveragePerformance()}
                {this.renderSecondaryActions()}
                {this.renderAboutSection(internetInfo,lastSpeedTestResult)}
                {this.renderSetupSection(internetInfo)}
                {this.renderScheduleDialog()}
            </>
        );
    }
    renderScoreSection(internetInfo){
        if(internetInfo){
            return (
                <>
                    <InternetScoreSection internetInfo={internetInfo} istAnalysis={this.state.istAnalysis}/>
                    {this.renderMainActions()}
                    <hr className="my-4"/>
                </>
            )
        }
        return '';
        
    }
    renderMainActions(){
        return (
            <div className="d-flex">
                <ActionButton className={"mr-2"}
                                title={intl.get('internet_test_speed')}
                                route={"/mock/speed_test"}
                                type={BTN_TYPE_DEFAULT}
                                tint={BTN_TINT_PRIMARY}/>
                <ActionButton className={"mr-0"}
                                title={intl.get('internet_scoreboard')}
                                icon={"fa-trophy"}
                                route={"/mock/internet/scoreboard"}
                                type={BTN_TYPE_SOFT}
                                tint={BTN_TINT_PRIMARY}/>
            </div>
        )
    }
    renderInternetAveragePerformance(){
        return (
            <InternetAveragePerformanceSection
                istAnalysis={this.state.istAnalysis}
                maxIntervalDuration={7}
                onIntervalDurationSelected={days => {
                    if (days > 7)
                        window.alert(intl.get('premium_feature', {feature: days}));
                }}
            />
        )
    }
    renderSecondaryActions(){
        return(
            <div className="d-flex">
                <ActionButton className={"mr-2"}
                            icon={"fa-clock"}
                            title={intl.get('internet_timeline')}
                            route={"/mock/internet/history"}
                            type={BTN_TYPE_SOFT}
                            tint={BTN_TINT_PRIMARY}/>
                <ActionButton className={"mr-2"}
                            icon={'fa-calendar'}
                            title={intl.get('internet_schedule')}
                            action={() => showDialogById(SCHEDULE_HOURS_DIALOG)}
                            type={BTN_TYPE_SOFT}
                            tint={BTN_TINT_PRIMARY}/>
                <DropdownButton title={intl.get('internet_report')}
                                icon="fa-file-export"
                                type={BTN_TYPE_SOFT}
                                onItemSelected={() => null}>
                    <span>{intl.get('this_month')}</span>
                    <span>{intl.get('last_month')}</span>
                </DropdownButton>
            </div>
        );
    }
    renderAboutSection(internetInfo,lastSpeedTestResult){
        return (
            <div className="bg-light my-4 rounded">
                <div className="p-4">
                    <h3>{intl.get('internet_about')}</h3>
                    <div className="row">
                        <div className="col-lg-12 col-xl-6">
                            <div className="card card-bordered shadow-none h-100">
                                <div className="card-body">
                                    <InternetTrendSection internetInfo={internetInfo}
                                                          ratingComment={this.state.ratingComment}
                                                          onSaveRating={(ratingResult) => null}
                                                          onClickImageProvider={(ispInfo) => console.log(ispInfo)}
                                                          onClickDetails={(ispInfo) => console.log(ispInfo)}/>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-12 col-xl-6 mt-xl-0 mt-4">
                            <div className="card card-bordered shadow-none h-100">
                                <div className="card-body">
                                    <InternetLastSpeedTestSection speedTestResult={lastSpeedTestResult}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    renderSetupSection(internetInfo){
        if (!internetInfo) return '';
        return (
            <section>
                <InternetSetupSection discovery={this.state.discovery} info={internetInfo}/>
            </section>
        );
    }
    renderScheduleDialog() {
        return <ScheduleHoursDialog id={SCHEDULE_HOURS_DIALOG}
                                    max={MAX_NUM_HOURS}
                                    values={this.state.hours}
                                    onConfirmDialog={(values)=>this.onSaveNewScheduledHours(values)}
                                    onCloseDialog={()=>hideDialogById(SCHEDULE_HOURS_DIALOG)}/>
    }
}
