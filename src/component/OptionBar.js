/**
 * Created by marco on 2/6/21.
 *
 * (C) Copyright Fing
 */

import React, {Component, PureComponent} from 'react';
import nextId from "react-id-generator";
import PropTypes from "prop-types";

/**
 * A control that consists of multiple options, mutually exclusive.
 * The outcome of selecting an item in the OptionBar is to switch among options, like a Select element with all
 * the elements being visualized at the same time (and therefore, must be in a limited number)
 */
export default class OptionBar extends PureComponent {

    constructor(props, context) {
        super(props, context);
        this.groupName = "option-bar-" + nextId();
    }

    render() {
        const {children, className} = this.props;
        if (!children || children.length === 0)
            return '';

        const cName = className || '';
        const flexClass = this.props.vertical === true ? '' : "d-md-inline-flex align-middle";
        return (
            <div className={`${flexClass} ${cName}`}>
                {React.Children.toArray(children.map((item, idx) => this.renderItem(item, idx)))}
            </div>
        );
    }

    renderItem(item, idx) {
        const {itemClassName, onOptionSelected, checkboxIcon} = this.props;
        const inputId = this.groupName + "-input-" + idx;

        const checkboxIconClass = checkboxIcon === false ? "" : "checkbox-icon";
        const checkboxIconInputClass = checkboxIcon === false ? "" : "checkbox-icon-input";
        const checkboxIconLabelClass = checkboxIcon === false ? "" : "checkbox-icon-label";

        const onInputChange = (e) => {
            if (onOptionSelected) onOptionSelected(idx);
        };
        const selected = this.props.activeIndex === idx;
        const cName = itemClassName || 'w-100 mx-1';
        const selectedClass = selected ? "bg-soft-primary text-primary" : "";
        return (
            <div className={`custom-control custom-radio custom-control-inline checkbox-outline ${checkboxIconClass} ${cName}`}>
                <input type="radio" id={inputId} name={this.groupName}
                       className={`custom-control-input checkbox-outline-input ${checkboxIconInputClass}`}
                       checked={selected}
                       onChange={onInputChange}
                />
                <label className={`checkbox-outline-label ${checkboxIconLabelClass} w-100 rounded-lg px-3 py-2 ${selectedClass}`}
                       htmlFor={inputId}
                       onChange={onInputChange}
                >
                    {item}
                </label>
            </div>
        );
    }

}

OptionBar.propTypes = {
    activeIndex: PropTypes.number,
    className: PropTypes.string,
    onOptionSelected: PropTypes.func,
    vertical: PropTypes.bool,
    checkboxIcon: PropTypes.bool,
};