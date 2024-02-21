import React, {Component} from 'react';
import PropTypes from 'prop-types';

import intl from "react-intl-universal";
import nextId from 'react-id-generator';
import InternetTimelineTableRow from './InternetTimelineTableRow';
import { renderInternetTimelineTableHeader } from '../../helpers/TableHelper';

export default class InternetTimelineTable extends Component {

    constructor(props, context) {
        super(props, context);
        this.tableId = `speed_test_timeline_table_${nextId()}`;
    }

    render() {
        const {samples, servers} = this.props;
        if (samples) {
            return (
                <table className="table table-borderless table-striped table-align-middle table-responsive-flip">
                    {renderInternetTimelineTableHeader()}
                    <tbody>
                        {samples.reverse().map((sample, idx) =>
                            <InternetTimelineTableRow
                                key={`${this.tableId}_${idx}`}
                                item={sample}
                                servers={servers.length > 0 ? servers : []}/>)}
                    </tbody>
                </table>
            );
        }
        return (
            <div>{intl.get('internet_no_data_period_timeline')}</div>
        )
    }
}

InternetTimelineTable.propTypes = {
    samples: PropTypes.array,
    servers: PropTypes.array
};

