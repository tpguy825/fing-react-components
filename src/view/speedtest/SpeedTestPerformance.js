import React, {Component} from 'react';
import SpeedTestSentimentDistribution from './SpeedTestSentimentDistribution';
import intl from 'react-intl-universal';
import SegmentedBar from "../../component/SegmentedBar";
import ComparisonChart, {ComparisonChartItem} from "../../component/charts/ComparisonChart";
import PropTypes from 'prop-types';
import { rankStringWithLocation } from '../../helpers/NetworkHelper';

export default class SpeedTestPerformance extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedIndex: 0,
        }
    }
    

    isCitySelected() {
        return this.state.selectedIndex === 0;
    }

    isCountrySelected() {
        return this.state.selectedIndex === 1;
    }

    render() {
        const {result} = this.props;

        const onItemSelected = (index) => {
            this.setState({selectedIndex: index})
        };
        const items = []
        if( !result.areStatsCityEmpty() && 
            (result.isSentimentDistributionCityAvailable() || 
            result.isCompareCityAvailable())) items.push({label: result.getCity()})
        if( !result.areStatsCountryEmpty() && 
            (result.isSentimentDistributionCountryAvailable() || 
            result.isCompareCountryAvailable())) items.push({label: result.getCountry()})

        
        return result.isCompletedState()  && items.length > 0 ? (
            <div className="container-fluid bg-light p-6">
                <div className="d-flex justify-content-between align-items-center mb-6">
                    <h3 className="mb-0">{intl.get('speedtest_compare_performance')}</h3>
                    <span className="ml-auto">
                        <SegmentedBar activeIndex={this.state.selectedIndex} items={items} onItemSelected={onItemSelected}/>
                    </span>
                </div>
                <div className="row">
                
                    <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 mb-xl-0 mb-4">
                        <div className="card card-bordered h-100">
                            <div className="card-body">
                                {this.renderComparisonChart(result)}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 mb-xl-0 mb-4">
                        <div className="card card-bordered h-100">
                            <div className="card-body">
                                {this.renderSentimentDistribution(result)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : '';
    }

    renderSentimentDistribution(result){
        if( (this.isCountrySelected() && !result.isSentimentDistributionCountryAvailable()) || 
            (this.isCitySelected() && !result.isSentimentDistributionCityAvailable()) ||
            (result.areStatsCityEmpty() && !result.isSentimentDistributionCountryAvailable()) ||
            (result.areStatsCountryEmpty() && !result.isSentimentDistributionCityAvailable())){
            return  (
                <p className="d-flex h-100 align-items-center justify-content-center">
                    {intl.get('speedtest_distribution_not_available',{isp:result.getName()})}
                </p>
            );
        }
        if(result.areStatsCityEmpty()) {
            return <SpeedTestSentimentDistribution
                    distribution={result.getSentimentDistributionCountry()}
                    value={result.getSentimentScoreCountry()}
                    total={result.getTotalRatingsCountry()}/>
        }
        if(result.areStatsCountryEmpty()) {
            return <SpeedTestSentimentDistribution
                    distribution={result.getSentimentDistributionCity()}
                    value={result.getSentimentScoreCity()}
                    total={result.getTotalRatingsCity()}/>
        }
        return  <SpeedTestSentimentDistribution
                    distribution={this.isCountrySelected() ?
                        result.getSentimentDistributionCountry() :
                        result.getSentimentDistributionCity()}
                    value={this.isCountrySelected() ?
                        result.getSentimentScoreCountry() :
                        result.getSentimentScoreCity()}
                    total={this.isCountrySelected() ?
                        result.getTotalRatingsCountry() :
                        result.getTotalRatingsCity()}/> 
                
    }

    renderComparisonChart(result) {
        if( (this.isCountrySelected() && !result.isCompareCountryAvailable()) || 
            (this.isCitySelected() && !result.isCompareCityAvailable())){
            return  (
                <p className="d-flex h-100 align-items-center justify-content-center">
                    {intl.get('speedtest_comparison_not_available',{isp:result.getName()})}
                </p>
            );

        }
        const formatSpeed = (dw, up) => intl.get('format_speed',{dw:dw,up:up});

        const speedTestScore = this.isCitySelected() ? result.getScoreCity() : result.getScoreCountry();
        const topItem = new ComparisonChartItem();
        topItem.title = intl.get("speedtest_title");
        topItem.subtitle = formatSpeed(result.getDownloadValue(), result.getUploadValue());
        topItem.extra = rankStringWithLocation(speedTestScore,this.isCitySelected() ? result.getCity() : result.getCountry());
        topItem.value = speedTestScore;

        const bottomItem = new ComparisonChartItem();
        if(result.areStatsCityEmpty()) {
            bottomItem.title = intl.get('speedtest_compare_location', {
                isp: result.getName(),
                location: result.getCountry()
            })
            bottomItem.subtitle = formatSpeed(result.getDownloadCountry(), result.getUploadCountry());
            bottomItem.extra = intl.get('speedtest_tested', {tests: result.getSamplesCountry()});
            bottomItem.value = result.getScoreIspCountry();
            return (
                <ComparisonChart height={200}
                                 topItem={topItem}
                                 bottomItem={bottomItem}/>
            );
        }
        if(result.areStatsCountryEmpty()) {
            bottomItem.title = intl.get('speedtest_compare_location', {
                isp: result.getName(),
                location: result.getCity()
            })
            bottomItem.subtitle = formatSpeed(result.getDownloadCity(), result.getUploadCity())
            bottomItem.extra = intl.get('speedtest_tested', {tests: result.getSamplesCity()});
            bottomItem.value = result.getScoreIspCity();
            return (
                <ComparisonChart height={200}
                                 topItem={topItem}
                                 bottomItem={bottomItem}/>
            );
    
        }
        bottomItem.title = intl.get('speedtest_compare_location', {
            isp: result.getName(),
            location: this.isCitySelected() ? result.getCity() : result.getCountry()
        })
        bottomItem.subtitle = this.isCitySelected() ?
            formatSpeed(result.getDownloadCity(), result.getUploadCity()) :
            formatSpeed(result.getDownloadCountry(), result.getUploadCountry());
        bottomItem.extra = intl.get('speedtest_tested', {tests:
                this.isCitySelected() ? result.getSamplesCity() : result.getSamplesCountry()});
        bottomItem.value = this.isCitySelected() ? result.getScoreIspCity() : result.getScoreIspCountry();

        return (
            <ComparisonChart height={200}
                             topItem={topItem}
                             bottomItem={bottomItem}/>
        );
    }
}
SpeedTestPerformance.propTypes = {
    result: PropTypes.object
};
