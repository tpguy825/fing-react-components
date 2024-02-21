/**
 * Created by marco on 3/22/21.
 *
 * (C) Copyright Fing
 */

import React, {PureComponent} from 'react';
import intl from "react-intl-universal";
import SummarySection from '../../component/summary/SummarySection';
import { getCountryName } from '../../helpers/GeoCountriesHelper';
import { rankStringWithLocation } from '../../helpers/NetworkHelper';
import SummaryInternetScore from '../../component/summary/SummaryInternetScore';


// Why PureComponent?
// https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization
    
export default class CurrentNetworkScoreSection extends PureComponent {

    render() {
        const {istAnalysis} = this.props;
        if(!istAnalysis || !istAnalysis.statsIsp){
            return (
                <SummarySection>
                    <h3 className="mb-0">{intl.get("internet_performance_score")}</h3>
                    <p>{intl.get('internet_no_data')}</p>
                </SummarySection>
            );
        }
        const statsIsp = istAnalysis.statsIsp;
    
    
        let score = 0;
        let location = "";
        let hasScore = false;
        if (statsIsp && statsIsp.country) {
            if (statsIsp.city) {
                location = statsIsp.city + ", " + getCountryName(statsIsp.country);
                score = istAnalysis.scoreInCity ? istAnalysis.scoreInCity : 0;
            } else {
                location = getCountryName(statsIsp.country);
                score = istAnalysis.scoreInCountry ? istAnalysis.scoreInCountry : 0;
            }
            hasScore = true;
        }
    
        const finalScore = hasScore ? Math.ceil(score * 5) : 0;
        const rankString = hasScore ? rankStringWithLocation(score*100, location) : '';
            
        return (
            <SummarySection>
                <h3 className="mb-0">{intl.get("discovery_internet_performance_score")}</h3>
                <p className="mb-3">{rankString}</p>
                <SummaryInternetScore
                    leftText={intl.get("generic_worst")} 
                    rightText={intl.get("generic_best")} 
                    score={finalScore} 
                    infoText={intl.get('internet_score_info')}>
                    {React.Children.toArray(this.props.children)}
                </SummaryInternetScore>
            </SummarySection>
        );
    }
}


