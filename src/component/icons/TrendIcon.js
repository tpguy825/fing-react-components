/**
 * Created by marco on 2/6/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {ReactComponent as TrendUp} from "../../assets/svg/trend/trending-up.svg";
import {ReactComponent as TrendUpFast} from "../../assets/svg/trend/trending-up-fast.svg";
import {ReactComponent as TrendDown} from "../../assets/svg/trend/trending-down.svg";
import {ReactComponent as TrendDownFast} from "../../assets/svg/trend/trending-down-fast.svg";

import {
    TI_ALL_TYPES,
    TI_UP,
    TI_DOWN,
    TI_UP_FAST,
    TI_DOWN_FAST,
    TINT_DANGER,
    TINT_SECONDARY,
    TINT_NAVY,
    TINT_PRIMARY,
    TINT_SUCCESS,
    TINT_WARNING,
    TINT_DARK
} from "../../model/Constants";

const defaultIconSize = "24px";

export default class TrendIcon extends Component {

    tintToClass(tint){
        if (!tint) return "fill-primary";
        switch (tint) {
            case TINT_PRIMARY: return "fill-primary";
            case TINT_SECONDARY: return "fill-secondary";
            case TINT_SUCCESS: return "fill-success";
            case TINT_WARNING: return "fill-warning";
            case TINT_DANGER: return "fill-danger";
            case TINT_NAVY: return "fill-navy";
            case TINT_DARK: return "fill-dark";
            default: return "fill-primary";
        }
    }
    render() {
        const { type, size, tint } = this.props;

        if (!TI_ALL_TYPES.includes(type))
            return "";

        const className = this.props.className || '';
        const currentTint = this.tintToClass(tint);
        const iconSize = size || defaultIconSize;
        return <figure className={`svg-icon ${className} ${currentTint}`}>{this.renderIcon(type, iconSize)}</figure>;
    }

    renderIcon(type, iconSize) {
        if (!type) return "";

        switch (type.toUpperCase()) {
            case TI_UP:
                return <TrendUp width={iconSize} height={iconSize} />;
            case TI_UP_FAST:
                return <TrendUpFast width={iconSize} height={iconSize} />;
            case TI_DOWN:
                return <TrendDown width={iconSize} height={iconSize} />;
            case TI_DOWN_FAST:
                return <TrendDownFast width={iconSize} height={iconSize} />;
            
            default:
                return "";
        }
    }
 
}
TrendIcon.propTypes = {
    size: PropTypes.number,
    type: PropTypes.oneOf([TI_DOWN, TI_DOWN_FAST, TI_UP, TI_UP_FAST]),
    tint: PropTypes.oneOf([TINT_DANGER, TINT_SECONDARY, TINT_NAVY,TINT_PRIMARY,TINT_SUCCESS,TINT_WARNING]),
};