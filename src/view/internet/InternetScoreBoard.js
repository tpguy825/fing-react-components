import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SegmentedBar from '../../component/SegmentedBar';
import RatingBar, {RB_SMALL} from '../../component/RatingBar';
import {TINT_WARNING, TINT_SECONDARY} from '../../model/Constants';
import {RTI_HEART, RTI_STAR} from '../../component/icons/RatingTypeIcon';
import intl from "react-intl-universal";
import {getCountryName} from "../../helpers/GeoCountriesHelper";
import {convertSamplesToDailySamples} from './InternetPerformanceLogic';
import {formatSpeed} from "../../helpers/NetworkHelper";
import { daysDifferenceFromNow } from '../../helpers/DateHelper';
import Badge, { BADGE_TINT_PRIMARY } from '../../component/Badge';

const SORT_BY_NAME_ASC = 'SORT_BY_NAME_ASC';
const SORT_BY_NAME_DESC = 'SORT_BY_NAME_DESC';
const SORT_BY_DOWNLOAD_ASC = 'SORT_BY_DOWNLOAD_ASC';
const SORT_BY_DOWNLOAD_DESC = 'SORT_BY_DOWNLOAD_DESC';
const SORT_BY_UPLOAD_ASC = 'SORT_BY_UPLOAD_ASC';
const SORT_BY_UPLOAD_DESC = 'SORT_BY_UPLOAD_DESC';
const SORT_BY_PERFORMANCE_SCORE_ASC = 'SORT_BY_PERFORMANCE_SCORE_ASC';
const SORT_BY_PERFORMANCE_SCORE_DESC = 'SORT_BY_PERFORMANCE_SCORE_DESC';
const SORT_BY_SAMPLES_ASC = 'SORT_BY_SAMPLES_ASC';
const SORT_BY_SAMPLES_DESC = 'SORT_BY_SAMPLES_DESC';
const SORT_BY_SENTIMENT_SCORE_ASC = 'SORT_BY_SENTIMENT_SCORE_ASC';
const SORT_BY_SENTIMENT_SCORE_DESC = 'SORT_BY_SENTIMENT_SCORE_DESC';
const SORT_BY_RATINGS_DESC = 'SORT_BY_RATINGS_DESC';
const SORT_BY_RATINGS_ASC = 'SORT_BY_RATINGS_ASC';

const YOUR_NETWORK_ISP_ID = "YOUR_NETWORK";

