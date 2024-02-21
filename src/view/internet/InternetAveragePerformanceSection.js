/**
 * Created by marco on 3/22/21.
 *
 * (C) Copyright Fing
 */

import React, {PureComponent} from 'react';
import intl from "react-intl-universal";
import PropTypes from 'prop-types';

import GenericIcon from '../../component/icons/GenericIcon';
import {
    GEN_TREND_DOWN,
    GEN_TREND_FLAT,
    GEN_TREND_UP,
    TINT_DARK,
} from '../../model/Constants';
import {getCountryName} from "../../helpers/GeoCountriesHelper";
import SegmentedBar from '../../component/SegmentedBar';
import DailySpeedHistoryChart from './DailySpeedHistoryChart';
import {convertSamplesToDailySamples} from './InternetPerformanceLogic';
import {formatSpeed, formatTrend} from '../../helpers/NetworkHelper';
import MetricHorizontalCard from "../../component/MetricHorizontalCard";
import { daysDifferenceBetween } from '../../helpers/DateHelper';
import { createMockChartSamples } from '../../mock/generators/InternetSamplesGenerator';


const exampleStartDateOneWeek = new Date(1639150913973);
const exampleEndDateOneWeek = new Date(1639755713973);
// Why PureComponent??
// https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization
    
export default class InternetAveragePerformanceSection extends PureComponent {

    constructor(props, context) {
        super(props, context);
        this.state = { 
            selectedIndex: 0 
        }
        this.onIntervalDurationSelected = this.onIntervalDurationSelected.bind(this);
    }
    onIntervalDurationSelected(days) {
        if (this.props.onIntervalDurationSelected) {
            this.props.onIntervalDurationSelected(days);
        }
    }
    mapIntervals(interval){
        const difference = (Number(interval.endTime) - Number(interval.startTime));
        const days = difference / 1000 / 60 / 60 / 24;
        return {
            days: days,
            label: intl.get('duration_day_long', {amount: days})
        }
    }
    // --------------------------------------------------------------------------------------------------------------
    // RENDERING
    // --------------------------------------------------------------------------------------------------------------

