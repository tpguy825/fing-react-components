/**
 * Created by marco on 2/6/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 */
export default class StatusBadge extends Component {

    render() {
        const {label, icon, className} = this.props;
        const labelUI = this.renderLabel(label);
        const iconUI = this.renderIcon(label, icon);
        const cName = className || '';
        return (
            <span className={`badge ${cName}`}>{labelUI}{iconUI}</span>
        );
    }

    renderLabel(label) {
        return label || '';
    }

    renderIcon(label, icon) {
        const margin = label ? "ml-2" : '';
        return icon ? <small className={`fas ${icon} ${margin}`}/> : '';
    }


}

StatusBadge.propTypes = {
    icon: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string
};
