/**
 * (C) Copyright Fing
 */

import React, {PureComponent} from 'react';
import ActionButton from "./ActionButton";
import nextId from "react-id-generator";

export default class DropdownButton extends ActionButton {

    /*sizeToClass(size) {
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
        const {title, icon, disabled, className, id, type, tint, size, rounded } = this.props;
        const cName = className || '';
        const iconUI = this.renderIcon(icon);
        const titleUI = this.renderTitle(icon, title);
        const outerClass = className || '';
        const typeClass = this.typeToClass(type, tint);
        const sizeClass = this.sizeToClass(size);

        const roundedClass = rounded === true ? "btn-pill" : "";

        const computedClass = `btn dropdown-toggle ${typeClass} ${sizeClass} ${roundedClass} ${outerClass}`;
        return (
            <div className={cName}>
                <button id={id}
                    disabled={disabled}
                    className={computedClass}
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    {iconUI}{titleUI}
                </button>

                <div className="dropdown-menu" aria-labelledby={id}>
                    {React.Children
                        .toArray(this.props.children)
                        .map((child,idx) => this.renderMenuItem(child, idx))}
                </div>
            </div>
        );
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

    renderMenuItem(child, idx) {
        const {onItemSelected} = this.props;
        return (
            <button className="dropdown-item"
                onClick={() => {
                            if (onItemSelected)
                                onItemSelected(idx)
                        }}>
                {child}
            </button>
        );
    }*/
    constructor(props, context) {
        super(props, context);
        const nid = nextId();
        this.invokerId = "dropdown_invoker_" + nid;
        this.targetId = "dropdown_target_" + nid;
    }

    // Always show the chevron as chevron down
    renderChevron(chevron) {
        return <i className={`fa fa-chevron-down ml-1`}/>;
    }

    renderButton(computedClass, iconUI, titleUI, chevronUI) {
        const {disabled} = this.props;
        return (
            <div>
                <button id={this.invokerId}
                    disabled={disabled}
                    className={computedClass}
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    {iconUI}{titleUI}{chevronUI}
                </button>

                <div className="dropdown-menu"
                     aria-labelledby={this.invokerId}>
                    {React.Children
                        .toArray(this.props.children)
                        .map((child,idx) => this.renderMenuItem(child, idx))}
                </div>
            </div>
        );
    }

    renderMenuItem(child, idx) {
        const {onItemSelected} = this.props;
        return <button className="dropdown-item"
                       onClick={(event) => {
                           event.preventDefault();

                           if (onItemSelected)
                               onItemSelected(idx)
                       }}
        >
            {child}
        </button>;
    }
}
