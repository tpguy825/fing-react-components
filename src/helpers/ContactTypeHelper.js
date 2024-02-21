/*
 * Copyright (c) Fing. All rights reserved.
 */

import intl from 'react-intl-universal';
import { DATE_FORMAT_SMART, formatAbsoluteDate } from "./DateHelper";

import {CT_FAMILY, CT_FAMILY_HIM, CT_FAMILY_HER, CT_FAMILY_KID, CT_FAMILY_RELATIVE,
    CT_FAMILY_PET, CT_FAMILY_PET_DOG, CT_FAMILY_PET_CAT, CT_COLLEAGUE, CT_COLLEAGUE_STAFF, CT_COLLEAGUE_CONTRACTOR,
    CT_COLLEAGUE_VISITOR, CT_HELP, CT_HELP_CLEANING, CT_HELP_MEDICAL, CT_HELP_MAINTENANCE, CT_HELP_DELIVERY,
    CT_FRIEND, CT_GUEST, CT_OTHERS, TINT_SUCCESS, TINT_DANGER, TINT_SECONDARY} from "../model/Constants";

export function getContactTypeName(type) {
    if (!type)
        return null;

    switch (type.toUpperCase()) {
        case CT_FAMILY:
            return intl.get("contacttype_family");
        case CT_FAMILY_HIM:
            return intl.get("contacttype_family_him");
        case CT_FAMILY_HER:
            return intl.get("contacttype_family_her");
        case CT_FAMILY_KID:
            return intl.get("contacttype_family_kid");
        case CT_FAMILY_RELATIVE:
            return intl.get("contacttype_family_relative");
        case CT_FAMILY_PET:
            return intl.get("contacttype_family_pet");
        case CT_FAMILY_PET_CAT:
            return intl.get("contacttype_family_pet_cat");
        case CT_FAMILY_PET_DOG:
            return intl.get("contacttype_family_pet_dog");
        case CT_COLLEAGUE:
            return intl.get("contacttype_colleague");
        case CT_COLLEAGUE_STAFF:
            return intl.get("contacttype_colleague_staff");
        case CT_COLLEAGUE_CONTRACTOR:
            return intl.get("contacttype_colleague_contractor");
        case CT_COLLEAGUE_VISITOR:
            return intl.get("contacttype_colleague_visitor");
        case CT_HELP:
            return intl.get("contacttype_help");
        case CT_HELP_CLEANING:
            return intl.get("contacttype_help_cleaning");
        case CT_HELP_MEDICAL:
            return intl.get("contacttype_help_medical");
        case CT_HELP_MAINTENANCE:
            return intl.get("contacttype_help_maintenance");
        case CT_HELP_DELIVERY:
            return intl.get("contacttype_help_delivery");
        case CT_FRIEND:
            return intl.get("contacttype_friend");
        case CT_GUEST:
            return intl.get("contacttype_guest");
        case CT_OTHERS:
            return intl.get("contacttype_others");
        default:
            return type;
    }
}

export function getContactTypeParent(type) {
    if (!type)
        return null;

    switch (type) {
        case CT_FAMILY_HIM:
        case CT_FAMILY_HER:
        case CT_FAMILY_KID:
        case CT_FAMILY_RELATIVE:
        case CT_FAMILY_PET:
            return CT_FAMILY;
        case CT_FAMILY_PET_CAT:
        case CT_FAMILY_PET_DOG:
            return CT_FAMILY_PET;
        case CT_COLLEAGUE_STAFF:
        case CT_COLLEAGUE_CONTRACTOR:
        case CT_COLLEAGUE_VISITOR:
            return CT_COLLEAGUE;
        case CT_HELP_CLEANING:
        case CT_HELP_MEDICAL:
        case CT_HELP_MAINTENANCE:
        case CT_HELP_DELIVERY:
            return CT_HELP;
        default:
            return null;
    }
}

export function getContactTypeDepth(type) {
    if (!type)
        return 0;

    return getContactHierarchy(type).length - 1;
}

/**
 * Returns an array of elements making the hierarchy.
 *
 * @param type
 * @return {*[]}
 */
export function getContactHierarchy(type) {
    if (!type)
        return [];

    let hierarchy = [];
    do {
        hierarchy.push(type);
        type = getContactTypeParent(type);
    } while (type)

    return hierarchy.reverse();
}
export function getStatusContact(contact, genericStatus) {
    let status;
    if (contact && contact.lastChange) {
        const inLast24h = (new Date().getTime() - contact.lastChange) < 24 * 3600 * 1000;
        const time = formatAbsoluteDate(contact.lastChange, DATE_FORMAT_SMART);
        if (inLast24h)
            status = intl.get(contact.online ?
                "presence_arrived_at_time" : "presence_left_at_time", {time: time});
        else
            status = intl.get(contact.online ?
                "presence_arrived_on_datetime" : "presence_left_on_datetime", {time: time});
    } else if (isTracking(contact)) {
        status = contact.online ? intl.get("generic_online") : intl.get("generic_offline");
    } else if(genericStatus) {
        status = genericStatus;
    } else {
        status = intl.get("generic_not_tracking");
    }
    return status;
}

export function isTracking(contact){
    return contact.presenceDevices && contact.presenceDevices.length > 0;
} 
