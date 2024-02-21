/**
 * Created by marco on 2/6/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Use
export const sidebarOptions = function (target) {
    return JSON.stringify({
        "target": "#" + target,
        "type": "css-animation",
        "animationIn": "fadeInRight",
        "animationOut": "fadeOutRight",
        "hasOverlay": "rgba(55, 125, 255, 0.1)",
        "smartPositionOff": true
    });
};

/**
 * Standard modal dialog.
 */
export default class ModalSidebar extends Component {

    componentDidMount() {
        window.initDropdown();
    }

    render() {
        const target = this.props.id;
        const children = React.Children.toArray(this.props.children);
        const bodyElem = children.length >= 1 ? children[0] : null;
        const footerElem = children.length >= 2 ? children[1] : null;
        const hasBody = bodyElem !== null;
        const hasFooter = footerElem !== null;

        return (
            <aside id={target} className="hs-unfold-content sidebar">
                <div className="sidebar-scroller">
                    <div className="sidebar-container">
                        <div className="sidebar-footer-offset" style={{paddingBottom: "7rem"}}>
                            {this.renderHeader()}
                            {hasBody && bodyElem}
                        </div>

                        {hasFooter && footerElem}
                    </div>
                </div>
            </aside>
        )
    }

    renderHeader() {
        const target = this.props.id;
        return <div className="d-flex justify-content-end align-items-center pt-4 px-4">
            <div className="hs-unfold">
                <a className="js-hs-unfold-invoker btn btn-icon btn-xs btn-soft-secondary"
                   href="javascript:"
                   data-hs-unfold-options={sidebarOptions(target)}>
                    <svg width="10" height="10" viewBox="0 0 18 18"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fill="currentColor"
                              d="M11.5,9.5l5-5c0.2-0.2,0.2-0.6-0.1-0.9l-1-1c-0.3-0.3-0.7-0.3-0.9-0.1l-5,5l-5-5C4.3,2.3,3.9,2.4,3.6,2.6l-1,1 C2.4,3.9,2.3,4.3,2.5,4.5l5,5l-5,5c-0.2,0.2-0.2,0.6,0.1,0.9l1,1c0.3,0.3,0.7,0.3,0.9,0.1l5-5l5,5c0.2,0.2,0.6,0.2,0.9-0.1l1-1 c0.3-0.3,0.3-0.7,0.1-0.9L11.5,9.5z"/>
                    </svg>
                </a>
            </div>
        </div>;
    }
}

/**
 * Standard modal dialog body.
 */
export class ModalSidebarBody extends Component {

    render() {
        const {className} = this.props;
        return (
            <div className="scrollbar sidebar-body">
                <div className={`sidebar-content ${className || "py-2 px-4"}`}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

/**
 * Standard modal dialog footer.
 */
export class ModalSidebarFooter extends Component {

    render() {
        const {className} = this.props;
        return (
            <footer className={`sidebar-footer ${className || "py-2 px-4"}`}>
                {this.props.children}
            </footer>
        )
    }
}

ModalSidebar.propTypes = {
    id:PropTypes.string,
    children: PropTypes.array
};