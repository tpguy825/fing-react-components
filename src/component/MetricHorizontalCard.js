/**
 * Created by marco on 2/6/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import PropTypes from "prop-types";

/**
  * A horizontal layout card to show metrics and optional trend.
  */
export default class MetricHorizontalCard extends Component {

    render() {
        const {title, value, measure, extra, extraIcon, className} = this.props;
        const cName = className || "";
        return (
            <div className={"bg-soft-primary rounded " + cName}>
                <div className="text-left">
                    <div className="d-flex align-items-baseline">
                        <small>{title}</small>
                        {extra &&
                        <>
                            <div className="ml-2">
                                {extraIcon}
                            </div>
                            <small className="mx-1 mb-0">{extra}</small>
                        </>
                        }
                    </div>
                    <h3 className="mb-0">{value}<small className="ml-1 text-secondary">{measure}</small></h3>
                </div>
            </div>
        )
    }
}
MetricHorizontalCard.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.string,
    measure: PropTypes.string,
    extra: PropTypes.string,
    extraIcon: PropTypes.node 
};