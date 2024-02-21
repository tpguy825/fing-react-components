/**
 * Created by marco on 3/5/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import PropTypes from "prop-types";

export default class PromoState extends Component {

    render() {
        const {image, caption, title, subtitle, className, action} = this.props;
        return (
            <div className={`${className || "m-8"} d-flex align-items-center`}>
                <figure>
                    <img className="mx-auto" src={image} height={"256px"}
                         alt={caption} />
                </figure>
                <div className="ml-3">
                    <h4>{title}</h4>
                    <p>{subtitle}</p>
                    {action}
                </div>
            </div>
        );
    }

}

PromoState.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    className: PropTypes.string,
    caption: PropTypes.string,
    image: PropTypes.node,
    action: PropTypes.object,
};