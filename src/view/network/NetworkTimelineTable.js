/**
 * Created by marco on 09/06/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import intl from 'react-intl-universal';
import nextId from "react-id-generator";
import PropTypes from "prop-types";
import NetworkTimelineTableRow from "./NetworkTimelineTableRow";
import { renderNetworkTimelineTableHeader } from '../../helpers/TableHelper';

export default class NetworkTimelineTable extends Component {

    constructor(props) {
        super(props);
        this.tableId = `net_timeline_table_${nextId()}`;
    }

    render() {
        const {onInspect, onDrillDown, netEvents} = this.props;
        if (!netEvents) return "";
        const sortedNetEvents = netEvents.sort((a,b) => (b.sharpTime || b.timestamp) - (a.sharpTime || a.timestamp));

        return (
            <table className="table table-sm table-borderless table-responsive-flip table-align-middle">
                {renderNetworkTimelineTableHeader()}
                <tbody>
                {sortedNetEvents.map((netEvent,idx) =>
                    <NetworkTimelineTableRow 
                        key={`${this.tableId}_${idx}`} 
                        netEvent={netEvent} 
                        onDrillDown={onDrillDown} 
                        onInspect={onInspect}/>)}
                </tbody>
            </table>
        )
    }
}

NetworkTimelineTable.propTypes = {
    netEvents: PropTypes.array,
    onInspect: PropTypes.func,
    onDrillDown: PropTypes.func,
}