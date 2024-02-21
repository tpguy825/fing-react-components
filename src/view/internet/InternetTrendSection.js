import React, {Component} from 'react';
import intl from "react-intl-universal";
import PropTypes from 'prop-types';

import GenericIcon from '../../component/icons/GenericIcon';
import {
    GEN_TREND_FLAT,
    TI_DOWN,
    TI_DOWN_FAST,
    TI_UP,
    TI_UP_FAST,
    TINT_DANGER,
    TINT_PRIMARY,
    TINT_DARK
} from '../../model/Constants';

import ActionButton, {BTN_TINT_PRIMARY, BTN_TYPE_DEFAULT, BTN_TYPE_SOFT} from '../../component/ActionButton';
import RatingEditDialog from '../../component/RatingEditDialog';
import RatingTypeIcon, {RTI_BOLT, RTI_FULL, RTI_HEART} from '../../component/icons/RatingTypeIcon';
import {hideDialogById, showDialogById} from '../../component/ModalDialog';
import TrendIcon from '../../component/icons/TrendIcon';
import {bestIspLocation} from "../../helpers/NetworkHelper";
import {DATE_FORMAT_SHORT, formatAbsoluteDate} from "../../helpers/DateHelper";

const RATING_DIALOG_SPEED_TEST = 'RATING_DIALOG_SPEED_TEST';

