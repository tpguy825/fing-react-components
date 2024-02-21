/**
 * Created by marco on 17/11/2019.
 *
 * (C) Copyright Fing
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StatusIcon, { SI_SHAPE_PLUS, SI_SHAPE_SHIELD } from './icons/StatusIcon';

export default class CardPanel extends Component {

    render() {
        const { title, subtitle, icon, className, usePlusIcon } = this.props;
        const cName = className || "d-flex align-items-start"
        return (
            <div className={cName}>
                {icon ? 
                <div className="mr-1">
                    <StatusIcon size={"24px"} shape={usePlusIcon ? SI_SHAPE_PLUS : SI_SHAPE_SHIELD} status={icon} />
                </div> : ''}
                <div className="d-block">
                    <h4 className="mb-1">{title}</h4>
                    <p className="mb-0 text-dark">{subtitle}</p>
                </div>
            </div>
        );
    }
}

CardPanel.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    icon: PropTypes.node,
    usePlusIcon: PropTypes.bool
};
