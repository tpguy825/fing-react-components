
/**
 * Created by marco on 3/3/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';
import intl from 'react-intl-universal';
import OptionBar from "./OptionBar";
import {NC_HOME, NC_OFFICE, NC_PUBLIC, NC_RENTAL} from "../model/Constants";
import NetworkContextIcon from "./icons/NetworkContextIcon";
import PropTypes from 'prop-types';

export default class NetworkContextPicker extends Component {

    render() {
        const {className, context, onContextSelected} = this.props;

        let activeIndex = null;
        if (context === NC_HOME) activeIndex=0;
        else if (context === NC_OFFICE) activeIndex=1;
        else if (context === NC_RENTAL) activeIndex=2;
        else if (context === NC_PUBLIC) activeIndex=3;

        let onOptionSelected = null;
        if (onContextSelected) {
            onOptionSelected = (idx) => {
                if (idx === 0) onContextSelected(NC_HOME);
                else if (idx === 1) onContextSelected(NC_OFFICE);
                else if (idx === 2) onContextSelected(NC_RENTAL);
                else if (idx === 3) onContextSelected(NC_PUBLIC);
            }
        }

        return (
            <OptionBar className={className} checkboxIcon={false} activeIndex={activeIndex} onOptionSelected={onOptionSelected}>
                <ContextOption type={NC_HOME} label={intl.get("generic_home")}/>
                <ContextOption type={NC_OFFICE} label={intl.get("generic_office")}/>
                <ContextOption type={NC_RENTAL} label={intl.get("generic_rental")}/>
                <ContextOption type={NC_PUBLIC} label={intl.get("generic_public")}/>
            </OptionBar>
        )
    }

}

NetworkContextPicker.propTypes = {
    className: PropTypes.string, 
    context: PropTypes.oneOf([NC_RENTAL, NC_OFFICE, NC_HOME, NC_PUBLIC]), 
    onContextSelected: PropTypes.func, 
};

class ContextOption extends Component {
    render() {
        const {selected, type, label} = this.props;
        return (
            <div>
                <span className={`avatar avatar-circle ${selected === true ? "avatar-primary" : "avatar-soft-secondary"}`}>
                    <div className="avatar-initials">
                        <NetworkContextIcon className={`d-inline-block ${selected === true ? "fill-white" : "fill-secondary"}`}
                                            type={type} />
                    </div>
                </span>
                <span className="d-block">{label}</span>
            </div>
        );
    }
}

ContextOption.propTypes = {
    label: PropTypes.string, 
    context: PropTypes.string, 
    selected: PropTypes.bool, 
};
