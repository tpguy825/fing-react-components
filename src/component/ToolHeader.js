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
export default class ToolHeader extends Component {

    render() {
        const {title, subtitle, statusIcon, action, progressBar, className} = this.props;

        const titleUI = this.renderTitle(title);
        const subtitleUI = this.renderSubtitle(subtitle);
        const actionUI = this.renderComponent(action);
        const progressUI = this.renderComponent(progressBar);
        const outerClass = className || '';

        return (
            <section className={"mb-2 " + outerClass}>
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <div className="d-flex align-items-center">
                            {titleUI}
                            {statusIcon}
                        </div>
                        <div>
                            {subtitleUI}
                        </div>
                    </div>
                    {actionUI}
                </div>
                {progressUI}
            </section>
        )
    }

    renderTitle(title) {
        return title ? <h3 className="mb-0 mr-2">{title}</h3> :  '';
    }

    renderSubtitle(subtitle) {
        return subtitle || '';
    }

    renderComponent(comp) {
        return comp ? <div>{comp}</div> : '';
    }

}

ToolHeader.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    statusIcon: PropTypes.node,
    action: PropTypes.node,
    progressBar: PropTypes.node,
    className: PropTypes.string
};