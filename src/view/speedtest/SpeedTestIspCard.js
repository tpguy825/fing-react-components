import React, {Component} from 'react';
import {showDialogById, hideDialogById} from '../../component/ModalDialog';
import ActionButton, {
    BTN_TYPE_DEFAULT,
    BTN_TINT_PRIMARY, BTN_SIZE_BIG
} from '../../component/ActionButton';
import intl from 'react-intl-universal';
import PropTypes from 'prop-types';

import {RTI_HEART} from '../../component/icons/RatingTypeIcon';
import SpeedTestContactSupport from './SpeedTestContactSupport';
import RatingEditDialog from '../../component/RatingEditDialog';
import {TINT_DANGER, TINT_SECONDARY} from '../../model/Constants';
import RatingBar, {RB_SMALL} from "../../component/RatingBar";
import {DATE_FORMAT_SHORT, formatAbsoluteDate} from "../../helpers/DateHelper";

const RATING_DIALOG_SPEED_TEST = 'RATING_DIALOG_SPEED_TEST';

export default class SpeedTestIspCard extends Component {

    constructor(props, context) {
        super(props, context);
        this.onClickIsp = this.onClickIsp.bind(this);
        this.onClickWebsite = this.onClickWebsite.bind(this);
        this.onSaveRating = this.onSaveRating.bind(this);
        this.onSupportIconClicked = this.onSupportIconClicked.bind(this);
    }

    onSupportIconClicked(url, type) {
        if (url && type && this.props.onSupportIconClicked) {
            this.props.onSupportIconClicked(url, type);
        }
    }

    onClickIsp() {
        if (this.props.onClickIsp) {
            this.props.onClickIsp();
        }
    }

    onClickWebsite() {
        if (this.props.onClickWebsite && this.props.result && this.props.result.getWebsite()) {
            this.props.onClickWebsite(this.props.result.getWebsite());
        }
    }

    onSaveRating(rating) {
        if (rating && this.props.onSaveRating) {
            this.props.onSaveRating(rating);
        }
    }

    render() {
        return (
            <div className="card card-bordered shadow-none">
                {this.renderBody()}
                {this.renderFooter()}
                {this.renderRatingDialog()}
            </div>
        );
    }

    renderBody() {
        return <div className="card-body">{this.renderIspInfo()}</div>
    }

    renderFooter() {
        if (!this.props.result.isCompletedState()) return '';
        const showRatingDialog = () => {
            showDialogById(RATING_DIALOG_SPEED_TEST)
        };
        return (
            <div className="card-footer bg-transparent">
                {this.renderUserRating()}
                <ActionButton action={showRatingDialog}
                            className="w-100" size={BTN_SIZE_BIG}
                            title={this.props.rate && this.props.rate.getRating() !== 0 ?
                                intl.get('rating_edit') : intl.get('speedtest_rate')}
                            type={BTN_TYPE_DEFAULT}
                            tint={BTN_TINT_PRIMARY} />
            </div>
        );
    }

    renderIspInfo() {
        const {result} = this.props;

        let cleanerUrl = result.getWebsite();
        if (cleanerUrl.startsWith('https://')) {
            cleanerUrl = cleanerUrl.replace('https://', '')
        } else if (cleanerUrl.startsWith('http://')) {
            cleanerUrl = cleanerUrl.replace('http://', '')
        }
        const logo = result.getLogoImage() || "https://cdn.fing.io/images/isp/general/default_isp.png"
        const image = result.getBannerImage() ? result.getBannerImage() : logo
        const width = result.getBannerImage() ? 192 : 96
        const name = result.getName() ? intl.get('speedtest_isp_info_location', {
                            isp: result.getName(),
                            city: result.getCity(),
                            country: result.getCountry()
                        }) : '';

        return (
            <div>
                <a role="button">
                    <img    className="mb-1"
                            onClick={this.onClickIsp}
                            src={image}
                            height={96}
                            width={width} alt={result.getName()}/>
                </a>
                <div className="mb-5 w-100">
                    <div>
                        <a className="h4 link-underline mb-0" role="button" onClick={this.onClickIsp}>
                            {name}
                        </a>
                    </div>
                    <a  className="text-primary" role="button" onClick={this.onClickWebsite}>
                        {cleanerUrl}
                    </a>
                </div>
                <SpeedTestContactSupport    result={result}
                                            onSupportIconClicked={(url, type) => this.onSupportIconClicked(url, type)}/>
            </div>
        );
    }

    renderUserRating() {
        if (!this.props.rate || this.props.rate.getRating() === 0) return '';
        const date = intl.get('rating_date', {date: formatAbsoluteDate(this.props.rate.getTimestamp(), DATE_FORMAT_SHORT)})
        return (
            <div>
                <RatingBar  tint={TINT_SECONDARY} 
                            length={5} 
                            value={Number(this.props.rate.getRating())} 
                            type={RTI_HEART}
                            size={RB_SMALL}/>
                {this.props.rate.getTimestamp() > 0 &&
                <p className="small">{date}</p>}
            </div>
        );
    }

    renderRatingDialog() {
        const onClose = () => {
            hideDialogById(RATING_DIALOG_SPEED_TEST);
        };
        const onConfirm = (ratingResult) => {
            hideDialogById(RATING_DIALOG_SPEED_TEST);
            this.onSaveRating(ratingResult);
        };

        return <RatingEditDialog id={RATING_DIALOG_SPEED_TEST}
                                 type={RTI_HEART}
                                 subjectName={this.props.result.getName()}
                                 ratingColor={TINT_DANGER}
                                 comment={this.props.rate.getComment() || ''}
                                 value={this.props.rate.getRating() || 0}
                                 subjectImageBanner={this.props.result.getBannerImage()}
                                 subjectImageLogo={this.props.result.getLogoImage()}
                                 onClose={onClose}
                                 onConfirm={onConfirm}/>
    }
}

SpeedTestIspCard.propTypes = {
    onSupportIconClicked: PropTypes.func,
    onClickButton: PropTypes.func,
    onSaveRating: PropTypes.func,
    result: PropTypes.object,
    rate: PropTypes.object
};
