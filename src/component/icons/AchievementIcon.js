/**
 * Created by marco on 2/6/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {ReactComponent as Work} from "../../assets/svg/achieve/work.svg";
import {ReactComponent as Video} from "../../assets/svg/achieve/video.svg";
import {ReactComponent as Social} from "../../assets/svg/achieve/social.svg";
import {ReactComponent as Game} from "../../assets/svg/achieve/game.svg";
import {ReactComponent as Call} from "../../assets/svg/achieve/call.svg";
import {
    AI_ALL_TYPES,
    AI_VIDEO,
    AI_GAME,
    AI_WORK,
    AI_SOCIAL,
    AI_CALL,
    TINT_DANGER,
    TINT_PRIMARY,
    TINT_SUCCESS,
    TINT_WARNING,
    TINT_NAVY,
    TINT_DARK
} from '../../model/Constants';
 
const defaultIconSize = "24px";


export default class AchievementIcon extends Component {

    render() {
        const { type, size, color} = this.props;

        if (!AI_ALL_TYPES.includes(type))
            return "";
            
        const currentTint = this.tintToClass(color);
        const className = this.props.className || '';
        const iconSize = size || defaultIconSize;
        return <figure className={`svg-icon ${currentTint} ${className}`}>{this.renderIcon(type, iconSize)}</figure>;
    }
    tintToClass(tint){
        if (!tint) return "fill-primary";
        switch (tint) {
            case TINT_DARK: return "fill-dark";
            case TINT_PRIMARY: return "fill-primary";
            case TINT_SUCCESS: return "fill-success";
            case TINT_WARNING: return "fill-warning";
            case TINT_DANGER: return "fill-danger";
            case TINT_NAVY: return "fill-navy";
            default: return "fill-primary";
        }
    }


    renderIcon(type, iconSize) {
        if (!type) return "";
        

        switch (type.toUpperCase()) {
           
            case AI_SOCIAL:
                return <Social width={iconSize} height={iconSize} />; 
            case AI_WORK:
                return <Work width={iconSize} height={iconSize} />; 
            case AI_VIDEO:
                return <Video width={iconSize} height={iconSize} />; 
            case AI_CALL:
                return <Call width={iconSize} height={iconSize} />; 
            case AI_GAME:
                return <Game width={iconSize} height={iconSize} />; 
           
            default:
                return "";
        }
    }

}
AchievementIcon.propTypes = {
    size: PropTypes.number,
    type: PropTypes.oneOf([AI_GAME, AI_CALL, AI_VIDEO, AI_WORK, AI_SOCIAL]),
    color: PropTypes.oneOf([TINT_DARK, TINT_DANGER,TINT_NAVY,TINT_PRIMARY,TINT_SUCCESS,TINT_WARNING]),
};