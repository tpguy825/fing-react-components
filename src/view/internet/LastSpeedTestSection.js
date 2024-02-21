/**
 * Created by marco on 3/22/21.
 *
 * (C) Copyright Fing
 */

import React, {PureComponent} from 'react';
import intl from "react-intl-universal";
import SummarySection from '../../component/summary/SummarySection';
import GenericIcon from '../../component/icons/GenericIcon';
import { GEN_DOWN, TINT_SUCCESS, GEN_UP, TINT_PRIMARY, GEN_TREND_UP, TINT_DANGER } from '../../model/Constants';
import MetricCard from '../../component/MetricCard';
import { formatAbsoluteDate, DATE_FORMAT_LONG } from '../../helpers/DateHelper';
import { formatSpeed } from '../../helpers/NetworkHelper';


// Why PureComponent?
// https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization
    
export default class LastSpeedTestSection extends PureComponent {

    render() {
        const {speedTestResult} = this.props;
        if(!speedTestResult){
            return (
                <SummarySection>
                    <h3 className="mb-0">{intl.get('internet_last_speed_test')}</h3>
                    <p className="mb-3">{intl.get('internet_no_data_last_speed_test')}</p>
                </SummarySection>
            );
        }
        const formattedTimestamp = speedTestResult ? formatAbsoluteDate(speedTestResult.timestamp, DATE_FORMAT_LONG) : '';
        const latency = speedTestResult && speedTestResult.rtd ? Number(speedTestResult.rtd).toFixed(1) : 0;
    
        let locationDownload;
        let locationUpload;
        if (speedTestResult.downloadInfo && speedTestResult.downloadInfo.serverCity && speedTestResult.downloadInfo.serverCountry) {
            locationDownload = intl.get('internet_location_server_from', {
                serverCity: speedTestResult.downloadInfo.serverCity,
                serverCountry: speedTestResult.downloadInfo.serverCountry
            });
        }
        if (speedTestResult.uploadInfo && speedTestResult.uploadInfo.serverCity && speedTestResult.uploadInfo.serverCountry) {
            locationUpload = intl.get('internet_location_server_to', {
                serverCity: speedTestResult.uploadInfo.serverCity,
                serverCountry: speedTestResult.uploadInfo.serverCountry
            });
        }
        return (
            <SummarySection>
                <h3 className="mb-0">{intl.get('internet_last_speed_test')}</h3>
                <p className="mb-3">{formattedTimestamp}</p>
                <div className="d-lg-flex d-xl-flex d-md-flex d-sm-block justify-content-start align-items-center h-100">
                    <MetricCard
                        extra={locationDownload}
                        bgColor={"bg-soft-success"}
                        icon={<GenericIcon type={GEN_DOWN} color={TINT_SUCCESS} size={16}/>}
                        metric={formatSpeed(Number(speedTestResult.downloadbps))}
                        description={intl.get("generic_mbps_download")}/>
                    <MetricCard 
                        extra={locationUpload}
                        bgColor={"bg-soft-primary"}
                        icon={<GenericIcon type={GEN_UP} color={TINT_PRIMARY} size={16}/>}
                        metric={formatSpeed(Number(speedTestResult.uploadbps))}
                        description={intl.get("generic_mbps_upload")}/>
                    <MetricCard 
                        bgColor={"bg-soft-danger"}
                        extra={locationUpload}
                        icon={<GenericIcon type={GEN_TREND_UP} color={TINT_DANGER} size={16}/>}
                        metric={latency}
                        description={intl.get("generic_ms_latency")}/>
                </div>
            </SummarySection>
        ); 
    }
}


