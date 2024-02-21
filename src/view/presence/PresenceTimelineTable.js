/**
 * Created by marco on 09/06/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import intl from 'react-intl-universal';
import PresenceTimelineTableRow from "./PresenceTimelineTableRow";
import nextId from "react-id-generator";
import PropTypes from "prop-types";
import { renderPresenceTimelineTableHeader } from '../../helpers/TableHelper';

export default class PresenceTimelineTable extends Component {

    constructor(props) {
        super(props);
        this.tableId = `people_timeline_table_${nextId()}`;
    }

    render() {
        const {netEvents} = this.props;
        if (!netEvents) return "";

        return (
            <table className="table table-sm table-borderless table-responsive-flip table-align-middle">
                {renderPresenceTimelineTableHeader()}
                <tbody>
                {netEvents.map((netEvent,idx) =>
                    <PresenceTimelineTableRow key={`${this.tableId}_${idx}`} netEvent={netEvent} />)}
                </tbody>
            </table>
        )
    }
}

PresenceTimelineTable.propTypes = {
    netEvents: PropTypes.array
}