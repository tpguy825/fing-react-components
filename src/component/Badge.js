import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const BADGE_TINT_PRIMARY = "primary";
export const BADGE_TINT_DANGER = "danger";
export const BADGE_TINT_DARK = "dark";
export const BADGE_TINT_SUCCESS = "success";
export const BADGE_TINT_WARNING = "warning";
export const BADGE_TINT_SECONDARY = "secondary";
export const BADGE_TINT_INDIGO = "indigo";
export const BADGE_TINT_PINK = "pink";
export const BADGE_TINT_ORANGE = "orange";
export const BADGE_TINT_PRIMARY_BORDERED = "primary_border";
export const BADGE_TINT_DISABLED = "disabled";

export const B_SM = "small";
export const B_MD = "medium";
export const B_XS = "extra-small";
export const B_LG = "large";

const CUSTOM_COLORS = {
    [BADGE_TINT_INDIGO]:{
        color: "#ffffff",
        backgroundColor: "#2d1582"
    },
    [BADGE_TINT_ORANGE]:{
        color: "#ffffff",
        backgroundColor: "#fd7e14"
    },
    [BADGE_TINT_PINK]:{
        color: "#ffffff",
        backgroundColor: "#e83e8c"
    },
    [BADGE_TINT_PRIMARY_BORDERED]:{
        color: "#1a6aff",
        backgroundColor: "#ffffff",
        borderColor: "#1a6aff"
    },
    [BADGE_TINT_DISABLED]:{
        color: "#060606",
        backgroundColor: "#E3E3E3",
    }
}

export default class Badge extends Component {

    getColorByTint(tint, soft){
        if (!tint) return "";
        let color = 'badge-';
        if(soft) color += 'soft-';
        switch (tint) {
            case BADGE_TINT_SECONDARY: color +=  "secondary"; break;
            case BADGE_TINT_PRIMARY: color +=  "primary"; break;
            case BADGE_TINT_SUCCESS: color +=  "success"; break;
            case BADGE_TINT_WARNING: color +=  "warning"; break;
            case BADGE_TINT_DANGER: color +=  "danger"; break;
            case BADGE_TINT_DARK: color +=  "dark"; break;
            default: color +=  "primary"; break;
        }
        return color;
    }
    getSize(size){
        if (!size) return "px-3 py-2";
        switch (size) {
            case B_LG: return 'p-3';
            case B_MD: return 'px-3 py-2';
            case B_SM: return 'p-2';
            case B_XS: return '';
            default: return 'p-2';
        }
    }

    render() {
        const { className, pill, soft, tint, text, icon, reverse, size, customBgColor, customTextColor } = this.props;
        const cName = className || "";
        const cPill = pill ? 'badge-pill' : '';
        const cMarginIcon = text && icon ? (reverse ? 'mr-2' : 'ml-2') : '';
        const cPadding = !text || !icon ? 'px-2' : '';
        const cSize = this.getSize(size);
        if(CUSTOM_COLORS[tint]){
            return (
                <span style={CUSTOM_COLORS[tint]} 
                    className={`badge ${cName} ${cPill} ${cPadding} ${cSize}`}>
                    <BadgeInside icon={icon} cMarginIcon={cMarginIcon} text={text} reverse={reverse}/>
                </span>
            )
        }

        const bgColor = this.getColorByTint(tint, soft);
        
        return (
            <span className={`badge ${cName} ${bgColor} ${cPill} ${cPadding} ${cSize}`}>
                <BadgeInside icon={icon} cMarginIcon={cMarginIcon} text={text} reverse={reverse}/>
            </span>
        )
    }
}

class BadgeInside extends Component {
    render() {
        const { cMarginIcon, text, icon, reverse } = this.props;
        const cName = `${icon} ${cMarginIcon}`;
        if(reverse){
            return (
                <>
                    {icon && <small className={cName}/>}
                    {text ? text : ''}
                </>
            )
        }
        return (
            <>
                {text ? text : ''}
                {icon && <small className={cName}/>}
            </>
        )
    }
}


Badge.propTypes = {
    reverse: PropTypes.bool,
    className: PropTypes.string,
    text: PropTypes.string,
    size: PropTypes.oneOf([B_MD,B_SM,B_XS]),
    pill: PropTypes.bool,
    icon: PropTypes.string,
    soft: PropTypes.bool,
    tint: PropTypes.oneOf([BADGE_TINT_PRIMARY, BADGE_TINT_SECONDARY, BADGE_TINT_WARNING, BADGE_TINT_DANGER, BADGE_TINT_DARK, BADGE_TINT_SUCCESS])
};