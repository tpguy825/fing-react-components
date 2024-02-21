/**
 * Created by marco on 2/6/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

export const BTN_SIZE_DEFAULT = "SIZE_DEFAULT";
export const BTN_SIZE_BIG = "SIZE_BIG";
export const BTN_SIZE_JUMBO = "SIZE_JUMBO";

export const BTN_TYPE_DEFAULT = "TYPE_DEFAULT";
export const BTN_TYPE_LINK = "TYPE_LINK";
export const BTN_TYPE_SOFT = "TYPE_SOFT";
export const BTN_TYPE_OUTLINE = "TYPE_OUTLINE";
export const BTN_TYPE_GHOST = "TYPE_GHOST";

export const BTN_TINT_PRIMARY = "TINT_PRIMARY";
export const BTN_TINT_SECONDARY = "TINT_SECONDARY";
export const BTN_TINT_SUCCESS = "TINT_SUCCESS";
export const BTN_TINT_WARNING = "TINT_WARNING";
export const BTN_TINT_DANGER = "TINT_DANGER";
export const BTN_TINT_INFO = "TINT_INFO";
export const BTN_TINT_DARK = "TINT_DARK";
export const BTN_TINT_LIGHT = "TINT_LIGHT";
export const BTN_TINT_INDIGO = "TINT_INDIGO";
export const BTN_TINT_NAVY = "TINT_NAVY";

/**
 * Standard button for primary actions.
 */
export default class ActionButton extends Component {

    sizeToClass(size) {
        if (!size) return "btn-xs";
        switch (size) {
            case BTN_SIZE_DEFAULT: return "btn-xs";
            case BTN_SIZE_BIG: return "btn-sm";
            case BTN_SIZE_JUMBO: return "btn-md";
            default: return "btn-xs";
        }
    }

    typeToClass(type, tint) {
        if (type === BTN_TYPE_LINK)
            return "btn-link";

        let prefix= "";
        switch (type) {
            case BTN_TYPE_SOFT: prefix = "btn-soft-"; break;
            case BTN_TYPE_OUTLINE: prefix = "btn-outline-"; break;
            case BTN_TYPE_GHOST: prefix = "btn-ghost-"; break;
            default: prefix = "btn-";
        }

        if (!tint) return prefix + "primary";
        switch (tint) {
            case BTN_TINT_PRIMARY: return prefix + "primary";
            case BTN_TINT_SECONDARY: return prefix + "secondary";
            case BTN_TINT_SUCCESS: return prefix + "success";
            case BTN_TINT_WARNING: return prefix + "warning";
            case BTN_TINT_DANGER: return prefix + "danger";
            case BTN_TINT_INFO: return prefix + "info";
            case BTN_TINT_DARK: return prefix + "dark";
            case BTN_TINT_LIGHT: return prefix + "light";
            case BTN_TINT_INDIGO: return prefix + "indigo";
            case BTN_TINT_NAVY: return prefix + "navy";
            default: return prefix + "primary";
        }
    }

    render() {
        const {title, icon, chevron, running, disabled, rounded} = this.props;
        const {className, type, size, tint} = this.props;

        const iconUI = this.renderIcon(icon);
        const titleUI = this.renderTitle(icon, title);
        const chevronUI = this.renderChevron(chevron);

        const outerClass = className || '';
        const typeClass = this.typeToClass(type, tint);
        const sizeClass = this.sizeToClass(size);

        const roundedClass = rounded === true ? "btn-pill" : "";

        const computedClass = `btn ${typeClass} ${sizeClass} ${roundedClass} ${outerClass}`;
        if (running && running === true) {
            return <button type="button" className={computedClass}
                           disabled>{this.renderRunning()}{titleUI}{chevronUI}</button>;
        } else if (disabled && disabled === true) {
            return <button type="button" className={computedClass} disabled>{iconUI}{titleUI}{chevronUI}</button>;
        } else {
            return this.renderButton(computedClass, iconUI, titleUI, chevronUI);
        }
    }

    renderButton(computedClass, iconUI, titleUI, chevronUI) {
        const {route, url, action} = this.props;
        if (route) {
            return <Link to={route} className={computedClass}>{iconUI}{titleUI}{chevronUI}</Link>;
        } else if (url) {
            return <a href={url} className={computedClass}>{iconUI}{titleUI}{chevronUI}</a>;
        } else {
            return <button type="button" onClick={action} className={computedClass}>{iconUI}{titleUI}{chevronUI}</button>;
        }
    }

    renderTitle(icon, title) {
        const {titleClass} = this.props;
        const titleText = title || '';

        const margin = icon ? "ml-1" : "";
        if (titleClass || margin) {
            return <span className={`${titleClass} ${margin}`}>{titleText}</span>
        }
        return titleText;
    }

    renderIcon(icon) {
        if (!icon) return '';

        // If user specifies the category (fas, far, fab), use the full text
        if (icon.startsWith("fab") || icon.startsWith("far") || icon.startsWith("fas"))
            return <i className={`${icon}`}/>;

        // Otherwise assume the standard category (fas)
        return <i className={`fas ${icon}`}/>;
    }

    renderChevron(chevron) {
        return chevron ? <i className={`fas ${chevron} ml-1`}/> : '';
    }

    renderRunning() {
        return <span className="spinner-border spinner-border-xs mr-1" role="status" aria-hidden="true"/>;
    }

}

ActionButton.propTypes = {
    title: PropTypes.any,
    icon: PropTypes.string,
    chevron: PropTypes.string,
    running: PropTypes.bool,
    disabled: PropTypes.bool,
    rounded: PropTypes.bool,
    type: PropTypes.oneOf([BTN_TYPE_DEFAULT, BTN_TYPE_SOFT, BTN_TYPE_GHOST, BTN_TYPE_OUTLINE, BTN_TYPE_LINK]),
    size: PropTypes.oneOf([BTN_SIZE_DEFAULT, BTN_SIZE_BIG, BTN_SIZE_JUMBO]),
    tint: PropTypes.oneOf([BTN_TINT_PRIMARY, BTN_TINT_SECONDARY, BTN_TINT_SUCCESS, BTN_TINT_WARNING,
        BTN_TINT_INFO, BTN_TINT_DANGER, BTN_TINT_DARK, BTN_TINT_LIGHT, BTN_TINT_NAVY, BTN_TINT_INDIGO]),
    className: PropTypes.string,
    route: PropTypes.string,
    url: PropTypes.string,
    action: PropTypes.func,
};