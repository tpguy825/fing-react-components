import RatingBar, {RB_SMALL} from '../../component/RatingBar';
import ProgressBar, { PB_VISIBLE_ALWAYS } from '../../component/ProgressBar';
import React,{Component} from 'react';
import {RTI_HEART} from '../../component/icons/RatingTypeIcon';
import intl from 'react-intl-universal';
import {TINT_DANGER} from '../../model/Constants';
import PropTypes from 'prop-types';

export default class SpeedTestSentimentDistribution extends Component {

    getProgressBarValue(rate) {
        return Math.round(rate / this.props.total * 100);
    }

    render() {
        const {distribution, value, total} = this.props;

        return (
            <div className="row">
                <div className="col-xl-12 col-lg-6 col-md-6 col-sm-12">
                    <div className="d-flex align-items-center mb-3">
                        <h1 className="mr-4 mb-0 display-4">{value.toFixed(1)}</h1>
                        <div className="d-block">
                            <RatingBar tint={TINT_DANGER} length={5} value={value} type={RTI_HEART} size={RB_SMALL}/>
                            <h5>{intl.get('speedtest_reviews', {total: total})}</h5>
                        </div>
                    </div>
                </div>
                <div className="col-xl-12 col-lg-6 col-md-6 col-sm-12">
                    {[5, 4, 3, 2, 1].map(val =>
                        <div key={val} className="d-flex align-items-center">
                            <span className="flex-nowrap text-nowrap">{val}</span>
                            <span className="col-lg-10 px-1">
                                <ProgressBar
                                    visibilityPolicy={PB_VISIBLE_ALWAYS}
                                    value={this.getProgressBarValue(Number(distribution[val - 1]))}/></span>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

SpeedTestSentimentDistribution.propTypes = {
    distribution: PropTypes.array,
    value: PropTypes.number,
    total: PropTypes.number
};
