/**
 * Created by marco on 2/6/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * Standard progress bar. Can become a separator line when off, or leave it empty.
 */
export const PB_LG = "large";
export const PB_SM = "small";
export const PB_MD = "medium";
export const PB_XS = "extra-small";

export const PB_VISIBLE_WHEN_EMPTY = "hide-when-empty";
export const PB_VISIBLE_WHEN_FULL = "hide-when-full";
export const PB_VISIBLE_ALWAYS = "hide-always";

export default class ProgressBar extends Component {
    
    getSize(size){
        if (!size) return {height: "5px"};
        if(typeof size == 'number'){
            return {height: size + "px"};
        }
        switch (size) {
            case PB_LG: return {height: "15px"};
            case PB_MD: return {height: "10px"};
            case PB_SM: return {height: "5px"};
            case PB_XS: return {height: "2px"};
            default: return {height: "5px"};
        }
    }

    getVisibilityPolicy(value, policy){
        if(policy === PB_VISIBLE_ALWAYS){
            return true;
        } else if(policy === PB_VISIBLE_WHEN_FULL){
            return value !== 0 && value <= 100;
        } else if(policy === PB_VISIBLE_WHEN_EMPTY){
            return value !== 100 && value >= 0;
        }
        return value < 100 && value > 0;
    }

    render() {
        const {value, className, barClassName, barNoSeparator, size, visibilityPolicy, max, text} = this.props;

        const outerClass = className || '';
        const h3px = {height: "3px"};
        const sizeStyle = this.getSize(size);
        const maxValue = max || "100";
        const hideSeparator = barNoSeparator === true;
        const visible = this.getVisibilityPolicy(value, visibilityPolicy);
        if(!visible) {
            return (
                <div style={sizeStyle} className={outerClass}>
                    {!hideSeparator && <div style={h3px} className="border-bottom"/>}
                </div>
            )
        }
        return (
            <div style={sizeStyle} className={`progress ${outerClass}`} >
                {text ? <div className={`progress-bar ${barClassName}`} role="progressbar" style={{width: value + "%"}}
                        aria-valuenow={value} aria-valuemin="0" aria-valuemax={maxValue}>{text}</div> :
                <div className={`progress-bar ${barClassName}`} role="progressbar" style={{width: value + "%"}}
                        aria-valuenow={value} aria-valuemin="0" aria-valuemax={maxValue}/>}
            </div> 
        )
    }

}

ProgressBar.propTypes = {
    size: PropTypes.any,
    visibilityPolicy: PropTypes.oneOf([PB_VISIBLE_ALWAYS, PB_VISIBLE_WHEN_EMPTY, PB_VISIBLE_WHEN_FULL]),
    max: PropTypes.number,
    value: PropTypes.number,
    barClassName: PropTypes.string,
    className: PropTypes.string,
    barNoSeparator: PropTypes.bool,
};