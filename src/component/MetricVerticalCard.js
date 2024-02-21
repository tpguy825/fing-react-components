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
export default class MetricVerticalCard extends Component {

    render() {
        const {title, titleIcon, value, measure, extra, extraIcon, className, compact} = this.props;
        const cName = className || "";
        return (
            <div className={"bg-soft-primary rounded " + cName}>
                <div className="d-flex justify-content-center align-items-center">
                    {titleIcon}
                    <h5 className="ml-2 mb-0">{title}</h5>
                </div>
                <h3 className="text-center mb-0">
                    {value}
                    <small className="ml-1 text-secondary">{measure}</small>
                </h3>
                {!compact &&
                <div className="d-flex justify-content-center">
                    {extraIcon}
                    <small className="ml-2 mb-0 text-secondary">{extra}</small>
                </div>
                }
            </div>
        )
    }
}

MetricVerticalCard.propTypes = {
    title: PropTypes.string,
    titleIcon: PropTypes.node,
    className: PropTypes.string,
    compact: PropTypes.bool,
    value: PropTypes.string,
    measure: PropTypes.string,
    extra: PropTypes.string,
    extraIcon: PropTypes.node 
};