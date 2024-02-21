/**
 * Created by marco on 3/5/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import intl from 'react-intl-universal';
import PropTypes from "prop-types";

export default class EmptyState extends Component {

    render() {
        const {image, caption, title, subtitle, className, action} = this.props;
        return (
            <div className={`text-center ${className || "m-8"}`}>
                <figure className="opacity">
                    <img className="mx-auto" src={image} height={"256px"}
                         alt={caption || intl.get('empty_state_title_fallback')} />
                </figure>
                <h4>{title || intl.get('empty_state_title_fallback')}</h4>
                <p className="mx-6">{subtitle || intl.get('empty_state_subtitle_fallback')}</p>
                {action}
            </div>
        );
    }

}

EmptyState.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    className: PropTypes.string,
    caption: PropTypes.string,
    image: PropTypes.node,
    action: PropTypes.object,
};