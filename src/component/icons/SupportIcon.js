/**
 * Created by marco on 2/6/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';

import {ReactComponent as Twitter} from "../../assets/svg/social/x-twitter.svg";
import {ReactComponent as Facebook} from "../../assets/svg/social/facebook.svg";
import {ReactComponent as Website} from "../../assets/svg/social/website.svg";
import {ReactComponent as Phone} from "../../assets/svg/social/phone.svg";
import PropTypes from 'prop-types';

import {
    SI_ALL_TYPES,
    SI_TWITTER,
    SI_PHONE,
    SI_FACEBOOK,
    SI_WEBSITE
} from '../../model/Constants';

const defaultIconSize = "24px";

export default class SupportIcon extends Component {

    constructor(props, context) {
        super(props, context);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        if (this.props.onClick && !this.props.disabled) {
            this.props.onClick();
        }
    }

    render() {
        const {type, size, disabled} = this.props;
        if (!SI_ALL_TYPES.includes(type))
            return "";
        const cName = this.props.className || '';
        const iconSize = size || defaultIconSize;
        const linkClass = !disabled ? 'icon-svg-link' : 'fill-dark'
        return  <figure className={`svg-icon ${linkClass} `}>
                    <div    role="button" 
                            onClick={() => this.onClick()} 
                            className={`${cName}`}>
                        {this.renderIcon(type, iconSize)}
                    </div>
                </figure>
    }

    renderIcon(type, iconSize) {
        if (!type) return "";

        switch (type.toUpperCase()) {
            case SI_PHONE:
                return <Phone width={iconSize} height={iconSize}/>;
            case SI_TWITTER:
                return <Twitter width={iconSize} height={iconSize}/>;
            case SI_WEBSITE:
                return <Website width={iconSize} height={iconSize}/>;
            case SI_FACEBOOK:
                return <Facebook width={iconSize} height={iconSize}/>;
            default:
                return "";
        }
    }
}

SupportIcon.propTypes = {
    size: PropTypes.number,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    type: PropTypes.oneOf([SI_FACEBOOK, SI_WEBSITE, SI_TWITTER, SI_PHONE]),
};