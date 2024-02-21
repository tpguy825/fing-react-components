import React, {Component} from 'react';
import intl from "react-intl-universal";
import PropTypes from 'prop-types';

import GenericIcon from '../../component/icons/GenericIcon';
import MetricVerticalCard from '../../component/MetricVerticalCard';
import {GEN_DOWN, GEN_TREND_UP, GEN_UP, TINT_DANGER, TINT_PRIMARY, TINT_SUCCESS} from '../../model/Constants';
import {formatSpeed} from '../../helpers/NetworkHelper';
import {DATE_FORMAT_LONG, formatAbsoluteDate} from '../../helpers/DateHelper';


export default class InternetLastSpeedTestSection extends Component {

    // --------------------------------------------------------------------------------------------------------------
    // RENDERING
    // --------------------------------------------------------------------------------------------------------------

    render() {
        const speedTestResult = this.props.speedTestResult;
        const formattedTimestamp = speedTestResult ? formatAbsoluteDate(speedTestResult.timestamp, DATE_FORMAT_LONG) : '';
        return (
            <>
                <h4 className="mb-0">{intl.get('internet_last_speed_test')}</h4>
                {speedTestResult ?
                    <>
                        <p className="mb-0 small">{formattedTimestamp}</p>
                        {this.renderBody(speedTestResult)}
                    </> :
                    <div className="d-flex justify-content-center align-items-center w-100 h-100">
                        {intl.get('internet_no_data_last_speed_test')}
                    </div>
                }
            </>
        );
    }

    renderBody(speedTestResult) {
        let upload;
        let download;
        let locationDownload;
        let locationUpload;
        let latency;

        const test = speedTestResult;
        upload = formatSpeed(Number(test.uploadbps));
        download = formatSpeed(Number(test.downloadbps));
        latency = test && test.rtd ? Number(test.rtd).toFixed(1) : 0;
        if (test.downloadInfo && test.downloadInfo.serverCity && test.downloadInfo.serverCountry) {
            locationDownload = intl.get('internet_location_server_from', {
                serverCity: test.downloadInfo.serverCity,
                serverCountry: test.downloadInfo.serverCountry
            });
        }
        if (test.uploadInfo && test.uploadInfo.serverCity && test.uploadInfo.serverCountry) {
            locationUpload = intl.get('internet_location_server_to', {
                serverCity: test.uploadInfo.serverCity,
                serverCountry: test.uploadInfo.serverCountry
            });
        }
        const iconDownload = <GenericIcon type={GEN_DOWN} color={TINT_SUCCESS} size={16}/>
        const iconUpload = <GenericIcon type={GEN_UP} color={TINT_PRIMARY} size={16}/>
        const iconLatency = <GenericIcon type={GEN_TREND_UP} color={TINT_DANGER} size={16}/>
        return (
            <div className="d-lg-flex d-xl-flex d-md-block justify-content-center align-items-center h-100">
                <MetricVerticalCard title={intl.get('speedtest_download')}
                                    className={"p-3 m-3"}
                                    value={download}
                                    extra={locationDownload}
                                    extraIcon={''}
                                    measure={intl.get('#_mbps')}
                                    titleIcon={iconDownload}/>
                <MetricVerticalCard title={intl.get('speedtest_upload')}
                                    className={"p-3 m-3"}
                                    value={upload}
                                    extra={locationUpload}
                                    extraIcon={''}
                                    measure={intl.get('#_mbps')}
                                    titleIcon={iconUpload}/>
                <MetricVerticalCard title={intl.get('internet_latency')}
                                    className={"p-3 m-3"}
                                    value={latency}
                                    extra={locationUpload}
                                    extraIcon={''}
                                    measure={intl.get('#_ms')}
                                    titleIcon={iconLatency}/>
            </div>
        )
    }
}

InternetLastSpeedTestSection.propTypes = {
    speedTestResult: PropTypes.object,
};