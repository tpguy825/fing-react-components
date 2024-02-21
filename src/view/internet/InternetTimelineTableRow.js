import React, {Component} from 'react';
import intl from "react-intl-universal";
import PropTypes from 'prop-types';
import { DATE_FORMAT_LONG, DATE_FORMAT_SMART, formatAbsoluteDate, formatRelativeDate } from '../../helpers/DateHelper';
import { formatSpeed, formatTrend } from '../../helpers/NetworkHelper';
import Badge, { BADGE_TINT_PRIMARY } from '../../component/Badge';

export default class InternetTimelineTableRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item,
            success: this.props.item.success === 'true',
            manual: this.props.item.manual === 'true'
        }
    }
    getLocationFromServer(server){
        if(server.serverCity && server.serverCountry){
            if (server.serverCity !== '' && server.serverCountry !== '') {
                return server.serverCity + ", " + server.serverCountry;
            } else if(server.serverCity !== '' && server.serverCountry === '') {
                return server.serverCountry;
            } else if(server.serverCity === '' && server.serverCountry !== '') {
                return server.serverCity;
            } 
        }
        return '';
    }
    render() {
        
        return (
            <tr>
                {this.renderState()}
                {this.renderTimestamp()}
                {this.renderDownload()}
                {this.renderUpload()}
                {this.renderLatency()}
                {this.renderType()}
            </tr>
        );
    }

    renderState(){
        let dotColor;
        let dotIcon;
        if (this.state.success === false) {
            dotColor = "step-icon-danger";
            dotIcon = "fa-times";
        } else if (!this.state.item.outlierDownload && !this.state.item.outlierUpload) {
            dotColor = "step-icon-soft-primary";
            dotIcon = "fa-check"
        } else {
            const outlierDownload = this.state.item.outlierDownload ? Number(this.state.item.outlierDownload) : 0;
            const outlierUpload = this.state.item.outlierUpload ? Number(this.state.item.outlierUpload) : 0;
            if (((outlierDownload + outlierUpload) / 2) > 0) {
                dotColor = "step-icon-success";
                dotIcon = "fa-thumbs-up";
            } else {
                dotColor = "step-icon-danger";
                dotIcon = "fa-thumbs-down";
            }
        }
        return(
            <td>
                <div className="step mx-0">
                    <span className={`step-icon step-icon-xs ${dotColor}`}><i className={`fa fa-fw ${dotIcon}`}/></span>
                </div>
            </td>
        ) 
    }
    renderDownload(){
        const download = formatSpeed(Number(this.state.item.downloadBps));
        const outlier = this.state.item.outlierDownload;
        let textColor = 'text-dark';
        if(outlier){
            textColor = outlier > 0 ? "text-success" : "text-danger";
        }
        const trend = outlier ? '('+ formatTrend(Number(outlier)) + ')' : ''
        let location = '';

        if(this.state.item.downloadServerIndex){
            const server = this.props.servers[Number(this.state.item.downloadServerIndex)]
            location = this.getLocationFromServer(server)
        }
        
        return (
            <td data-title={intl.get("speedtest_download")}>
                {this.state.success &&
                    <div>
                        <h5 className={"mb-0 " + textColor}>{intl.get('num_mbps',{num:download})} {trend}</h5>
                        <p className="mb-0 small text-secondary">{location}</p>
                    </div>
                }
                
            </td>
        );
    }
    renderUpload(){
        const upload = formatSpeed(Number(this.state.item.uploadBps))
        const outlier = this.state.item.outlierUpload;
        let textColor = 'text-dark';
        if(outlier){
            textColor = outlier > 0 ? "text-success" : "text-danger"
        }        
        const trend = outlier ? '('+ formatTrend(Number(outlier)) + ')' : ''
        let location = '';

        if(this.state.item.uploadServerIndex){
            const server = this.props.servers[Number(this.state.item.uploadServerIndex)]
            location = this.getLocationFromServer(server)
        }
        
        return (
            <td data-title={intl.get("speedtest_upload")} className={textColor}>
                {this.state.success &&
                <div>
                    <h5 className={"mb-0 " + textColor}>{intl.get('num_mbps',{num:upload})} {trend}</h5>
                    <p className="mb-0 small text-secondary">{location}</p>
                </div>
                }
                
            </td>
        );
    }
    renderLatency(){
        const latency = this.state.item.rtd;
        return (
            <td data-title={intl.get("internet_latency")}>
                {this.state.success && <h5 className="mb-0">{intl.get('num_ms',{num:latency})}</h5>}
            </td>
        )
    }
    
    renderType(){
        const text = this.state.manual ? intl.get('generic_manual') : intl.get('generic_auto');
        return (
            <td data-title={intl.get("timeline_table_header_type")}>
                <Badge pill soft tint={BADGE_TINT_PRIMARY} text={text}/>
            </td>
        )
    }
    renderTimestamp(){
        const timestamp = this.state.item.timestamp;
        const longDate = formatAbsoluteDate(timestamp, DATE_FORMAT_LONG);
        const smartDate = formatRelativeDate(timestamp, DATE_FORMAT_SMART);
        return (
            <td data-title={intl.get("timeline_table_header_when")}>
                {timestamp &&
                <>
                    <h5 className="mb-0">{longDate}</h5>
                    <p className="mb-0 small text-secondary">{smartDate}</p>
                </>}
            </td>
        )
    }
}

InternetTimelineTableRow.propTypes = {
    item: PropTypes.object,
    servers: PropTypes.array
}