import React, {Component} from 'react';


import {ReactComponent as BoltEmpty} from "../../assets/svg/rating/bolt_empty.svg";
import {ReactComponent as BoltFull} from "../../assets/svg/rating/bolt.svg";
import {ReactComponent as BoltHalf} from "../../assets/svg/rating/bolt_half.svg";
import {ReactComponent as DotEmpty} from "../../assets/svg/rating/dot_empty.svg";
import {ReactComponent as DotFull} from "../../assets/svg/rating/dot.svg";
import {ReactComponent as DotHalf} from "../../assets/svg/rating/dot_half.svg";
import {ReactComponent as HeartEmpty} from "../../assets/svg/rating/heart_empty.svg";
import {ReactComponent as HeartFull} from "../../assets/svg/rating/heart.svg";
import {ReactComponent as HeartHalf} from "../../assets/svg/rating/heart_half.svg";
import {ReactComponent as StarEmpty} from "../../assets/svg/rating/star_empty.svg";
import {ReactComponent as StarFull} from "../../assets/svg/rating/star.svg";
import {ReactComponent as StarHalf} from "../../assets/svg/rating/star_half.svg";
import PropTypes from 'prop-types';
import {
    TINT_PRIMARY,
    TINT_SUCCESS,
    TINT_WARNING,
    TINT_DANGER,
    TINT_NAVY, TINT_SECONDARY, TINT_DARK
} from '../../model/Constants';

const defaultIconSize = "24px";
export const RTI_EMPTY = "empty";
export const RTI_FULL = "full";
export const RTI_HALF = "half";
export const RATING_ALL_VARIANTS = [RTI_FULL,RTI_EMPTY,RTI_HALF];

export const RTI_BOLT = "bolt";
export const RTI_STAR = "star";
export const RTI_DOT = "dot";
export const RTI_HEART = "heart";
export const RATING_ALL_TYPES = [RTI_STAR,RTI_BOLT,RTI_DOT,RTI_HEART];

export default class RatingTypeIcon extends Component {

    constructor(props, context) {
        super(props, context);
        this.onClickListener = this.onClickListener.bind(this);
        this.onMouseEnterListener = this.onMouseEnterListener.bind(this);

    }
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
        const { type, size, variant, tint } = this.props; // onClick, onMouseEnter

        if (!RATING_ALL_TYPES.includes(type))
            return "";
        if (!RATING_ALL_VARIANTS.includes(variant))
            return "";

        const className = this.props.className || '';
        const currentTint = this.tintToClass(tint);
        const iconSize = size || defaultIconSize;
        return  <figure onClick={this.onClickListener} 
                        onMouseEnter={this.onMouseEnterListener} 
                        className={`svg-icon ${currentTint} ${className}`}>
                    {this.renderIcon(type, iconSize, variant)}
                </figure>;
    }

    onClickListener(){
        if(this.props.onClick){
            this.props.onClick()
        }
    }
    onMouseEnterListener(){
        if(this.props.onMouseEnter){
            this.props.onMouseEnter()
        }
    }

    renderIcon(type, iconSize, variantIcon) {
        
        if (!type || !variantIcon) return "";
        switch (type + "|" + variantIcon) {
            case RTI_STAR + "|" + RTI_EMPTY:
                return <StarEmpty width={iconSize} height={iconSize} />;
            case RTI_STAR + "|" + RTI_FULL:
                return <StarFull width={iconSize} height={iconSize} />;
            case RTI_STAR + "|" + RTI_HALF:
                return <StarHalf width={iconSize} height={iconSize} />;
            case RTI_DOT + "|" + RTI_EMPTY:
                return <DotEmpty width={iconSize} height={iconSize} />;
            case RTI_DOT + "|" + RTI_FULL:
                return <DotFull width={iconSize} height={iconSize} />;
            case RTI_DOT + "|" + RTI_HALF:
                return <DotHalf width={iconSize} height={iconSize} />;
            case RTI_BOLT + "|" + RTI_EMPTY:
                return <BoltEmpty width={iconSize} height={iconSize} />;
            case RTI_BOLT + "|" + RTI_FULL:
                return <BoltFull width={iconSize} height={iconSize} />;
            case RTI_BOLT + "|" + RTI_HALF:
                return <BoltHalf width={iconSize} height={iconSize} />;
            case RTI_HEART + "|" + RTI_EMPTY:
                return <HeartEmpty width={iconSize} height={iconSize} />;
            case RTI_HEART + "|" + RTI_FULL:
                return <HeartFull width={iconSize} height={iconSize} />;
            case RTI_HEART + "|" + RTI_HALF:
                return <HeartHalf width={iconSize} height={iconSize} />;
            default:
                return "";
        }
    }

}
RatingTypeIcon.propTypes = {
    size: PropTypes.number,
    variant: PropTypes.oneOf([RTI_EMPTY, RTI_FULL, RTI_HALF]),
    type: PropTypes.oneOf([RTI_DOT, RTI_HEART, RTI_STAR, RTI_BOLT]),
    tint: PropTypes.oneOf([TINT_DANGER, TINT_SECONDARY, TINT_NAVY,TINT_PRIMARY,TINT_SUCCESS,TINT_WARNING]),
};