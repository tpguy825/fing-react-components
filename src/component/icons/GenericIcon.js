/**
 * Created by marco on 2/6/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ReactComponent as Flag} from "../../assets/svg/generic/flag.svg";
import {ReactComponent as FlagOut} from "../../assets/svg/generic/flag_out.svg";
import {ReactComponent as TrendUp} from "../../assets/svg/generic/trending-up.svg";
import {ReactComponent as TrendFlat} from "../../assets/svg/generic/trending-flat.svg";
import {ReactComponent as TrendDown} from "../../assets/svg/generic/trending-down.svg";
import {ReactComponent as Question} from "../../assets/svg/generic/question.svg";
import {ReactComponent as Location} from "../../assets/svg/generic/location.svg";
import {ReactComponent as ArrowUp} from "../../assets/svg/generic/up.svg";
import {ReactComponent as ArrowDown} from "../../assets/svg/generic/down.svg";
import {ReactComponent as QuestionCircle} from "../../assets/svg/generic/question-circle.svg";
import {ReactComponent as Info} from "../../assets/svg/generic/info.svg";
import {ReactComponent as Badge} from "../../assets/svg/generic/badge.svg";

import {
    GEN_ALL_TYPES,
    GEN_UP,
    GEN_DOWN,
    GEN_LOCATION,
    GEN_QUESTION,
    GEN_QUESTION_CIRCLE,
    GEN_INFO,
    GEN_TREND_DOWN,
    GEN_TREND_FLAT,
    GEN_TREND_UP,
    GEN_BADGE,
    TINT_INDIGO,
    TINT_DANGER,
    TINT_PRIMARY,
    TINT_SUCCESS,
    TINT_WARNING,
    TINT_NAVY,
    TINT_DARK,
    TINT_PURPLE,
    GEN_FLAG,
    GEN_FLAG_OUT,
} from '../../model/Constants';
 
const defaultIconSize = "24px";

export default class GenericIcon extends Component {

    render() {
        const { type, size, color } = this.props;

        if (!GEN_ALL_TYPES.includes(type))
            return "";
            
        const currentTint = this.tintToClass(color);
        const className = this.props.className || '';
        const iconSize = size || defaultIconSize;
        return <figure 
            className={`svg-icon ${currentTint} ${className}`}>{this.renderIcon(type, iconSize)}</figure>;
    }

    tintToClass(tint){
        if (!tint) return "fill-primary";
        switch (tint) {
            case TINT_PRIMARY: return "fill-primary";
            case TINT_SUCCESS: return "fill-success";
            case TINT_WARNING: return "fill-warning";
            case TINT_DANGER: return "fill-danger";
            case TINT_DARK: return "fill-dark";
            case TINT_INDIGO: return "fill-indigo";
            case TINT_NAVY: return "fill-navy";
            case TINT_PURPLE: return "fill-purple";
            default: return "fill-primary";
        }
    }

    renderIcon(type, iconSize) {
        if (!type) return "";

        switch (type.toUpperCase()) {
            case GEN_LOCATION:
                return <Location width={iconSize} height={iconSize} />; 
            case GEN_UP:
                return <ArrowUp width={iconSize} height={iconSize} />; 
            case GEN_DOWN:
                return <ArrowDown width={iconSize} height={iconSize} />; 
            case GEN_QUESTION:
                return <Question width={iconSize} height={iconSize} />; 
            case GEN_QUESTION_CIRCLE:
                return <QuestionCircle width={iconSize} height={iconSize} />;
            case GEN_INFO:
                return <Info width={iconSize} height={iconSize} />;
            case GEN_TREND_UP:
                return <TrendUp width={iconSize} height={iconSize} />; 
            case GEN_TREND_DOWN:
                return <TrendDown width={iconSize} height={iconSize} />; 
            case GEN_TREND_FLAT:
                return <TrendFlat width={iconSize} height={iconSize} />;
            case GEN_BADGE:
                return <Badge width={iconSize} height={iconSize} />;
            case GEN_FLAG_OUT:
                return <FlagOut width={iconSize} height={iconSize} />;
            case GEN_FLAG:
                return <Flag width={iconSize} height={iconSize} />;
            default:
                return "";
        }
    }

}

GenericIcon.propTypes = {
    size: PropTypes.number,
    type: PropTypes.oneOf([GEN_LOCATION, GEN_UP, GEN_DOWN, GEN_QUESTION, GEN_QUESTION_CIRCLE, GEN_INFO, GEN_TREND_UP, GEN_TREND_DOWN, GEN_TREND_FLAT, GEN_BADGE, GEN_FLAG_OUT, GEN_FLAG]),
    color: PropTypes.oneOf([TINT_PRIMARY, TINT_SUCCESS, TINT_WARNING, TINT_DANGER, TINT_DARK, TINT_INDIGO, TINT_NAVY, TINT_PURPLE]),
};