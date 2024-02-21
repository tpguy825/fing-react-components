import React,{Component} from 'react';
import GenericIcon from '../../component/icons/GenericIcon';
import {
    TINT_PRIMARY,
    TINT_SUCCESS,
    GEN_UP,
    GEN_DOWN
} from '../../model/Constants';
import intl from 'react-intl-universal';
import CircularChart, {
    CC_DIM_DEFAULT,
    CC_RADIUS_DEFAULT,
} from '../../component/CircularChart';
import PropTypes from 'prop-types';
import MetricVerticalCard from '../../component/MetricVerticalCard';

export default class SpeedTestDonuts extends Component {

    render() {
        const {result} = this.props;
        const isCompleted = result.isCompletedState();
        const cName = isCompleted ? "d-sm-flex" : "d-sm-block"
        return (
            <div className={"mt-10 mb-5 justify-content-start d-xl-flex d-lg-flex d-md-flex " + cName}>
                {isCompleted ? this.renderResultDownload(result) : this.renderDownload(result)}
                {isCompleted ? this.renderResultUpload(result) : this.renderUpload(result)}
            </div>
        );
    }

    renderDownloadText() {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <GenericIcon    className="d-flex" 
                                type={GEN_DOWN} 
                                color={TINT_SUCCESS} 
                                size={16}/>
                <h4 className="ml-2 mb-0">{intl.get('speedtest_download')}</h4>
            </div>
        );
    }

    renderResultDownload(result) {
        return <MetricVerticalCard className="mr-2 mb-2 p-3 px-lg-7 px-xl-7 px-md-5 px-sm-3"
                                   title={intl.get('speedtest_download')}
                                   value={result.getDownloadValue()}
                                   measure={intl.get('#_mbps')}
                                   compact={true}
                                   titleIcon={<GenericIcon className="d-flex"
                                                            type={GEN_DOWN} 
                                                            color={TINT_SUCCESS} 
                                                            size={16}/>}/>
    }

    renderDownload(result) {
        return (
            <div className="p-3 px-7 text-center">
                {this.renderDownloadText()}
                <CircularChart
                    loading={result.isInitState()}
                    failed={result.isFailedState()}
                    minLabel={intl.get('num_mbps', {num: '0'})}
                    maxLabel={intl.get('num_mbps', {num: result.getDownloadValueMax()})}
                    valueLabel={result.getDownloadValue()}
                    radius={CC_RADIUS_DEFAULT}
                    progress={result.getDownloadChartValue()}
                    dimension={CC_DIM_DEFAULT}
                    color={TINT_SUCCESS}
                    animated={true}/>
            </div>
        );
    }

    renderUploadText() {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <GenericIcon    className="d-flex" 
                                type={GEN_UP} 
                                color={TINT_PRIMARY} 
                                size={16}/>
                <h4 className="ml-2 mb-0">{intl.get('speedtest_upload')}</h4>
            </div>
        );
    }

    renderResultUpload(result) {
        return <MetricVerticalCard className="mr-2 mb-2 p-3 px-lg-7 px-xl-7 px-md-5 px-sm-3"
                                   title={intl.get('speedtest_upload')}
                                   compact={true}
                                   value={result.getUploadValue()}
                                   measure={intl.get('#_mbps')}
                                   titleIcon={<GenericIcon className="d-flex"
                                                            type={GEN_UP} 
                                                            color={TINT_PRIMARY} 
                                                            size={16}/>}/>
    }

    renderUpload(result) {
        return (
            <div className="p-3 px-7 text-center">
                {this.renderUploadText()}
                <CircularChart
                    loading={result.isInitState()}
                    failed={result.isFailedState()}
                    minLabel={intl.get('num_mbps', {num: '0'})}
                    maxLabel={intl.get('num_mbps', {num: result.getUploadValueMax()})}
                    valueLabel={result.getUploadValue()}
                    radius={CC_RADIUS_DEFAULT}
                    progress={result.getUploadChartValue() || 0}
                    dimension={CC_DIM_DEFAULT}
                    color={TINT_PRIMARY}
                    animated={true}
                />
            </div>
        );
    }
}

SpeedTestDonuts.propTypes = {
    result: PropTypes.object
};