export default class InternetTrendSection extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            ratingComment: this.props.ratingComment
        }
        this.onClickImageProvider = this.onClickImageProvider.bind(this)
        this.onSaveRating = this.onSaveRating.bind(this);
        this.onClickDetails = this.onClickDetails.bind(this)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.ratingComment !== prevProps.ratingComment) {
            this.setState({
                ratingComment: this.props.ratingComment,
            });
        }
    }
    onSaveRating(rating) {
        if (rating && this.props.onSaveRating) {
            this.props.onSaveRating(rating);
        }
    }
    onClickDetails(ispInfo){
        if(this.props.onClickDetails){
            this.props.onClickDetails(ispInfo)
        }
    }
    onClickImageProvider(ispInfo){
        if(this.props.onClickImageProvider){
            this.props.onClickImageProvider(ispInfo)
        }
    }
    formatIspTrend(val) {
        const trend = val || 0;
        if (trend>=0.15) return intl.get("data_trend_up_1");
        else if (trend>=0.03) return intl.get("data_trend_up_2");
        else if (trend<=-0.15) return intl.get("data_trend_down_1");
        else if (trend<=-0.03) return intl.get("data_trend_down_2");
        else return intl.get("data_trend_stable");
    }

    getLogo(ispInfo){        
        return ispInfo && ispInfo.logoimageurl ? 
            "https://cdn.fing.io/images" + ispInfo.logoimageurl : 
            "https://cdn.fing.io/images/isp/general/default_isp.png"
         
    }
    getBanner(ispInfo){
        return ispInfo && ispInfo.bannerimageurl ? 
            "https://cdn.fing.io/images" + ispInfo.bannerimageurl : null;
    }

    render(){
        const {internetInfo} = this.props;

        const ispInfo = internetInfo && internetInfo.ispinfo ? internetInfo.ispinfo : null;
        return (
            <>
                {this.renderTitle(ispInfo)}
                {ispInfo && this.renderBody(ispInfo)}
                {ispInfo && this.renderActions(ispInfo)}
                {ispInfo && this.renderRatingDialog(ispInfo)}
            </>
        );
    }

    renderBody(ispInfo){
        const ispStats = ispInfo ? ispInfo.ispstats : null;
        const outages = ispInfo && ispInfo.outagesSummary && ispInfo.outagesSummary.totOutages ?
            ispInfo.outagesSummary.totOutages :
            intl.get('generic_not_available')
        const banner = this.getBanner(ispInfo);
        const downloadSpeedTrend = ispStats && ispStats.downloadSpeedTrend ? ispStats.downloadSpeedTrend : '0';
        const scoreTrend = ispStats && ispStats.downloadSpeedTrend ? ispStats.downloadSpeedTrend : '0';

        return (
            <>
                <div className="d-flex justify-content-center">
                    <a role="button">
                        <img    onClick={()=>this.onClickImageProvider(ispInfo)}
                                src={banner ? banner : this.getLogo(ispInfo)}
                                height={96}
                                width={banner ? 192 : 96} 
                                alt={ispInfo.name}/>
                    </a>
                </div> 
                <div className="d-lg-flex d-xl-flex d-md-block justify-content-center">
                    {this.renderPerformance(
                        this.renderTrendIcon(Number(downloadSpeedTrend)), 
                        this.formatIspTrend(Number(downloadSpeedTrend)), 
                        intl.get('internet_speed_performance')
                    )}
                    {this.renderPerformance(
                        this.renderTrendIcon(Number(scoreTrend)),
                        this.formatIspTrend(Number(scoreTrend)), 
                        intl.get('internet_user_rating')
                    )}
                    {this.renderPerformance(
                        <RatingTypeIcon size={16} tint={TINT_PRIMARY} type={RTI_BOLT} variant={RTI_FULL}/>,
                        intl.get('internet_outages_summary',{num:outages}),
                        intl.get('internet_outages')
                    )}
                </div>
            </>
            
        );
    }

    

    renderActions(ispInfo) {
        const hasRating = this.state.ratingComment && this.state.ratingComment.getRating() !== 0;
        const date = hasRating ?
            intl.get('rating_date', {date: formatAbsoluteDate(new Date().getTime(), DATE_FORMAT_SHORT)}) : null;
        const ratingString = hasRating ? intl.get('rating_edit') : intl.get('speedtest_rate')
        return (
            <div className="d-flex align-items-center mt-2">
                <ActionButton   className={"mr-2"}
                                disabled={this.props.disableAction}
                                title={intl.get('internet_view_details')}
                                action={()=>this.onClickDetails(ispInfo)}
                                type={BTN_TYPE_DEFAULT}
                                tint={BTN_TINT_PRIMARY} />
                <ActionButton   className={"mr-2"}
                                disabled={this.props.disableAction}
                                title={ratingString}
                                action={()=>showDialogById(RATING_DIALOG_SPEED_TEST)}
                                type={BTN_TYPE_SOFT}
                                tint={BTN_TINT_PRIMARY} />
                <small className="ml-1">{date}</small>
            </div>
        )
    }


    renderTitle(ispInfo){
        if(!ispInfo){
            return (
                <>
                    <h4 className="card-title">
                        {intl.get('internet_data_trend')}
                    </h4>
                    <div className="d-flex justify-content-center align-items-center w-100 h-100">
                        {intl.get('internet_no_data_trend')}
                    </div>
                </>
            );
        }
        return (
            <>
                <h4 className="card-title">
                    {intl.get('internet_trend_in',{
                        isp: ispInfo.name,
                        city: bestIspLocation(this.props.internetInfo)
                    })}
                </h4>
                <p className="mb-0 small">
                    {intl.get('internet_based_on')}
                </p>
            </>
        );
    }
    renderRatingDialog(ispInfo) {
        const onClose = () => {
            hideDialogById(RATING_DIALOG_SPEED_TEST);
        };
        const onConfirm = (ratingResult) => {
            hideDialogById(RATING_DIALOG_SPEED_TEST);
            this.onSaveRating(ratingResult);
        };
        return <RatingEditDialog id={RATING_DIALOG_SPEED_TEST}
                                 type={RTI_HEART}
                                 subjectName={ispInfo.name}
                                 ratingColor={TINT_DANGER}
                                 comment={this.state.ratingComment.getComment()}
                                 value={this.state.ratingComment.getRating()}
                                 subjectImageBanner={this.getBanner(ispInfo)}
                                 subjectImageLogo={this.getLogo(ispInfo)}
                                 onClose={onClose}
                                 onConfirm={onConfirm}/>
    }
    renderTrendIcon(val) {
        const trend = val || 0;
        let icon = GEN_TREND_FLAT;
        if (trend>=0.15) icon = TI_UP_FAST;
        else if (trend>=0.03) icon = TI_UP;
        else if (trend<=-0.15) icon = TI_DOWN_FAST;
        else if (trend<=-0.03) icon = TI_DOWN;
        if(icon === GEN_TREND_FLAT){
            return <GenericIcon type={icon} color={TINT_DARK} size={16}/>;
        }
        return <TrendIcon type={icon} color={TINT_DARK} size={16}/>;
    }
    renderPerformance(icon, title, subtitle){
        return(
            <div className="card card-bordered shadow-none m-2 p-3">
                <div className="text-center">
                    <div className="mx-auto w-100 m-2">{icon}</div>
                    <h4 className="mb-0">{title}</h4>
                    <p className="mb-0 small">{subtitle}</p>
                </div>
            </div>
        );
    }
}

InternetTrendSection.propTypes = {
    network: PropTypes.object,
    disableAction: PropTypes.bool,
    ratingComment: PropTypes.object,
    onClickImageProvider: PropTypes.func,
    onClickDetails: PropTypes.func
};