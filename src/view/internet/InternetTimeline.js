import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
    TIME_DISTANCE_TODAY,
    TIME_DISTANCE_YESTERDAY,
    TIME_DISTANCE_7D,
    TIME_DISTANCE_14D,
    TIME_DISTANCE_21D,
    TIME_DISTANCE_OLDER
} from '../../helpers/DateHelper';
import intl from "react-intl-universal";
import nextId from 'react-id-generator';
import InternetTimelineTable from './InternetTimelineTable';
import { groupEventsByTimeDistance } from '../../helpers/DateHelper';

export default class InternetTimeline extends Component {

    constructor(props, context) {
        super(props, context);
        this.tableId = `speed_test_timeline_table_${nextId()}`;

    }

    render() {
        const {istAnalysis, maxDays, extra} = this.props;
        if (!istAnalysis) {
            return ''
        }
        const samples = istAnalysis.samples;
        const eventsByDistance = groupEventsByTimeDistance(samples, (sample => sample.timestamp));
        const maxDaysUnlimited = !maxDays && maxDays !== 0;
        const ifMaxDaysAtLeast = days => maxDaysUnlimited || maxDays >= days;
        
        return (
            <>
                {ifMaxDaysAtLeast(1) && this.renderSection(intl.get('relative_today'), eventsByDistance[TIME_DISTANCE_TODAY])}
                {ifMaxDaysAtLeast(2) && this.renderSection(intl.get('relative_yesterday'), eventsByDistance[TIME_DISTANCE_YESTERDAY])}
                {ifMaxDaysAtLeast(7) && this.renderSection(intl.get('relative_current_week'), eventsByDistance[TIME_DISTANCE_7D])}
                {ifMaxDaysAtLeast(14) && this.renderSection(intl.get('relative_week_long', {amount: 2}), eventsByDistance[TIME_DISTANCE_14D])}
                {ifMaxDaysAtLeast(21) && this.renderSection(intl.get('relative_week_long', {amount: 3}), eventsByDistance[TIME_DISTANCE_21D])}
                {maxDaysUnlimited && this.renderSection(intl.get('relative_older'), eventsByDistance[TIME_DISTANCE_OLDER])}
                {!maxDaysUnlimited && extra}
            </>
        );
    }

    renderSection(title, samples) {
        const {istAnalysis} = this.props;
        return (
            <div className="mb-3">
                <h4>{title}</h4>
                <hr/>
                {samples ? <InternetTimelineTable samples={samples} servers={istAnalysis.servers}/> :
                    <div>{intl.get('timeline_no_sample')}</div>}
            </div>

        );
    }
}

InternetTimeline.propTypes = {
    istAnalysis: PropTypes.object,
    maxDays: PropTypes.number,
    extra: PropTypes.node
};

