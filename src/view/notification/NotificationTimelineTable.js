import React, {Component} from 'react';
import PropTypes from 'prop-types';

import intl from "react-intl-universal";
import nextId from 'react-id-generator';
import { renderNotificationTimelineTableHeader } from '../../helpers/TableHelper';
import NotificationTimelineTableRow from './NotificationTimelineTableRow';

export default class NotificationTimelineTable extends Component {

    constructor(props, context) {
        super(props, context);
        this.tableId = `notification_timeline_table_${nextId()}`;
    }

    render() {
        const {notifications, onClickNotification} = this.props;
        if (notifications && notifications.length > 0) {
            return (
                <table className="table table-borderless table-striped table-align-middle table-responsive-flip">
                    {renderNotificationTimelineTableHeader()}
                    <tbody>
                        {notifications.map((item, idx) =>
                            <NotificationTimelineTableRow   
                                key={`${this.tableId}_${idx}`} 
                                onClickNotification={onClickNotification} 
                                item={item}/>)}
                    </tbody>
                </table>
            );
        }
        return (
            <div>{intl.get('timeline_no_notification')}</div>
        )
    }
}

NotificationTimelineTable.propTypes = {
    notifications: PropTypes.array,
    onClickNotification: PropTypes.func
};

