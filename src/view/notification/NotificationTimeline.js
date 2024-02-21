import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
    TIME_DISTANCE_TODAY,
    TIME_DISTANCE_YESTERDAY,
    TIME_DISTANCE_OLDER,
    groupOldNotificationsByTimeDistance
} from '../../helpers/DateHelper';
import intl from "react-intl-universal";
import nextId from 'react-id-generator';
import NotificationTimelineTable from './NotificationTimelineTable';

export default class NotificationTimeline extends Component {

    constructor(props, context) {
        super(props, context);
        this.tableId = `notification_timeline_table_${nextId()}`;

    }

    render() {
        const {notifications} = this.props;
        const newNotifications = notifications && notifications.new;
        const oldNotifications = notifications && notifications.old;
        const oldNotificationsByDistance = groupOldNotificationsByTimeDistance(oldNotifications, (notification => notification.time));

        return (
            <>
                {this.renderSection('New',newNotifications)}
                {this.renderSection(intl.get('relative_today'), oldNotificationsByDistance[TIME_DISTANCE_TODAY])}
                {this.renderSection(intl.get('relative_yesterday'), oldNotificationsByDistance[TIME_DISTANCE_YESTERDAY])}
                {this.renderSection(intl.get('relative_older'), oldNotificationsByDistance[TIME_DISTANCE_OLDER])}
            </>
        );
    }

    renderSection(title, notifications) {
        return (
            <div className="mb-3">
                <h4>{title}</h4>
                <hr/>
                {notifications ? 
                    <NotificationTimelineTable 
                        notifications={notifications} 
                        onClickNotification={this.props.onClickNotification}/> :
                    <div>{intl.get('timeline_no_notification')}</div>}
            </div>

        );
    }
}

NotificationTimeline.propTypes = {
    notifications: PropTypes.object,
    onClickNotification: PropTypes.func
};

