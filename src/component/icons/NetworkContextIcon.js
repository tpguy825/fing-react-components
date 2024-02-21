/**
 * Created by marco on 2/6/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';

import {ReactComponent as Home} from "../../assets/svg/network/netcontext_home_24.svg";
import {ReactComponent as Office} from "../../assets/svg/network/netcontext_office_24.svg";
import {ReactComponent as Rental} from "../../assets/svg/network/netcontext_rental_24.svg";
import {ReactComponent as Public} from "../../assets/svg/network/netcontext_public_24.svg";
import {NC_ALL_TYPES, NC_HOME, NC_OFFICE, NC_PUBLIC, NC_RENTAL} from "../../model/Constants";

const defaultIconSize = "24px";

/**
 */
export default class NetworkContextIcon extends Component {

    render() {
        const { type, size } = this.props;

        if (!NC_ALL_TYPES.includes(type))
            return "";

        const className = this.props.className || '';
        const iconSize = size || defaultIconSize;
        return <figure className={`svg-icon ${className}`}>{this.renderIcon(type, iconSize)}</figure>;
    }

    renderIcon(type, iconSize) {
        if (!type) return "";

        switch (type.toUpperCase()) {
            case NC_HOME:
                return <Home width={iconSize} height={iconSize} />;
            case NC_OFFICE:
                return <Office width={iconSize} height={iconSize} />;
            case NC_RENTAL:
                return <Rental width={iconSize} height={iconSize} />;
            case NC_PUBLIC:
                return <Public width={iconSize} height={iconSize} />;
            default:
                return "";
        }
    }

}