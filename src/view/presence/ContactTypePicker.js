/**
 * Created by marco on 21/06/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import intl from 'react-intl-universal';
import {getContactTypeDepth, getContactTypeName} from "../../helpers/ContactTypeHelper";
import Select, {components} from "react-select";
import ContactTypeIcon from "../../component/icons/ContactTypeIcon";
import {CT_ALL_TYPES} from "../../model/Constants";

// Custom rendering to show the contact SVG icon
const OptionRenderer = (props) => {
    const type = props.data.value;
    const label = props.data.label;
    const depth = getContactTypeDepth(type);
    const color = props.isSelected ? "fill-white" : "";
    const lMargin = depth > 0 ? "ml-" + 3 * depth : "";
    const rMargin = "mr-2";
    return (
        <components.Option {...props}>
            <div className="d-flex align-items-start">
                <ContactTypeIcon type={type} size="16px"
                                 className={`${color} ${lMargin} ${rMargin}`}/>
                <div>{label}</div>
            </div>
        </components.Option>
    );
};

const SelectedValueRendered = ({ children, ...props }) =>
    <components.SingleValue {...props}>
        <div className="d-flex align-items-start">
            <ContactTypeIcon type={props.data.value} size="16px" className="mr-2"/>
            {children}
        </div>
    </components.SingleValue>;

// I don't want/like the vertical separator
const SeparatorRenderer = () => null;

// SVG are by default aligned to the baseline, misplacing the dropdown indicator. We need to add a class to center them
const DropdownRenderer = props => <components.DropdownIndicator {...props} className="svg-icon"/>;

const styles={
    control: (provided, state) => ({
        ...provided,
        border: "0.0625rem solid #e7eaf3"
    })
}

const selectComponents = {
    Option: OptionRenderer,
    IndicatorSeparator: SeparatorRenderer,
    DropdownIndicator: DropdownRenderer,
    SingleValue: SelectedValueRendered
};

export default class ContactTypePicker extends Component {

    constructor(props) {
        super(props);
        const options = props.allowedContexts ? props.allowedContexts : CT_ALL_TYPES;
        this.selectOptions = options.map(type => {
            return {
                value: type,
                label: getContactTypeName(type)
            };
        });
        this.onChange = this.onChange.bind(this);
    }

    render() {
        const defaultContactType = this.props.contactType;
        const selectedValue = this.selectOptions.find(opt => opt.value === defaultContactType);
        return (
            <Select className={`min-w-15rem ${this.props.className || ""}`}
                    components={selectComponents}
                    options={this.selectOptions}
                    value={selectedValue ? selectedValue : null}
                    onChange={this.onChange}
                    styles={styles}
            />
        );
    }

    onChange(selected) {
        if (this.props.onContactTypePicked)
            this.props.onContactTypePicked(selected.value);
    }

}