export default class InternetScoreBoard extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedIndexLocation: 0,
            selectedOrderType: SORT_BY_PERFORMANCE_SCORE_DESC,
        }
        this.onClickName = this.onClickName.bind(this);
        this.updateTableData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.istAnalysis !== this.props.istAnalysis) {
            this.updateTableData();
        }
    }

    updateTableData() {
        const istAnalysis = this.props.istAnalysis;
        let myNetworkSampleCount = 0;
        if (istAnalysis && istAnalysis.samples) {
            const daySamples = convertSamplesToDailySamples(istAnalysis.samples);
            const oneWeekAgo = daysDifferenceFromNow(7);
            myNetworkSampleCount = daySamples
                .filter(daySample => daySample.samples && daySample.samples[0].timestamp >= oneWeekAgo)
                .map(daySample => daySample.samples.length)
                .reduce((value, acc) => acc + value, 0);
        }

        if (istAnalysis.weekAvgDownloadBps > 0 && istAnalysis.weekAvgUploadBps > 0) {
            const prototype = {
                ispId: YOUR_NETWORK_ISP_ID,
                downloadSpeedMbpsAvg: formatSpeed(Number(istAnalysis.weekAvgDownloadBps)),
                uploadSpeedMbpsAvg: formatSpeed(Number(istAnalysis.weekAvgUploadBps)),
                isp: istAnalysis.statsIsp.isp,
                samples: myNetworkSampleCount || 0,
                score: 0,
                sentiment: 0,
                totalRatings: 0
            }

            this.yourNetworkStatsInCity = Object.assign({}, prototype);
            this.yourNetworkStatsInCity.score = istAnalysis.scoreInCity;
            this.yourNetworkStatsInCountry = Object.assign({}, prototype);
            this.yourNetworkStatsInCountry.score = istAnalysis.scoreInCountry;
        } else {
            this.yourNetworkStatsInCity = null;
            this.yourNetworkStatsInCountry = null;
        }
    }

    // --------------------------------------------------------------------------------------------------------------
    // RENDERING
    // --------------------------------------------------------------------------------------------------------------

    getNumberTotalCluster(num) {
        if (num > 1000)
            return Math.round(num / 1000) + "k+";
        if (num > 100)
            return Math.round(num / 100) * 100 + "+";
        if (num > 10)
            return Math.round(num / 10) * 10 + "+";
        return num;
    }

    onClickName(isp,badgeVisible) {
        if (this.props.onClickName && !badgeVisible) {
            this.props.onClickName(isp)
        }
    }

    sortIsps(values) {
        const sortStringByParam = (a, b, param) => a[param] < b[param] ? -1 : ((a[param] > b[param]) ? 1 : 0);
        const sortOn = (values, param) => values.sort((a, b) => Number(b[param]) - Number(a[param]))
        switch (this.state.selectedOrderType) {
            case SORT_BY_NAME_ASC:
                values = values.sort((a, b) => sortStringByParam(a,b,'isp'));
                break;
            case SORT_BY_NAME_DESC:
                values = values.sort((a, b) => sortStringByParam(a,b,'isp')).reverse();
                break;
            case SORT_BY_DOWNLOAD_ASC:
                values = sortOn(values, 'downloadSpeedMbpsAvg').reverse()
                break;
            case SORT_BY_DOWNLOAD_DESC:
                values = sortOn(values, 'downloadSpeedMbpsAvg')
                break;
            case SORT_BY_UPLOAD_ASC:
                values = sortOn(values, 'uploadSpeedMbpsAvg').reverse()
                break;
            case SORT_BY_UPLOAD_DESC:
                values = sortOn(values, 'uploadSpeedMbpsAvg')
                break;
            case SORT_BY_PERFORMANCE_SCORE_ASC:
                values = sortOn(values, 'score').reverse()
                break;
            case SORT_BY_PERFORMANCE_SCORE_DESC:
                values = sortOn(values, 'score')
                break;
            case SORT_BY_RATINGS_ASC:
                values = sortOn(values, 'totalRatings').reverse()
                break;
            case SORT_BY_RATINGS_DESC:
                values = sortOn(values, 'totalRatings')
                break;
            case SORT_BY_SENTIMENT_SCORE_ASC:
                values = sortOn(values, 'sentiment').reverse()
                break;
            case SORT_BY_SENTIMENT_SCORE_DESC:
                values = sortOn(values, 'sentiment')
                break;
            case SORT_BY_SAMPLES_ASC:
                values = sortOn(values, 'samples').reverse()
                break;
            case SORT_BY_SAMPLES_DESC:
                values = sortOn(values, 'samples')
                break;
            default:
                return values;
        }
        return values;
    }

    render() {
        let istAnalysis = this.props.istAnalysis;
        const isCitySelected = this.state.selectedIndexLocation === 0;
        let data = [];
        if(isCitySelected && istAnalysis.statsCity){
            data = istAnalysis.statsCity;
        } else if(!isCitySelected && istAnalysis.statsCountry){
            data = istAnalysis.statsCountry;
        }
        
        if (data.length === 0) {
            return (
                <>
                    {this.props.emptyState}
                </>
            )
        }
        if(data.length > 0){
            data.slice();
        }

        
        if (isCitySelected && this.yourNetworkStatsInCity){
            if(data.filter(val=>val.ispId === this.yourNetworkStatsInCity.ispId).length === 0){
                data.push(this.yourNetworkStatsInCity);
            }
        }else if (!isCitySelected && this.yourNetworkStatsInCountry){
            if(data.filter(val=>val.ispId === this.yourNetworkStatsInCountry.ispId).length === 0){
                data.push(this.yourNetworkStatsInCountry);
            }
        }

        return (
            <>
                {this.renderSegmentedBar(istAnalysis)}
                {this.renderTable(data)}
            </>
        );
    }
    renderTable(data){
        return (
            <div className="m-2">
                <table className="table table-sm table-borderless table-responsive-flip">
                    {this.renderTableHeader()}
                    {this.renderTableBody(this.sortIsps(data))}
                </table>
            </div>
        )
    }
    renderTableBody(values){
        let yourIspId;
        if(this.props.istAnalysis.statsIsp){
            yourIspId = this.props.istAnalysis.statsIsp.ispId
        }
        return(
            <tbody>
                {values.map((isp, idx) => this.renderRow(isp, idx, yourIspId))}
            </tbody>
        )
    }

    renderTableHeader(){
        return(
            <thead>
                <tr>
                    <th/>
                    {this.renderSingleHeaderColumn(intl.get('discovery_network_internet_isp'), SORT_BY_NAME_ASC, SORT_BY_NAME_DESC, true)}
                    {this.renderSingleHeaderColumn(intl.get('speedtest_download'), SORT_BY_DOWNLOAD_DESC, SORT_BY_DOWNLOAD_ASC, true)}
                    {this.renderSingleHeaderColumn(intl.get('speedtest_upload'), SORT_BY_UPLOAD_DESC, SORT_BY_UPLOAD_ASC, true)}
                    {this.renderSingleHeaderColumn(intl.get('internet_performance_score'), SORT_BY_PERFORMANCE_SCORE_DESC, SORT_BY_PERFORMANCE_SCORE_ASC, true)}
                    {this.renderSingleHeaderColumn(intl.get('internet_test_samples'), SORT_BY_SAMPLES_DESC, SORT_BY_SAMPLES_ASC, false)}
                    {this.renderSingleHeaderColumn(intl.get('internet_sentiment'), SORT_BY_SENTIMENT_SCORE_DESC, SORT_BY_SENTIMENT_SCORE_ASC, true)}
                    {this.renderSingleHeaderColumn(intl.get('internet_ratings'), SORT_BY_RATINGS_DESC, SORT_BY_RATINGS_ASC, false)}
                </tr>
            </thead>
        )
    }

    renderSegmentedBar(istAnalysis){
        const onLocationSelected = (index) => this.setState({selectedIndexLocation: index});
        let countryName;
        let city = '';
        let country = '';
        if(istAnalysis.statsIsp){
            countryName = getCountryName(istAnalysis.statsIsp.country);
            city = istAnalysis.statsIsp.city;
            country = istAnalysis.statsIsp.country;
        }
        

        return (
            <div className="d-flex align-items-center justify-content-center mb-4">
                <SegmentedBar activeIndex={this.state.selectedIndexLocation}
                                items={[
                                    {label: city},
                                    {label: countryName || country}
                                ]}
                                onItemSelected={onLocationSelected}/>
            </div>
        )
    }

    renderSingleHeaderColumn(title, sortA, sortB, isForSmall) {
        const isSorted = (a, b) =>
            this.state.selectedOrderType === a ||
            this.state.selectedOrderType === b ? 'text-primary' : 'text-dark';
        const onClickSort = (a, b) =>
            this.state.selectedOrderType === a ?
                this.setState({selectedOrderType: b}) :
                this.setState({selectedOrderType: a});
        const renderSortedIcon = (a, b) => {
            if (this.state.selectedOrderType === a) {
                return <i className="fas fa-sort-up"/>
            } else if (this.state.selectedOrderType === b) {
                return <i className="fas fa-sort-down"/>
            }
        }
        return (
            <th className={isForSmall ? "d-table-cell" : "d-sm-none d-xs-none d-md-none d-lg-table-cell"}
                onClick={() => onClickSort(sortA, sortB)}>
                <a role="button" className={isSorted(sortA, sortB)}>
                    {title}
                    {renderSortedIcon(sortA, sortB)}
                </a>
            </th>
        )
    }

    renderRow(isp, idx, ispId) {
        const isYourNetwork = isp.ispId === YOUR_NETWORK_ISP_ID;
        const isActive = ispId === isp.ispId || isYourNetwork;
        const avgDownload = Number(isp.downloadSpeedMbpsAvg).toFixed(1);
        const avgUpload = Number(isp.uploadSpeedMbpsAvg).toFixed(1);
        const performanceScore = (Number(isp.score) * 5).toFixed(1);
        const sentimentScore = (Number(isp.sentiment) / 100 * 5).toFixed(1);
        const samples = this.getNumberTotalCluster(Number(isp.samples));
        const totalRatings = this.getNumberTotalCluster(Number(isp.totalRatings))
        return (
            <tr key={idx} className={isActive ? "bg-soft-warning" : ''}>
                {this.renderTextCell(idx + 1, true)}
                {this.renderIspNameCell(isp, isYourNetwork)}
                {this.renderTextCell(intl.get('num_mbps', {num: avgDownload}), true)}
                {this.renderTextCell(intl.get('num_mbps', {num: avgUpload}), true)}
                {this.renderRatingBarCell(performanceScore, RTI_STAR, isActive, true)}
                {this.renderTextCell(samples, false)}
                {this.renderRatingBarCell(sentimentScore, RTI_HEART, isActive, !isYourNetwork)}
                {this.renderTextCell(totalRatings, false, isYourNetwork)}
            </tr>
        );
    }

    renderTextCell(str, isForSmall, isYourNetwork) {
        return (
            <td className={isForSmall ? "d-table-cell" : "d-sm-none d-xs-none d-md-none d-lg-table-cell"}>
                {!isYourNetwork && <p className="mb-0">{str}</p>}
            </td>
        )
    }

    renderIspNameCell(isp, badgeVisible) {
        const activeText = <a className="link-primary" role="button" onClick={() => this.onClickName(isp,badgeVisible)}>{isp.isp} {this.renderBadge(badgeVisible)}</a>;
        const notActiveText = <p className="mb-0">{isp.isp} {this.renderBadge(badgeVisible)}</p>
        return (
            <td>
                {badgeVisible ? notActiveText : activeText}
            </td>
        )
    }

    renderRatingBarCell(score, type, isActive, visible) {
        const tint = isActive ? TINT_WARNING : TINT_SECONDARY;
        return (
            <td>
                {visible && <div className="mt-1">
                    <RatingBar tint={tint}
                               length={5}
                               value={score}
                               type={type}
                               size={RB_SMALL}/>
                </div>}
            </td>
        )

    }

    renderBadge(visible) {
        if (visible) {
            return <Badge pill soft tint={BADGE_TINT_PRIMARY} className="ml-2" text={intl.get('internet_network')}/>
        }
        return ''
    }
}

InternetScoreBoard.propTypes = {
    istAnalysis: PropTypes.object,
};


