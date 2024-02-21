/**
 * Created by marco on 2/6/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';

import {ReactComponent as Family} from "../../assets/svg/contact/contacttype_family_24.svg";
import {ReactComponent as Him} from "../../assets/svg/contact/contacttype_him_24.svg";
import {ReactComponent as Her} from "../../assets/svg/contact/contacttype_her_24.svg";
import {ReactComponent as Kid} from "../../assets/svg/contact/contacttype_kid_24.svg";
import {ReactComponent as Relative} from "../../assets/svg/contact/contacttype_relative_24.svg";
import {ReactComponent as Pet} from "../../assets/svg/contact/contacttype_pet_24.svg";
import {ReactComponent as Dog} from "../../assets/svg/contact/contacttype_dog_24.svg";
import {ReactComponent as Cat} from "../../assets/svg/contact/contacttype_cat_24.svg";
import {ReactComponent as Colleague} from "../../assets/svg/contact/contacttype_colleague_24.svg";
import {ReactComponent as Staff} from "../../assets/svg/contact/contacttype_staff_24.svg";
import {ReactComponent as Contractor} from "../../assets/svg/contact/contacttype_contractor_24.svg";
import {ReactComponent as Visitor} from "../../assets/svg/contact/contacttype_visitor_24.svg";
import {ReactComponent as Help} from "../../assets/svg/contact/contacttype_help_24.svg";
import {ReactComponent as Cleaning} from "../../assets/svg/contact/contacttype_cleaning_24.svg";
import {ReactComponent as Medical} from "../../assets/svg/contact/contacttype_medical_24.svg";
import {ReactComponent as Maintenance} from "../../assets/svg/contact/contacttype_maintenance_24.svg";
import {ReactComponent as Delivery} from "../../assets/svg/contact/contacttype_delivery_24.svg";
import {ReactComponent as Friend} from "../../assets/svg/contact/contacttype_friend_24.svg";
import {ReactComponent as Guest} from "../../assets/svg/contact/contacttype_guest_24.svg";
import {ReactComponent as Others} from "../../assets/svg/contact/contacttype_other_24.svg";
import {
    CT_ALL_TYPES,
    CT_COLLEAGUE,
    CT_COLLEAGUE_CONTRACTOR,
    CT_COLLEAGUE_STAFF,
    CT_COLLEAGUE_VISITOR,
    CT_FAMILY,
    CT_FAMILY_HER,
    CT_FAMILY_HIM,
    CT_FAMILY_KID,
    CT_FAMILY_PET,
    CT_FAMILY_PET_CAT,
    CT_FAMILY_PET_DOG,
    CT_FAMILY_RELATIVE,
    CT_FRIEND,
    CT_GUEST,
    CT_HELP,
    CT_HELP_CLEANING,
    CT_HELP_DELIVERY,
    CT_HELP_MAINTENANCE,
    CT_HELP_MEDICAL,
    CT_OTHERS
} from "../../model/Constants";

const defaultIconSize = "24px";

/**
 */
export default class ContactTypeIcon extends Component {

    render() {
        const { type, size } = this.props;

        if (!CT_ALL_TYPES.includes(type))
            return "";

        const className = this.props.className || '';
        const iconSize = size || defaultIconSize;
        return <figure className={`svg-icon ${className}`}>{this.renderIcon(type, iconSize)}</figure>;
    }

    renderIcon(type, iconSize) {
        if (!type) return "";

        switch (type.toUpperCase()) {
            case CT_FAMILY:
                return <Family width={iconSize} height={iconSize} />;
            case CT_FAMILY_HIM:
                return <Him width={iconSize} height={iconSize} />;
            case CT_FAMILY_HER:
                return <Her width={iconSize} height={iconSize} />;
            case CT_FAMILY_KID:
                return <Kid width={iconSize} height={iconSize} />;
            case CT_FAMILY_RELATIVE:
                return <Relative width={iconSize} height={iconSize} />;
            case CT_FAMILY_PET:
                return <Pet width={iconSize} height={iconSize} />;
            case CT_FAMILY_PET_DOG:
                return <Dog width={iconSize} height={iconSize} />;
            case CT_FAMILY_PET_CAT:
                return <Cat width={iconSize} height={iconSize} />;
            case CT_COLLEAGUE:
                return <Colleague width={iconSize} height={iconSize} />;
            case CT_COLLEAGUE_STAFF:
                return <Staff width={iconSize} height={iconSize} />;
            case CT_COLLEAGUE_CONTRACTOR:
                return <Contractor width={iconSize} height={iconSize} />;
            case CT_COLLEAGUE_VISITOR:
                return <Visitor width={iconSize} height={iconSize} />;
            case CT_HELP:
                return <Help width={iconSize} height={iconSize} />;
            case CT_HELP_CLEANING:
                return <Cleaning width={iconSize} height={iconSize} />;
            case CT_HELP_MEDICAL:
                return <Medical width={iconSize} height={iconSize} />;
            case CT_HELP_MAINTENANCE:
                return <Maintenance width={iconSize} height={iconSize} />;
            case CT_HELP_DELIVERY:
                return <Delivery width={iconSize} height={iconSize} />;
            case CT_FRIEND:
                return <Friend width={iconSize} height={iconSize} />;
            case CT_GUEST:
                return <Guest width={iconSize} height={iconSize} />;
            case CT_OTHERS:
                return <Others width={iconSize} height={iconSize} />;
            default:
                return "";
        }
    }

}