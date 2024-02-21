import React, {Component} from "react";
import PropTypes from 'prop-types';
import intl from 'react-intl-universal';

import NavigationBar from "../component/NavigationBar";
import ActionButton, {
    BTN_TINT_DARK,
    BTN_TYPE_GHOST,
    BTN_TYPE_DEFAULT,
    BTN_TINT_PRIMARY, BTN_SIZE_BIG
} from '../component/ActionButton';
import ToolHeader from "../component/ToolHeader";
import StatusIcon, {SI_SHAPE_CIRCLE, SI_STATUS_ERROR} from "../component/icons/StatusIcon";
import GenericIcon from '../component/icons/GenericIcon';
import NetworkTypeIcon from "../component/icons/NetworkTypeIcon";
import EmptyState from "../component/EmptyState";

import MockSidebar from "./MockSidebar";
import {
    convertToSpeedTestResult,
    SpeedTestResult
} from '../view/speedtest/SpeedTestLogic';

import { GEN_LOCATION, TINT_DARK } from '../model/Constants';

import SpeedTestData from './data/DataSpeedTest.json';
import SpeedTestIspCard from "../view/speedtest/SpeedTestIspCard";
import SpeedTestPerformance from "../view/speedtest/SpeedTestPerformance";
import SpeedTestAchievementTable from "../view/speedtest/SpeedTestAchievementTable";
import SpeedTestStats from "../view/speedtest/SpeedTestStats";
import SpeedTestDonuts from "../view/speedtest/SpeedTestDonuts";
import FailureImg from '../assets/svg/storyset/no-results-negative.svg';
import RatingComment from '../model/RatingComment';

export default class MockSpeedTestPage extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            item: new SpeedTestResult(),
            index: 0,
        }
    }
    refresh(){
        this.setState({ index: 0 });
        let intervalId = setInterval(()=>{
            this.setState({ index: this.state.index + 1 })
            if(this.state.index === SpeedTestData.length){
                clearInterval(this.state.intervalId)
            } else{
                this.setState({
                    item:convertToSpeedTestResult(SpeedTestData[this.state.index]),
                })
            }
        }, 125)
        this.setState({ intervalId: intervalId })
    }

    componentDidMount() {
        this.refresh()
    }

    // -------------------------------------------------------------------------------------------------------------
    
    render() {
        return (
            <>
                <MockSidebar active="HOME" />
                {this.renderHeader()}
                {this.renderMain()}
            </>
        );
    }

    renderHeader() {
        return <header id="header" className="header header-sticky-top bg-white container-fluid p-2 app-header">
            <NavigationBar
                left={<ActionButton route="/" title="Home" icon='fa-arrow-left'
                                    type={BTN_TYPE_GHOST} tint={BTN_TINT_DARK} rounded={true}/>}
                right={(this.state.item.isFailedState() || this.state.item.isCompletedState()) &&
                <ActionButton
                    title={intl.get("generic_refresh")}
                    action={()=>{this.refresh()}}
                    type={BTN_TYPE_DEFAULT}
                    tint={BTN_TINT_PRIMARY}
                    rounded={true}/>}
                title={"A mock for speed test"}
            />
        </header>
    }

    renderMain() {
        return <main className="app-main">
            <div className="container-fluid space-2 px-6">
                <div className="row">
                    <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 mb-sm-4 mb-md-4">
                        {this.renderTitle()}
                        {this.renderSpeedTest()}
                        {this.renderStats()}
                        {this.renderAchievements()}
                    </div>
                    <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12">
                        {this.renderIspCard()}
                    </div>
                </div>
                {this.renderFailed()}
            </div>
            {this.renderPerformance()}
        </main>
    }

    renderTitle() {
        return <ToolHeader  title={intl.get('speedtest_title')}
                            subtitle={this.renderSubtitle()}
                            statusIcon={this.state.item.isFailedState() && 
                                            <StatusIcon shape={SI_SHAPE_CIRCLE} status={SI_STATUS_ERROR}/>}/>
    }
    renderSubtitle(){
        return  <ul className="list-inline mb-0">
                    {this.state.item.getLocationServer() && 
                    <li className="list-inline-item d-inline-flex align-items-center">
                        <GenericIcon color={TINT_DARK} size={16} type={GEN_LOCATION} className={"mr-1"} />
                        {this.state.item.getLocationServer()}
                    </li>}
                    {this.state.item.getNetName() && 
                    <li className="list-inline-item d-inline-flex align-items-center">
                        <NetworkTypeIcon size={16} type={this.state.item.getTypeConnection()} className={"mr-1"}/>
                        {this.state.item.getNetName()}
                    </li>}
                </ul>
    }

    renderIspCard(){
        return !this.state.item.isFailedState() && 
            <SpeedTestIspCard   result={this.state.item} 
                                onSupportIconClicked={this.props.onSupportIconClicked}
                                onSaveRating={this.props.onSaveRating}
                                onClickWebsite={this.props.onClickWebsite}
                                rate={new RatingComment()}/>;
    }

    renderPerformance(){
        return !this.state.item.isFailedState() && 
            <SpeedTestPerformance result={this.state.item}/>;
    }

    renderAchievements(){
        return this.state.item.isCompletedState() &&
            <SpeedTestAchievementTable result={this.state.item}/>;
    }

    renderStats(){
        return !this.state.item.isFailedState() && 
            <SpeedTestStats result={this.state.item}/>;
    }

    renderSpeedTest(){
        return !this.state.item.isFailedState() && 
            <SpeedTestDonuts result={this.state.item}/>
   
    }

    renderFailed(){
        return this.state.item.isFailedState() &&
            <EmptyState className="my-8 w-60 mx-auto"
                        image={FailureImg}
                        caption={intl.get("speedtest_failed")}
                        title={intl.get("speedtest_failed")}
                        subtitle={intl.get("speedtest_try_again")}
                        action={<ActionButton size={BTN_SIZE_BIG} title={intl.get("speedtest_start_button")}
                                                action={()=>{this.refresh()}} />} />
    }
}

MockSpeedTestPage.propTypes = {
    onSupportIconClicked: PropTypes.func,
    onClickWebsite: PropTypes.func,
    onSaveRating: PropTypes.func,
    ratingComment: PropTypes.object
};