    render() {
        const {istAnalysis, maxIntervalDuration} = this.props;
        const {selectedIndex} = this.state;
        const intervals = istAnalysis.trends ? istAnalysis.trends : [];
        if (intervals.length === 0) {
            return this.renderSampleChartSection();
        }
        const segmentItems = intervals.map(interval => this.mapIntervals(interval));
        const showExampleData = maxIntervalDuration > 0 && segmentItems[selectedIndex].days > maxIntervalDuration;
        let currentInterval = intervals[selectedIndex];
        let daySamples = convertSamplesToDailySamples(istAnalysis.samples);
        
        const startDate = new Date(Number(currentInterval.startTime));
        const endDate = new Date(Number(currentInterval.endTime));
        
        const onItemSelected = (idx) => {
            this.onIntervalDurationSelected(segmentItems[idx].days);
            this.setState({selectedIndex: idx})
        };

        return (
            <section>
                <div className="d-flex align-items-start">
                    {this.renderTitle(startDate,endDate,daySamples)}
                    <span className="ml-auto d-block">
                        <SegmentedBar activeIndex={selectedIndex}
                                      items={segmentItems}
                                      onItemSelected={onItemSelected}/>
                    </span>
                </div>
                {this.renderMetricHorizontalCards(currentInterval,showExampleData)}
                {showExampleData ? this.renderExampleChart(startDate,endDate) : this.renderDailySpeedHistoryChart(daySamples,startDate,endDate)}
            </section>
        );
    }
    renderTitle(startDate,endDate,daySamples){
        const durationInDays = daysDifferenceBetween(startDate,endDate)
        const serverLocationsText = this.renderServerLocationsText(daySamples);
        return (
            <div>
                <h3 className="mb-0">{intl.get('internet_average_title', {amount: durationInDays})}</h3>
                <p className="mb-0">
                    {serverLocationsText ? 
                        intl.get('internet_test_server_location', {location: serverLocationsText}) :
                        intl.get('internet_location_not_available')}
                </p>
            </div>
        )
    }
    renderMetricHorizontalCards(currentInterval,shouldShowExample){
        const hasAverageData = currentInterval.avgDownloadBps && currentInterval.avgUploadBps &&
            Number(currentInterval.avgDownloadBps) > 0 && Number(currentInterval.avgUploadBps) > 0;
        
        if(hasAverageData){
            const download = {};
            const upload = {};
            if(currentInterval.avgDownloadBps) {
                download.downloadValue = formatSpeed(Number(currentInterval.avgDownloadBps));
            }
            if (currentInterval.trendDownload) {
                download.trendDownload = formatTrend(Number(currentInterval.trendDownload));
                download.trendDownloadIcon = this.renderTrendIcon(Number(currentInterval.trendDownload));
            }
            if(currentInterval.avgUploadBps) {
                upload.uploadValue = formatSpeed(Number(currentInterval.avgUploadBps));
            }
            if (currentInterval.trendUpload) {
                upload.trendUpload = formatTrend(Number(currentInterval.trendUpload));
                upload.trendUploadIcon = this.renderTrendIcon(Number(currentInterval.trendUpload));
            }
            return (
                <div className="text-center">
                    <div className="d-flex justify-content-center" style={{opacity: shouldShowExample ? "0.3" : "1.0"}}>
                        <MetricHorizontalCard title={intl.get('speedtest_download')}
                                              className="px-3 py-2 m-3"
                                              value={download.downloadValue}
                                              extra={download.trendDownload}
                                              extraIcon={download.trendDownloadIcon}
                                              measure={intl.get('#_mbps')}/>
                        <MetricHorizontalCard title={intl.get('speedtest_upload')}
                                              className="px-3 py-2 m-3"
                                              value={upload.uploadValue}
                                              extra={upload.trendUpload}
                                              extraIcon={upload.trendUploadIcon}
                                              measure={intl.get('#_mbps')}/>
                    </div>
                </div>
            )
        }
        return ''
    }
    renderExampleChart(startDate,endDate){
        const chartData = createMockChartSamples(startDate,endDate);
        return (
            <div className="d-block">
                <div className="w-100" style={{opacity: "0.3"}}>
                    <h1 className="position-absolute mt-5 w-100 text-center">{intl.get('generic_example')}</h1>
                    <DailySpeedHistoryChart 
                        exampleData={chartData}
                        tooltip={false}
                        height={300}/>
                </div>
            </div>
        );
    }
    renderDailySpeedHistoryChart(chartSamples,startDate,endDate){
        return <DailySpeedHistoryChart 
                    daySamples={chartSamples}
                    startDate={startDate}
                    endDate={endDate}
                    tooltip={true}
                    height={300}/>;
    }
    renderSampleChartSection() {
        const chartData = createMockChartSamples(exampleStartDateOneWeek,exampleEndDateOneWeek);

        return (
            <section>
                <div className="d-flex align-items-start">
                    <div>
                        <h3 className="mb-0">{intl.get('internet_average_title', {amount: 7})}</h3>
                        <p className="mb-0">{intl.get('internet_no_data_period_example')}</p>
                    </div>
                </div>
                <div className="d-block">
                    <div className="w-100" style={{opacity: "0.3"}}>
                        <h1 className="position-absolute mt-5 right-50">{intl.get('generic_example')}</h1>
                        <DailySpeedHistoryChart exampleData={chartData}
                                                tooltip={false}
                                                height={300}/>
                    </div>
                </div>
            </section>
        );
    }
    renderTrendIcon(outlier) {
        outlier = (outlier * 100).toFixed(0)
        let icon = GEN_TREND_FLAT;
        if (outlier < 0) {
            icon = GEN_TREND_DOWN;
        } else if (outlier > 0) {
            icon = GEN_TREND_UP;
        }
        return <GenericIcon type={icon} color={TINT_DARK} size={12}/>
    }
    renderServerLocationsText(daySamples) {
        const istAnalysis = this.props.istAnalysis;
        let servers = istAnalysis && istAnalysis.servers ?
            istAnalysis.servers.filter(val => Number(val.transferredBytes) > 0) : [];
        let serverLocations = [];
        for (let samples of daySamples) {
            for (let idx of samples.getLocationIndexes()) {
                if(servers[idx]){
                    const serverLocation = servers[idx].serverCity + ', ' + getCountryName(servers[idx].serverCountry);
                    if (!serverLocations.includes(serverLocation)) {
                        serverLocations.push(serverLocation)
                    }
                }
            }
        }
        let location = '';
        if (serverLocations.length > 0) {
            location = serverLocations[0];
            if (serverLocations.length > 1) {
                location += " (+" + (serverLocations.length - 1) + ")";
            }
        }
        return location;
    }
}

InternetAveragePerformanceSection.propTypes = {
    istAnalysis: PropTypes.any,
    maxIntervalDuration: PropTypes.number,
    onIntervalDurationSelected: PropTypes.func
};