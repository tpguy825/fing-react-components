import React, {Component} from 'react';
import intl from "react-intl-universal";
import PropTypes from 'prop-types';

import {RTI_STAR} from '../../component/icons/RatingTypeIcon';
import {TINT_WARNING} from '../../model/Constants';
import {rankStringWithLocation} from '../../helpers/NetworkHelper';
import RatingBar, {RB_SMALL} from '../../component/RatingBar';
import {getCountryName} from "../../helpers/GeoCountriesHelper";

export default class InternetScoreSection extends Component {

    render() {
        const {internetInfo, istAnalysis} = this.props;

        const ispStats = istAnalysis.statsIsp;

        let score = 0;
        let location = "";
        if (ispStats && ispStats.country) {
            const country = getCountryName(ispStats.country);
            if (ispStats.city) {
                location = ispStats.city + ", " + country;
                score = istAnalysis.scoreInCity;
            } else {
                location = country;
                score = istAnalysis.scoreInCountry;
            }
        }

        const hasScore = internetInfo && ispStats && score;
        const finalScore = hasScore ? score * 5 : 0;
        const rankString = hasScore ? rankStringWithLocation(score*100, location) : intl.get('internet_no_data');

        return (
            <section className="pt-2">
                <div className="mb-4">
                    <h3 className="mb-0">{intl.get('internet_score')}</h3>
                    <div className="mb-2">{rankString}</div>
                    <RatingBar tint={TINT_WARNING}
                               length={5}
                               value={finalScore}
                               type={RTI_STAR}
                               size={RB_SMALL}/>
                </div>
                
            </section>
        );
    }
}

InternetScoreSection.propTypes = {
    internetInfo: PropTypes.object,
    istAnalysis: PropTypes.object
};