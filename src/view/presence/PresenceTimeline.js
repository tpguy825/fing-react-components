/**
 * Created by marco on 09/06/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import intl from 'react-intl-universal';
import {
    TIME_DISTANCE_14D, TIME_DISTANCE_21D,
    TIME_DISTANCE_7D, TIME_DISTANCE_OLDER,
    TIME_DISTANCE_TODAY,
    TIME_DISTANCE_YESTERDAY
} from "../../helpers/DateHelper";
import PresenceAvatarStrip from "./PresenceAvatarStrip";
import PresenceTimelineTable from "./PresenceTimelineTable";
import PropTypes from "prop-types";
import { groupEventsByTimeDistance } from '../../helpers/DateHelper';

export default class PresenceTimeline extends Component {

    render() {
        const {netEvents, maxDays} = this.props;

        const maxDaysUnlimited = !maxDays && maxDays !== 0;
        const ifMaxDaysAtLeast = days => maxDaysUnlimited || maxDays >= days;
        const eventsByDistance = groupEventsByTimeDistance(netEvents, netEvent => netEvent.timestamp);

        return (<div>
            {ifMaxDaysAtLeast(1) && this.renderEventSection(intl.get('relative_today'), eventsByDistance[TIME_DISTANCE_TODAY])}
            {ifMaxDaysAtLeast(2) && this.renderEventSection(intl.get('relative_yesterday'), eventsByDistance[TIME_DISTANCE_YESTERDAY])}
            {ifMaxDaysAtLeast(7) && this.renderEventSection(intl.get('relative_current_week'), eventsByDistance[TIME_DISTANCE_7D])}
            {ifMaxDaysAtLeast(14) && this.renderEventSection(intl.get('relative_week_long', { amount: 2 }), eventsByDistance[TIME_DISTANCE_14D])}
            {ifMaxDaysAtLeast(21) && this.renderEventSection(intl.get('relative_week_long', { amount: 3 }), eventsByDistance[TIME_DISTANCE_21D])}
            {maxDaysUnlimited && this.renderEventSection(intl.get('relative_older'), eventsByDistance[TIME_DISTANCE_OLDER])}
        </div>);
    }

    renderEventSection(title, events) {
        let contacts;
        if (events && events.length > 0) {
            contacts = Object.values(events
                .reduce((map, event) => {
                    if (event.contact && event.contact.contactId) {
                        map[event.contact.contactId] = event.contact;
                    }
                    return map;
                }, {}));
        }

        return (
            <div className="mb-6">
                <div className="mb-3 border-bottom d-flex">
                    <h3>{title}</h3>
                    {contacts && <PresenceAvatarStrip className="ml-auto" contacts={contacts} />}
                </div>

                {events ? <PresenceTimelineTable netEvents={events}/> :
                    <div>{intl.get('timeline_no_event')}</div>}

            </div>
        );
    }

}

PresenceTimeline.propTypes = {
    netEvents: PropTypes.array,
    maxDays: PropTypes.number
}