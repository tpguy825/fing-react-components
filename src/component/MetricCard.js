/**
 * Created by marco on 2/6/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import PropTypes from "prop-types";

/**
 * Standard navigation bar.
 */
export default class MetricCard extends Component {

    render() {
        const { metric, description, icon, bgColor, extra } = this.props;
        return (
            <div className={`card border-0 shadow-none mr-2 mb-2 ${bgColor}`} style={{ height: "150px", width: "180px" }}>
                <div className={`card-body card-body-centered`}>
                    <h2 className="mb-0">{metric}</h2>
                    <div className="list-inline">
                        <p className="list-inline-item mb-0 text-dark">{description}</p> 
                        <div className="list-inline-item">{icon}</div>
                    </div>
                    <small className="text-dark">{extra}</small>
                </div>
            </div>
        )
    }
}

MetricCard.propTypes = {
    metric: PropTypes.string,
    description: PropTypes.string,
    bgColor: PropTypes.string,
    extra: PropTypes.string,
    icon: PropTypes.node 
};