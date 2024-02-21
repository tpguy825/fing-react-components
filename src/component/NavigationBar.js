/**
 * Created by marco on 2/6/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * Standard navigation bar.
 */
export default class NavigationBar extends Component {

    render() {
        const {left, title, right, className} = this.props;

        const leftUI = this.renderComponent(left);
        const titleUI = this.renderTitle(title);
        const rightUI = this.renderComponent(right);
        const outerClass = className || '';

        return (
            <nav className={"position-relative d-flex justify-content-between align-items-center my-1 " + outerClass}
                 style={{minHeight: "2em"}}>
                {leftUI}
                <h6 className="position-absolute left-0 right-0 text-center font-weight-bold my-0">{titleUI}</h6>
                {rightUI}
            </nav>
        )
    }

    renderTitle(title) {
        return title || '';
    }

    renderComponent(comp) {
        // z-index to ensure the buttons are on top of the title block which has static positioning
        return comp ? <div className="z-index-2">{comp}</div> : '';
    }

}


NavigationBar.propTypes = {
    left: PropTypes.node, 
    title: PropTypes.string, 
    right: PropTypes.node, 
    className: PropTypes.string
};