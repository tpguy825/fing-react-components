import React, {Component} from "react";
import intl from "react-intl-universal";
import PropTypes from 'prop-types';
import {
    TIME_DISTANCE_14D,
    TIME_DISTANCE_21D,
    TIME_DISTANCE_7D,
    TIME_DISTANCE_OLDER,
    TIME_DISTANCE_TODAY,
    TIME_DISTANCE_YESTERDAY
} from '../../helpers/DateHelper';

import NetworkTimelineTable from "./NetworkTimelineTable";
import { groupEventsByTimeDistance } from "../../helpers/DateHelper";
import ActionButton from "../../component/ActionButton";

const TIMELINE_PAGINATION_MAX_EVENTS = 100;

export default class NetworkTimeline extends Component {
    state = {
        maxEventIndex: TIMELINE_PAGINATION_MAX_EVENTS
    }

    render() {
        const { netEvents, maxDays } = this.props;
        const { maxEventIndex } = this.state;

        const extractionFn = netEvent => netEvent.sharpTime || netEvent.timestamp;

        const maxDaysUnlimited = !maxDays && maxDays !== 0;
        const fullEventsByTimeDistance = groupEventsByTimeDistance(netEvents, extractionFn);
        const unlockedEventsLength = (!maxDays && maxDays !== 0 ? netEvents.length : this.getUnlockedEventsLength(fullEventsByTimeDistance, maxDays)) || 0;
        const slicedNetEvents = netEvents.slice(0, Math.min(maxEventIndex, netEvents.length));
        const eventsByDistance = groupEventsByTimeDistance(slicedNetEvents, extractionFn);

        const ifMaxDaysAtLeast = days => maxDaysUnlimited || maxDays >= days;
        const hasNotBeenPreviouslySliced = timeDistance => {
            const keys = [
                TIME_DISTANCE_TODAY,
                TIME_DISTANCE_YESTERDAY,
                TIME_DISTANCE_7D,
                TIME_DISTANCE_14D,
                TIME_DISTANCE_21D,
                TIME_DISTANCE_OLDER
            ];

            let fullLength = 0, slicedLength = 0;

            for (let key of keys) {
                if (key === timeDistance) {
                    break;
                }

                fullLength += (fullEventsByTimeDistance[key] || []).length;
                slicedLength += (eventsByDistance[key] || []).length;

                if (fullLength !== slicedLength) {
                    return false;
                }
            }

            return true;
        };

        return (
            <div>
                {ifMaxDaysAtLeast(1) && hasNotBeenPreviouslySliced(TIME_DISTANCE_TODAY) && this.renderEventSection(intl.get('relative_today'), eventsByDistance[TIME_DISTANCE_TODAY])}
                {ifMaxDaysAtLeast(2) && hasNotBeenPreviouslySliced(TIME_DISTANCE_YESTERDAY) && this.renderEventSection(intl.get('relative_yesterday'), eventsByDistance[TIME_DISTANCE_YESTERDAY])}
                {ifMaxDaysAtLeast(7) && hasNotBeenPreviouslySliced(TIME_DISTANCE_7D) && this.renderEventSection(intl.get('relative_current_week'), eventsByDistance[TIME_DISTANCE_7D])}
                {ifMaxDaysAtLeast(14) && hasNotBeenPreviouslySliced(TIME_DISTANCE_14D) && this.renderEventSection(intl.get('relative_week_long', { amount: 2 }), eventsByDistance[TIME_DISTANCE_14D])}
                {ifMaxDaysAtLeast(21) && hasNotBeenPreviouslySliced(TIME_DISTANCE_21D) && this.renderEventSection(intl.get('relative_week_long', { amount: 3 }), eventsByDistance[TIME_DISTANCE_21D])}
                {maxDaysUnlimited && hasNotBeenPreviouslySliced(TIME_DISTANCE_OLDER) && this.renderEventSection(intl.get('relative_older'), eventsByDistance[TIME_DISTANCE_OLDER])}
                {React.Children.toArray(this.props.children)}
                {maxEventIndex < unlockedEventsLength &&
                    <div className="d-flex">
                        <ActionButton title={intl.get("discovery_events_timeline_more")}
                                      action={() => this.setState({maxEventIndex : maxEventIndex + TIMELINE_PAGINATION_MAX_EVENTS})} />
                        <span className="ml-auto">{slicedNetEvents.length + "/" + unlockedEventsLength}</span>
                    </div>
                }
            </div>
        );
    }

    renderEventSection(title, events) {
        const {onInspect, onDrillDown} = this.props;
        return (
            <div className="mb-6">
                <div className="mb-3 border-bottom d-flex">
                    <h3>{title}</h3>
                </div>
                {events ? 
                    <NetworkTimelineTable 
                        netEvents={events} 
                        onInspect={onInspect} 
                        onDrillDown={onDrillDown}/> :
                    <div>{intl.get('discovery_events_no_in_this_period')}</div>}
            </div>
        );
    }

    getUnlockedEventsLength(eventsByDistance, maxDays) {
        let length = 0;
        const addLength = timeDistance => length += (eventsByDistance[timeDistance] || []).length;

        addLength(TIME_DISTANCE_TODAY);

        if (maxDays < 2) {
            return length;
        }

        addLength(TIME_DISTANCE_YESTERDAY);
        
        if (maxDays < 7) {
            return length;
        }

        addLength(TIME_DISTANCE_7D);

        if (maxDays < 14) {
            return length;
        }

        addLength(TIME_DISTANCE_14D);

        if (maxDays < 21) {
            return length;
        }

        addLength(TIME_DISTANCE_21D);

        if (maxDays <= 21) {
            return length;
        }

        addLength(TIME_DISTANCE_OLDER);
        return length;
    }
}

NetworkTimeline.propTypes = {
    netEvents: PropTypes.array,
    onInspect: PropTypes.func,
    onDrillDown: PropTypes.func,
    maxDays: PropTypes.number
};
