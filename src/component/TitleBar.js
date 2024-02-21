/**
 * Created by marco on 2/6/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ActionButton, {BTN_SIZE_BIG, BTN_TINT_PRIMARY} from "./ActionButton";

/**
 * Standard navigation bar.
 */
export default class TitleBar extends Component {

    render() {
        const {title, right, className} = this.props;

        const titleUI = this.renderTitle(title);
        const rightUI = this.renderComponent(right);
        const outerClass = className || "mb-2";

        return (
            <>
                <div className={`d-flex align-items-center ${outerClass}`}>
                    {titleUI}
                    {rightUI}
                </div>
            </>
        )
    }

    renderTitle(title) {
        return <h3 className="font-weight-bolder mb-0">{title || ''}</h3>
    }

    renderComponent(comp) {
        // z-index to ensure the buttons are on top of the title block which has static positioning
        return comp ? <div className="ml-auto">{comp}</div> : '';
    }

}


TitleBar.propTypes = {
    title: PropTypes.string,
    right: PropTypes.string, 
    className: PropTypes.string
};